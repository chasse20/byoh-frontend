import CameraRaw from "./CameraRaw";

export default class Camera
{
	readonly name:string;
	readonly tags:Set<number>;
	
	constructor( tRaw:CameraRaw )
	{
		this.name = tRaw.name;
		
		if ( tRaw.tags == null )
		{
			this.tags = new Set<number>();
		}
		else
		{
			this.tags = new Set<number>( tRaw.tags );
		}
	}
}