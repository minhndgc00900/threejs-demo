import { IconNames } from "../Icon/Icon.types";

export interface MenuItem {
	icon?: IconNames;
	label: string;
	disabled?: boolean;
	onClick: () => void;
	iconSize?: number;
}

export interface DrawerSection {
    name: string;
    url: string;
    iconName: IconNames;
    badge?: number;
    disable?: boolean;
    menu?: MenuItem[];
}
