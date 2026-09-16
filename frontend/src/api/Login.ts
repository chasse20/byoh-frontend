export default class Login
{
	static async LoginAsync( tUser:string, tRecaptchaToken:string ):Promise<any>
	{
		return await fetch( "/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify( { user: tUser, recaptcha: tRecaptchaToken } ) } );
	}
}