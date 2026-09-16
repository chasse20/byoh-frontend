import { makeObservable, observable, computed, action } from "mobx";
import { Config, Flags, NumericParameters, TextParameters, PixelStreaming, DataChannelCloseEvent, WebRtcDisconnectedEvent, Logger } from "@epicgames-ps/lib-pixelstreamingfrontend-ue5.2";
import { ServerMessage } from "./ServerMessage";
import { ClientMessage } from "./ClientMessage";
import Handshake from "./Handshake";
import LevelRaw from "./LevelRaw";
import Level from "./Level";

export default class Stream
{
	protected _stream:PixelStreaming;
	protected _isConnecting:boolean = false;
	protected _supportedLevels:Set<string>|null = null;
	protected _loadedLevel:Level|null = null;
	public onHandshakeCallback?:( tStream:Stream ) => void;
	public onLevelLoadedCallback?:( tStream:Stream ) => void;
	protected readonly _onDataCloseCallback:( tEvent:DataChannelCloseEvent ) => void;
	protected readonly _onWebRtcDisconnectedCallback:( tEvent:WebRtcDisconnectedEvent ) => void;
	
	get IsConnecting():boolean { return this._isConnecting; }
	// * Supported levels will be populated before LoadedLevel - if's it's not null, then
	// * It's connected to unreal, but the LoadedLevel hasn't finised loading yet...
	get SupportedLevels():Set<string>|null { return this._supportedLevels; }
	
	// * If this is null its not connected, if it's NOT null, then it IS connected
	get LoadedLevel():Level|null { return this._loadedLevel; }
	
	constructor( tHandshakeCallback?:( tStream:Stream ) => void, tLevelLoadedCallback?:( tStream:Stream ) => void, tElement?:HTMLElement )
	{
		makeObservable<Stream,"_isConnecting" | "_supportedLevels" | "_loadedLevel">(
			this,
			{
				_isConnecting: observable,
				IsConnecting: computed,
				_supportedLevels: observable,
				SupportedLevels: computed,
				_loadedLevel: observable,
				LoadedLevel: computed,
				Connect: action,
				Disconnect: action,
				OnDataChannelClose: action,
				OnWebRtcDisconnected: action,
				OnResponse: action,
				ProcessHandshake: action,
				ProcessLevelLoaded: action,
				RequestHandshake: action,
				LoadLevel: action,
				ChangeOptions: action,
				SwitchCamera: action,
				ChangeResolution: action,
				Ping: action
			}
		);
		
		this.onHandshakeCallback = tHandshakeCallback;
		this.onLevelLoadedCallback = tLevelLoadedCallback;
		this._onDataCloseCallback = this.OnDataChannelClose.bind( this );
		this._onWebRtcDisconnectedCallback = this.OnWebRtcDisconnected.bind( this );
		
		const tempConfig = new Config( { useUrlParams: false } );
		
		tempConfig.setFlagEnabled( Flags.MouseInput, false );
		tempConfig.setFlagEnabled( Flags.KeyboardInput, false );
		tempConfig.setFlagEnabled( Flags.TouchInput, false );
		tempConfig.setFlagEnabled( Flags.GamepadInput, false );
		tempConfig.setFlagEnabled( Flags.XRControllerInput, false );
		tempConfig.setFlagEnabled( Flags.AutoPlayVideo, true );
		tempConfig.setFlagEnabled( Flags.BrowserSendOffer, true );
		tempConfig.setFlagEnabled( Flags.StartVideoMuted, true );
		tempConfig.setFlagEnabled( Flags.MatchViewportResolution, true );
		tempConfig.setFlagEnabled( Flags.AutoConnect, false );
		tempConfig.setNumericSetting( NumericParameters.MaxReconnectAttempts, 0 ); // hacky
		
		Logger.verboseLogLevel = 6;
		
		tempConfig.setNumericSetting( NumericParameters.WebRTCFPS, 30 );
		
		this._stream = new PixelStreaming( tempConfig, { videoElementParent: tElement } );
	}
	
	Connect( tURL:string )
	{
		this._isConnecting = true;		
		this._stream.config.setTextSetting( TextParameters.SignallingServerUrl, tURL );
		this._stream.addResponseEventListener( "responseListener", this.OnResponse.bind( this ) );
		this._stream.addEventListener( "dataChannelClose", this._onDataCloseCallback );
		this._stream.addEventListener( "webRtcDisconnected", this._onWebRtcDisconnectedCallback );
		this._stream.connect();
	}
	
	Disconnect()
	{
		this._isConnecting = false;
		this._supportedLevels = null;
		this._loadedLevel = null;
		
		this._stream.removeResponseEventListener( "responseListener" );
		this._stream.removeEventListener( "dataChannelClose", this._onDataCloseCallback );
		this._stream.removeEventListener( "webRtcDisconnected", this._onWebRtcDisconnectedCallback );
		
		this._stream.disconnect();
	}
	
	OnDataChannelClose( tEvent:DataChannelCloseEvent )
	{
		this.Disconnect();
	}
	
	OnWebRtcDisconnected( tEvent:WebRtcDisconnectedEvent )
	{
		this.Disconnect();
	}
	
	OnResponse( tResponse:string )
	{
		const tempObject = JSON.parse( tResponse );

		if ( tempObject != null && tempObject.type != null )
		{
			switch ( tempObject.type as ServerMessage )
			{
				case ServerMessage.Handshake:
					this.ProcessHandshake( tempObject as Handshake );
					break;
				case ServerMessage.LevelLoaded:
					this.ProcessLevelLoaded( tempObject as LevelRaw );
					break;
				default:
					break;
			}
		}
	}
	
	ProcessHandshake( tHandshake:Handshake )
	{
		this._isConnecting = false;
		
		if ( tHandshake.levels != null )
		{
			this._supportedLevels = new Set<string>( tHandshake.levels );
		}
		
		if ( this.onHandshakeCallback != null )
		{
			this.onHandshakeCallback( this );
		}
	}
	
	ProcessLevelLoaded( tLevelRaw:LevelRaw )
	{
		this._loadedLevel = new Level( tLevelRaw );
		
		if ( this.onLevelLoadedCallback != null )
		{
			this.onLevelLoadedCallback( this );
		}
	}
	
	RequestHandshake()
	{
		this._stream.emitUIInteraction(
			{
				type: ClientMessage.Handshake
			}
		);
	}
	
	// TODO: Options array
	LoadLevel( tName:string, tSeedOptions:any )
	{
		this._stream.emitUIInteraction(
			{
				type: ClientMessage.LoadLevel,
				options: tSeedOptions,
				level: tName
			}
		);
	}
	
	// TODO: Options array
	ChangeOptions( tOptions:any )
	{
		this._stream.emitUIInteraction(
			{
				type: ClientMessage.ChangeOptions,
				options: tOptions
			}
		);
	}
	
	SwitchCamera( tName:string )
	{
		this._stream.emitUIInteraction(
			{
				type: ClientMessage.SwitchCamera,
				camera: tName
			}
		);
	}
	
	// TODO
	ChangeResolution()
	{
		
	}
	
	Ping()
	{
		this._stream.emitUIInteraction(
			{
				type: ClientMessage.Ping
			}
		);
	}
}
