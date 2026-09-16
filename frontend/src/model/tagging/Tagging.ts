import { makeObservable, observable  } from "mobx";
import TaggingAPI from "../../api/Tagging";

export default class Tagging
{
	readonly tagIds:Map<string,number> = new Map<string,number>();
	
	constructor()
	{
		makeObservable(
			this,
			{
				tagIds: observable.shallow
			}
		);
	}
	
	async StartAsync()
	{
		const tempTags = await TaggingAPI.GetTagsAsync();
		if ( tempTags != null )
		{
			for ( let i = tempTags.length - 1; i >= 0; --i )
			{
				this.tagIds.set( tempTags[ i ].label, tempTags[ i ].tagId ); // we don't care about parents
			}
		}
	}
}
