export const getPollutionLevel = (density: number) => {
    if (density < 20) return "low";
    if (density < 40) return "medium";
    return "high";
};

export const getColorByPollution = (
    density: number
): [number, number, number] => {
    const level = getPollutionLevel(density);

    switch (level) {
        case "low":
            return [0, 184, 148]; // Green
        case "medium":
            return [253, 203, 110]; // Orange
        case "high":
            return [214, 48, 49]; // Red
        default:
            return [200, 200, 200]; // fallback gray
    }
};