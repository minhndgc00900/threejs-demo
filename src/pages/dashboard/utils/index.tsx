import Moderate from "../../../components/Icon/assets/Moderate";
import Sad from "../../../components/Icon/assets/Sad";
import Smile from "../../../components/Icon/assets/Smile";
import { Color } from "../../../utils/colors";

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
