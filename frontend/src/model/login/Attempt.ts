import { Status } from "./Status";

export default class Attempt
{
	elapsed:number = 0;
	status?:Status;
	error?:string;
}