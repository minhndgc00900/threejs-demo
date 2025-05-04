import { Factory } from "../../../dashboard/dashboard.type";
import BarChart from "../../../../components/Barchart";
import {
  getPollutionLevelDetail,
  getColorByPollution,
} from "../../../../utils/common";

interface FactoryStatusProps {
  factory: Factory;
}

const FactoryStatus = ({ factory }: FactoryStatusProps) => {
  return (
    <div className="section-container p-2">
      <h2 className="text-title-medium">
        {factory.name} - {factory.district}
      </h2>
      <div className="flex flex-row gap-2">
        <div
          className="text-[80px] !text-white cursor-pointer rounded-[5px] text-center w-[219px]"
          style={{
            backgroundColor: getColorByPollution(
              factory.pollutionLevel,
              true
            ) as string,
          }}
        >
          {factory.pollutionLevel}
        </div>
        <div className="">
          <h2 className="text-[38px] cursor-pointer text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]" style={{ color: getColorByPollution(factory.pollutionLevel, true) as string }}>
            {getPollutionLevelDetail(factory.pollutionLevel)}
          </h2>
          <p className="text-[18px] text-shadow-[0px_0px_10px_rgba(0,0,0,0.5)]" style={{ color: getColorByPollution(factory.pollutionLevel, true) as string }}>for Sensitive Groups</p>
        </div>
      </div>
      <BarChart history={factory.twoDayHistory} />
    </div>
  );
};

export default FactoryStatus;
