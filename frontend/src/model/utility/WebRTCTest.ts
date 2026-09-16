import { makeObservable, observable, computed } from "mobx";

export default class WebRTCTest
{
	readonly servers:any[] = [ { urls: "stun:stun.l.google.com:19302" } ];
	protected connection:RTCPeerConnection|null = null;
	protected _isSuccess:boolean = false;
	protected _isChecked:boolean = false;
	protected timeout:number = 0;
	
	get IsSuccess():boolean { return this._isSuccess; }
	get IsChecked():boolean { return this._isChecked; }
	
	constructor()
	{
		makeObservable<WebRTCTest,"_isSuccess" | "_isChecked">(
			this,
			{
				_isSuccess: observable,
				IsSuccess: computed,
				_isChecked: observable,
				IsChecked: computed
			}
		);
	}
	
	async StartAsync()
	{
		this.ResetTimer();
		this.connection = new RTCPeerConnection( { iceServers: this.servers } );
		this.connection.onicecandidate = ( tEvent ) => { this.OnIceCandidate( tEvent ); };
		
		try
		{
			const tempOffer = await this.connection.createOffer( { offerToReceiveAudio: true } );
			this.connection.setLocalDescription( tempOffer );
		}
		catch ( tError )
		{
			console.log( "WebRTCTest failure", tError );
		}
	}
	
	protected ResetTimer()
	{
		this.timeout = setTimeout( () => { this._isChecked = true; }, 15000 );
	}
	
	protected OnIceCandidate( tEvent:RTCPeerConnectionIceEvent )
	{
		if ( !this._isSuccess && tEvent.candidate != null )
		{
			clearTimeout( this.timeout );
			
			if ( tEvent.candidate.type !== "host" )
			{
				console.log( "WebRTCTest success" );
				
				this._isChecked = true;
				this._isSuccess = true;
				
				if ( this.connection != null )
				{
					this.connection.close();
					this.connection.onicecandidate = null;
					this.connection = null;
				}
			}
			else
			{
				this.ResetTimer();
			}
		}
	}
}