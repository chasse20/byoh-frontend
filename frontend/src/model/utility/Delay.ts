export default async function Delay( tTime:number ):Promise<void>
{
	return new Promise( ( tResolve ) => { setTimeout( tResolve, tTime ); } );
}