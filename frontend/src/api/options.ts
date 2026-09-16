import Tree from "./Tree";

const DATA_API_BASE_URL = import.meta.env.VITE_DATA_API_BASE_URL;

export default class Options
{
	static async GetTreeAsync( tId:number ):Promise<Tree|null>
	{
		if ( !DATA_API_BASE_URL )
		{
			return null;
		}

		try
		{
			const tempURL = new URL( `/api/tree/client/${tId}`, DATA_API_BASE_URL );
			const tempResponse = await fetch( tempURL );
			if ( tempResponse.ok )
			{
				return tempResponse.json();
			}
		}
		catch ( tError )
		{
		}
		
		return null;
	}
}
