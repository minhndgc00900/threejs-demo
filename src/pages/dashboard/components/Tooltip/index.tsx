import { useMemo } from "react";
import { Factory } from "../../dashboard.type";
import {
  getBgColorByPollutionLevel,
  getIconByPollutionLevel,
  getTextByPollutionLevel,
} from "../../utils";
import { generateCalendarHeatmapSVG } from "../../utils/calendarSvg";
import { useNavigate } from "react-router";

interface TooltipProps {
  object: Factory;
}

const Tooltip: React.FC<TooltipProps> = ({ object }) => {
  // const pmData = useMemo(() => generatePM25Data('2024-01-01', '2024-12-31'), []);
  const svgMarkup = useMemo(
    () => generateCalendarHeatmapSVG(object.history),
    [object]
  );

  const navigate = useNavigate();

  return (
    <div className="min-w-[180px] text-[13px]">
      <div className="font-bold text-[14px] mb-2">{object.name}</div>
      <div className="w-full h-px my-2 bg-black"></div>
      <div
        className="flex justify-around items-center py-2 rounded-[4px]"
        style={{
          backgroundColor: getBgColorByPollutionLevel(
            object.pollutionLevel || 0
          ),
        }}
      >
        {getIconByPollutionLevel(object.pollutionLevel || 0)}
        <span className="font-museo-sams-rounded-900 text-[14px]">
          {getTextByPollutionLevel(object.pollutionLevel || 0)}
        </span>
      </div>
      <div className="flex flex-col gap-1 pt-2">
        {object.district && (
          <div>
            <strong>District:</strong> {object.district}
          </div>
        )}
        {object.type && (
          <div>
            <strong>Type:</strong> {object.type}
          </div>
        )}
        {object.workers !== undefined && (
          <div>
            <strong>Workers:</strong> {object.workers}
          </div>
        )}
      </div>
      <div
        className="border bg-[#eee] whitespace-normal px-0 py-[3px] rounded-[3px] border-solid border-[#888] text-center cursor-pointer"
        onClick={() => {
          navigate(`/details/${object.id}`);
        }}
      >
        View details
      </div>
      <div
        style={{ marginTop: "8px" }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    </div>
  );
};

export default Tooltip;
