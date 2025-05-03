import { Factory } from "../../../dashboard/dashboard.type";

interface FactoryStatusProps {
    factory: Factory;
  }

const FactoryStatus = ({ factory }: FactoryStatusProps) => {
  console.log("factory", factory);

  return (
    <div className='section-container'>FactoryStatus</div>
  )
}

export default FactoryStatus