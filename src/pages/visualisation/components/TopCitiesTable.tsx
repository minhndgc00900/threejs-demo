import { TopProvinceData } from "@utils/map";
import PollutionBarChart from "./PollutionBarChart";

interface TopCitiesTableProps {
  data: TopProvinceData[];
  title: string;
  type: "most" | "least";
}

const TopCitiesTable = ({ data, type, title }: TopCitiesTableProps) => {
  return (
    <div className={`top-cities-table relative ${type === "most" ? "warning-styles" : "available-styles"}`}>
      <div className="pollution-chart-container" style={{ width: '600px', height: '330px' }}>
        <PollutionBarChart data={data} title={title} />
      </div>
    </div>
  );
};

export default TopCitiesTable;
