import { Color } from "./colors";

export const getPollutionLevel = (density: number) => {
    if (density < 20) return "low";
    if (density < 40) return "medium";
    return "high";
};

export const getColorByPollution = (
    density: number,
    isHex?: boolean,
): [number, number, number] | string => {
    const level = getPollutionLevel(density);

    switch (level) {
        case "low":
            if (isHex) {
                return Color.GOOD;
            }
            return [0, 184, 148]; // Green
        case "medium":
            if (isHex) {
                return Color.MODERATE;
            }
            return [253, 203, 110]; // Orange
        case "high":
            if (isHex) {
                return Color.UNHEALTHY;
            }
            return [214, 48, 49]; // Red
        default:
            return [200, 200, 200]; // fallback gray
    }
};

export const formatDate = (date: Date, prevDate?: Date) => {
    if (!prevDate || date.getDate() !== prevDate.getDate()) {
        return Number(date.getHours().toString()) % 6 === 0 ? date.toLocaleDateString('en-US', { weekday: 'short' }) : '';
    }
    
    return Number(date.getHours().toString()) % 6 === 0 ? Number(date.getHours().toString()) : '';
};

// Generate 2-day history with hourly data
export const generateTwoDayHistory = () => {
    const history = [];
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago
    
    for (let d = new Date(twoDaysAgo); d <= now; d.setHours(d.getHours() + 1)) {
      history.push({
        date: new Date(d),
        value: Math.floor(Math.random() * 100) // replace with your logic
      });
    }
    return history;
  };