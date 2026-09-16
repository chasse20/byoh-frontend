import Edge from "./Edge";
import NodeChoice from "./NodeChoice";
import NodeCondition from "./NodeCondition";
import NodeOption from "./NodeOption";
import NodeTemplate from "./NodeTemplate";
import Option from "./Option";
import NodeOptionToTag from "./NodeOptionToTag";
import Template from "./Template";

export default class Tree
{
	templateId:number = 0;
	name:string = "";
	edges:Edge[]|null = null;
	choiceNodes:NodeChoice[]|null = null;
	conditionNodes:NodeCondition[]|null = null;
	optionNodes:NodeOption[]|null = null;
	templateNodes:NodeTemplate[]|null = null;
	options:Option[]|null = null;
	nodeOptionToTags:NodeOptionToTag[]|null = null;
	templates:Template[]|null = null;
}