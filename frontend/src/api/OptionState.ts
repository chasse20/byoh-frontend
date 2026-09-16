export enum OptionState
{
	None = 0,
	Preselected = 1 << 0,
	Toggleable = 1 << 1,
	Hidden = 1 << 2,
	All = Preselected | Toggleable | Hidden
}