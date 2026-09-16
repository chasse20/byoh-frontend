import { makeObservable, observable, computed  } from "mobx";
import LoginAPI from "../../api/Login";
import Attempt from "./Attempt";
import { Status } from "./Status";

declare global {
    interface Window {
        grecaptcha:any;
    }
}

export default class Login
{
	user:string;
	protected readonly _recaptchaKey:string;
	protected _isAuthenticating:boolean = false;
	protected _cirrusToken:string|null = null;
	protected _unrealVersion:string|null = null;
	
	get IsAuthenticating():boolean { return this._isAuthenticating; }
	get CirrusToken():string|null { return this._cirrusToken; }
	get UnrealVersion():string|null { return this._unrealVersion; }
	
	constructor( tRecaptchaKey:string )
	{
		makeObservable<Login,"_isAuthenticating" | "_cirrusToken" | "_unrealVersion">(
			this,
			{
				user: observable,
				_isAuthenticating: observable,
				IsAuthenticating: computed,
				_cirrusToken: observable,
				CirrusToken: computed,
				_unrealVersion: observable,
				UnrealVersion: computed
			}
		);
		
		this._recaptchaKey = tRecaptchaKey;
		this.user = localStorage.getItem( "user" ) ?? "anonymous" + Math.random().toString( 36 ).substr( 0, 8 );
	}
		
	async LoginAsync( tIsLocal:boolean ):Promise<Attempt>
	{
		// Initialize
		const tempStartTime = Date.now();
		const tempAttempt = new Attempt();
		
		this._isAuthenticating = true;
		this._cirrusToken = null;
		this._unrealVersion = null;
		
		// Save user
		localStorage.setItem( "user", this.user );
		
		// Local
		if ( tIsLocal )
		{
			this._cirrusToken = "";
			this._unrealVersion = "local";
			
			tempAttempt.elapsed = Date.now() - tempStartTime;
			tempAttempt.status = Status.LocalServer;
			
			return tempAttempt;
		}
		// Online
		else if ( window.grecaptcha != null )
		{
			// Get Recaptcha token
			var tempRecaptchaToken = null;
			try
			{
				tempRecaptchaToken = await window.grecaptcha.execute( this._recaptchaKey, { action: "login" } );
			}
			catch ( tError )
			{
				this._isAuthenticating = false;
				
				tempAttempt.elapsed = Date.now() - tempStartTime;
				tempAttempt.status = Status.CaptchaFailed;
				tempAttempt.error = "no recaptcha token";
				
				return tempAttempt;
			}
			
			// Login API
			let tempResponse;
			var tempStatus:Status|null = null;
			var tempError:string|null = null;
			
			for ( let i = 4; i >= 0; --i ) // try 5x
			{
				try
				{
					tempResponse = await LoginAPI.LoginAsync( this.user, tempRecaptchaToken );
					
					// Success
					if ( tempResponse.status === 200 || tempResponse.status === 201 )
					{
						const tempJSON = await tempResponse.json();
						this._cirrusToken = tempJSON.signalToken;
						this._unrealVersion = tempJSON.version;
						this._isAuthenticating = false;
						
						tempAttempt.elapsed = Date.now() - tempStartTime;
						tempAttempt.status = tempJSON.status === 3 ? Status.JoiningOpenServer : Status.CreatingNewServer; // comes from Scaling Service... 3 represents joining existing
						
						return tempAttempt;
					}
					// Fail, recaptcha
					else if ( tempResponse.status === 403 )
					{
						tempStatus = Status.CaptchaFailed;
						tempError = "recaptcha failure";
					}
					// Fail, servers are full
					else if ( tempResponse.status === 404 )
					{
						tempStatus = Status.ServersAreFull;
						tempError = "servers are full";
					}
					// Fail, down for maintenance
					else if ( tempResponse.status === 503 )
					{
						tempStatus = Status.DownForMaintenance;
						tempError = "servers are down for maintenance";
					}
				}
				catch ( tError:any )
				{
					tempError = tError.message;
				}
				
				// Delay before retry
				if ( i > 0 )
				{
					await new Promise( ( tResolve ) => setTimeout( tResolve, 3000 ) );
				}
			}
			
			this._isAuthenticating = false;
			
			tempAttempt.elapsed = Date.now() - tempStartTime;
			
			if ( tempError != null )
			{
				tempAttempt.error = tempError;
			}
			
			if ( tempStatus != null )
			{
				tempAttempt.status = tempStatus;
			}
			
			return tempAttempt;
		}
		
		tempAttempt.elapsed = Date.now() - tempStartTime;
		tempAttempt.error = "no grecaptcha";
		
		return tempAttempt;
	}
}