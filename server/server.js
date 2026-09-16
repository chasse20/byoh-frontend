const express = require( "express" );
const axios = require( "axios" );

const PORT = Number( process.env.PORT ?? 3000 );
const BRANCH = process.env.BRANCH ?? "sample";
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET;
const SCALING_SERVICE_SECRET = process.env.SCALING_SERVICE_SECRET;
const SCALING_SERVICE_CONNECT_URL = process.env.SCALING_SERVICE_CONNECT_URL;

const server = express();
server.use( express.json() );
server.use( express.static( __dirname + "/build" ) );
server.listen( PORT, "0.0.0.0" );

server.post( "/login",
	async ( tRequest, tResponse ) =>
	{
		if ( !tRequest.accepts( "application/json" ) )
		{
			tResponse.status( 406 ).end();
			return;
		}

		if ( tRequest.body.recaptcha == null || tRequest.body.user == null )
		{
			tResponse.status( 400 ).send( "recaptcha and/or user not supplied" );
			return;
		}

		if ( !RECAPTCHA_SECRET || !SCALING_SERVICE_SECRET || !SCALING_SERVICE_CONNECT_URL )
		{
			tResponse.status( 503 ).send( "Backend integration is not configured." );
			return;
		}

		try
		{
			const tempCaptchaBody = new URLSearchParams(
				{
					secret: RECAPTCHA_SECRET,
					response: tRequest.body.recaptcha
				}
			);

			const tempGoogleResponse = await axios.post(
				"https://www.google.com/recaptcha/api/siteverify",
				tempCaptchaBody.toString(),
				{ headers: { "Content-Type": "application/x-www-form-urlencoded" } }
			);

			if ( tempGoogleResponse.status !== 200 || tempGoogleResponse.data.score < 0.1 )
			{
				tResponse.status( 403 ).json( tempGoogleResponse.data[ "error-codes" ] ?? [] );
				return;
			}

			const tempScalingURL = new URL( SCALING_SERVICE_CONNECT_URL );
			tempScalingURL.searchParams.set( "code", SCALING_SERVICE_SECRET );

			const tempScalingResponse = await axios.post(
				tempScalingURL.toString(),
				{ user: tRequest.body.user, branch: BRANCH }
			);

			if ( tempScalingResponse.status !== 200 && tempScalingResponse.status !== 201 )
			{
				tResponse.status( tempScalingResponse.status ).end();
				return;
			}

			if ( tempScalingResponse.headers.location )
			{
				axios.post( tempScalingResponse.headers.location, { user: tRequest.body.user } ).catch( () => {} );
			}

			tResponse.status( tempScalingResponse.status ).send(
				{
					signalToken: tempScalingResponse.data.signalToken,
					status: tempScalingResponse.data.status,
					version: tempScalingResponse.data.version
				}
			);
		}
		catch ( tError )
		{
			const tempStatus = tError.response?.status ?? 500;
			tResponse.status( tempStatus ).end();
		}
	}
);

server.get( "*",
	( tRequest, tResponse ) =>
	{
		tResponse.sendFile( __dirname + "/build/index.html" );
	}
);
