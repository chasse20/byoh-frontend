import { OptionState } from "./OptionState";

export default class NodeOption
{
	nodeId:number = 0;
	optionId:number|null = null;
	state:OptionState = OptionState.None;
}