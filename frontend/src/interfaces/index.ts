export interface SelectOption {
	value: string;
	label: string;
}

export interface FloorPlan {
	id: number;
	name: string;
	slug: string;
	cameras: Array<Camera>;
}

export interface Camera {
	id: number;
	name: string;
	tag: string;
}

export interface Community {
	id: number;
	name: string;
	slug: string;
	floorPlans: Array<FloorPlan>;
}
