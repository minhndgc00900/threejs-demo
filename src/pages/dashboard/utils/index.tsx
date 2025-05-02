import Moderate from "../../../components/Icon/assets/Moderate";
import Sad from "../../../components/Icon/assets/Sad";
import Smile from "../../../components/Icon/assets/Smile";
import { Color } from "../../../utils/colors";

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

export const getBgColorByPollutionLevel = (pollutionLevel: number): string => {
  if (pollutionLevel < 20) return Color.GOOD; // Low - Green
  if (pollutionLevel < 40) return Color.MODERATE; // Medium - Yellow
  return Color.VERY_UNHEALTHY; // Very low - Teal
};

export const getIconByPollutionLevel = (pollutionLevel: number) => {
  if (pollutionLevel < 20) return <Smile width={24} height={24} />; // Low - Green
  if (pollutionLevel < 40) return <Moderate width={24} height={24} />; // Medium - Yellow
  return <Sad width={24} height={24} />; // Very low - Teal
};

export const getTextByPollutionLevel = (pollutionLevel: number) => {
  if (pollutionLevel < 20) return `${pollutionLevel} - Low`; // Low - Green
  if (pollutionLevel < 40) return `${pollutionLevel} - Moderate`; // Medium - Yellow
  return `${pollutionLevel} - High`; // Very low - Teal
};
