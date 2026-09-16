declare global
{
    interface Window
	{
        dataLayer:any[];
    }
}

export default class Analytics
{
	constructor( tKey:string )
	{
		if ( window.dataLayer == null )
		{
			window.dataLayer = [];
		}
		
		if ( import.meta.env.PROD && tKey.length > 0 )
		{
			const tempHeadScript = document.createElement( "script" );
			tempHeadScript.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','" + tKey + "')";
			document.head.insertBefore( tempHeadScript, document.head.childNodes[0] );
		
			const tempBodyScript = document.createElement( "noscript" );
			tempBodyScript.innerHTML = "<iframe src=\"https://www.googletagmanager.com/ns.html?id=" + tKey + "\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"></iframe>";
			document.body.insertBefore( tempBodyScript, document.body.childNodes[0] );
		}
	}
	
	RecordLoginTime( tStatus:string, tElapsedTime:number )
	{
		window.dataLayer.push(
			{
				event: "OnLoginTime",
				status: tStatus,
				elapsed: tElapsedTime
			}
		);
	}
	
	RecordLoadTime( tLoginStatus:string, tElapsedTime:number, tCommunity:string, tFloorplan:string, tIsFirstLoad:boolean )
	{
		window.dataLayer.push(
			{
				event: "OnFloorplanLoadTime",
				status: tLoginStatus,
				elapsed: tElapsedTime,
				community: tCommunity,
				floorplan: tFloorplan,
				isFirstLoad: tIsFirstLoad ? "First Loaded" : "Switching To"
			}
		);
	}
	
	RecordPackageSelection( tCommunity:string, tFloorplan:string, tTheme:string )
	{
		window.dataLayer.push(
			{
				event: "OnSelectPackage",
				community: tCommunity,
				floorplan: tFloorplan,
				theme: tTheme
			}
		);
	}
	
	RecordOptionSelection( tCommunity:string, tFloorplan:string, tOption:string, tTags:string[] )
	{
		window.dataLayer.push(
			{
				event: "OnSelectOption",
				community: tCommunity,
				floorplan: tFloorplan,
				option: tOption,
				tags: tTags
			}
		);
	}
	
	RecordScreenshotDownload()
	{
		window.dataLayer.push(
			{
				event: "OnScreenshotDownload"
			}
		);
	}
}