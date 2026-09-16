import LogRocket from "logrocket";

export default class Logging
{
	constructor( tKey:string )
	{
		if ( import.meta.env.PROD && tKey.length > 0 )
		{
			LogRocket.init( tKey,
				{
					network:
					{
						isEnabled: true
					},
					shouldCaptureIP: false,
					//release: new GitInfo().commit.hash,
					console:
					{
						isEnabled:
						{
							log: false
						}
					}
				}
			);
		}
	}
	
	Log( tMessage:string, tVariables?:any )
	{
		if (  tVariables != null )
		{
			console.log( tMessage, tVariables );
			LogRocket.log( tMessage, tVariables );
		}
		else
		{
			console.log( tMessage );
			LogRocket.log( tMessage );
		}
	}
	
	Identify( tUser:string )
	{
		LogRocket.identify( tUser,
			{
			}
		);
	}
}
