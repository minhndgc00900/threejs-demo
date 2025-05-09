export const MAPBOX_ACCESS_TOKEN = import.meta.env['VITE_MAPBOX_ACCESS_TOKEN'];

export const COLOR_THRESHOLDS = [
	{ threshold: 1000, color: "#DC2626" }, // Bright red
	{ threshold: 500, color: "#EA580C" }, // Orange-red
	{ threshold: 200, color: "#F59E0B" }, // Orange
	{ threshold: 100, color: "#EAB308" }, // Yellow
	{ threshold: 10, color: "#84CC16" }, // Light green
	{ threshold: 0, color: "#16A34A" }, // Green
] as const;

export enum InitialCameraPosition {
	X = 1.0959887504577637,
	Y = 0.005898133385926485,
	Z = 0.19488362967967987,
}

export enum GlobalCameraPosition {
	X = 0,
	Y = 59,
	Z = 36,
}

