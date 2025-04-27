export type IconNames =
	| 'dashboard'
	| 'location'
	| '';

export interface IconSvgOwnProps {
	sx: {
		width: number;
		height: number;
		color?: string;
	};
}

export interface IconOwnProps {
	name: IconNames;
	size?: number;
	color?: string;
	style?: { [key: string]: string | number };
}
