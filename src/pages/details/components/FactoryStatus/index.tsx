import { Factory } from "../../../dashboard/dashboard.type";
import PM25BarChart from "../Barchart";

interface FactoryStatusProps {
    factory: Factory;
  }

const FactoryStatus = ({ factory }: FactoryStatusProps) => {
  console.log("factory", factory);

  return (
    <div className='section-container p-2'>
        <h2 className="text-title-medium">{factory.name} - {factory.district}</h2>
        <div className="text-[80px] bg-[rgb(0,153,102)] !text-white cursor-pointer rounded-[5px] text-center">
            {factory.pollutionLevel}
        </div>
        <PM25BarChart />
    </div>
  )
}

export default FactoryStatus