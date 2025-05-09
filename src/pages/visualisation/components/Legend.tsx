import { getColorByPollution } from "../../../utils/common";

const Legend = () => {
  const pollutionLevels = [
    { level: "Low", value: 20 },
    { level: "Moderate", value: 40 },
    { level: "Very High", value: 41 },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-3 text-center">Pollution Level</h3>
      <div className="flex gap-4">
        {pollutionLevels.map((item) => (
          <div key={item.level} className="flex items-center gap-1">
            <div 
              className="w-4 h-4 rounded-sm" 
              style={{ backgroundColor: getColorByPollution(item.value - 1, true) as string }}
            />
            <span className="text-sm">{item.level}</span>
            <span className="text-sm text-gray-500 ml-2">
              {item.value > 40 ? `above 40 µg/m³` : `< ${item.value} µg/m³`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Legend; 