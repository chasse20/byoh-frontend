import LevelRaw from "./LevelRaw";
import Camera from "./Camera";

export default class Level
{
	readonly name:string;
	readonly cameras:Camera[];
	
	constructor( tRaw:LevelRaw )
	{
		this.name = tRaw.level ?? "";
		this.cameras = [];
		
		if ( tRaw.cameras != null )
		{
			const tempListLength = tRaw.cameras.length;
			
			for ( let i = 0; i < tempListLength; ++i )
			{
				this.cameras.push( new Camera( tRaw.cameras[ i ] ) );
			}
		}
	}
	
	public GetCamerasFromTags( tTags:number[] ):Camera[]
	{
		const tempCameras:Camera[] = [];
		var tempIsFound:boolean = false;
		
		for ( let i = this.cameras.length - 1; i >= 0; --i )
		{
			tempIsFound = true;
			
			for ( let j = tTags.length - 1; j >= 0; --j )
			{
				if ( !this.cameras[ i ].tags.has( tTags[ j ] ) )
				{
					tempIsFound = false;
					break;
				}
			}
			
			if ( tempIsFound )
			{
				tempCameras.push( this.cameras[ i ] );
			}
		}
		
		return tempCameras;
	}
}