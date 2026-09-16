import { makeObservable, observable, computed, action } from "mobx";
import WebRTCTest from "./utility/WebRTCTest";
import Delay from "./utility/Delay";
import Login from "./login/Login";
import { Status } from "./login/Status";
import Stream from "./stream/Stream";
import Analytics from "./google/Analytics";
import Logging from "./logrocket/Logging";
import Tagging from "./tagging/Tagging";

export default class App
{
	readonly analytics:Analytics;
	readonly logging:Logging;
	readonly webRTCTest:WebRTCTest = new WebRTCTest();
	readonly tagging:Tagging = new Tagging();
	readonly login:Login;
	protected _stream:Stream|null = null;
	
	get Stream():Stream|null { return this._stream; }
	
	constructor( tGoogleAnalyticsKey:string, tLogRocketKey:string, tRecaptchaKey:string )
	{
		makeObservable<App,"_stream">(
			this,
			{
				webRTCTest: observable,
				tagging: observable,
				login: observable,
				_stream: observable,
				Stream: computed,
				CreateStream: action,
				DestroyStream: action,
				StreamAsync: action,
				StartAsync: action,
				OnStreamHandshake: action,
				OnStreamLevelLoaded: action
			}
		);
		
		// Initialize
		this.analytics = new Analytics( tGoogleAnalyticsKey );
		this.logging = new Logging( tLogRocketKey );
		this.login = new Login( tRecaptchaKey );
		
		// Start
		this.StartAsync();
	}
	
	async StartAsync()
	{
		await this.webRTCTest.StartAsync();
		await this.tagging.StartAsync();
		
		// await Delay( 10000 );
		// await this.StreamAsync(); // TODO: temp
	}
	
	// TODO call this when a button is clicked on the interior design viewport page
	async StreamAsync()
	{
		this.logging.Log( "Authenticating" );
		
		const tempLogin = await this.login.LoginAsync( import.meta.env.DEV ); // TODO: debug port check
		
		this.logging.Log( "Authenticated", tempLogin );
		this.logging.Identify( this.login.user );
		
		if ( tempLogin.error == undefined )
		{
			this.analytics.RecordLoginTime( tempLogin.status == null ? "" : tempLogin.status.toString(), tempLogin.elapsed );
			
			if ( this._stream != null )
			{
				this._stream.Connect( tempLogin.status == Status.LocalServer ? "ws://localhost:80" : "" );
			}
		}
	}
	
	async OnStreamHandshake( tStream:Stream )
	{
		// Send Load Level and Seed Options!
		const tempLevels = tStream.SupportedLevels;
		if ( tempLevels != null )
		{
			// this is where you want to match the level name to the floorplan data/template name
			tStream.LoadLevel( Array.from( tempLevels.values() )[ 0 ], [] );
			//await Delay( 10000 );
			//tStream.LoadLevel( Array.from( tempLevels.values() )[ 1 ], [] );
		}
	}
	
	OnStreamLevelLoaded( tStream:Stream )
	{
		const tempLevelLoaded = tStream.LoadedLevel;
		if ( tempLevelLoaded != null && tempLevelLoaded.cameras != null )
		{		
			// First camera!
			tStream.SwitchCamera( tempLevelLoaded.cameras[ 0 ].name );
		}
	}

	CreateStream( tContainer:HTMLElement|null )
	{
		if ( tContainer != null && this._stream == null )
		{
			this._stream = new Stream( this.OnStreamHandshake, this.OnStreamLevelLoaded, tContainer );
		}
	}
	
	DestroyStream()
	{
		console.log( "DESTROY" );
		
		if ( this._stream != null )
		{
			this._stream.Disconnect();
			this._stream = null;
		}
	}
}