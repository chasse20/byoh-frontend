import Tag from "./Tag";

const DATA_API_BASE_URL = import.meta.env.VITE_DATA_API_BASE_URL;

export default class Tagging
{
	static async GetTagsAsync():Promise<Tag[]|null>
	{
		if ( !DATA_API_BASE_URL )
		{
			return null;
		}

		try
		{
			const tempURL = new URL( "/api/tag", DATA_API_BASE_URL );
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
