import useMapStore from "../../../stores/useMapStore";
import { formatProvinceName, normalText, TopProvinceData } from "../../../utils/map";

interface TopCitiesTableProps {
	data: TopProvinceData[];
	title: string;
	type: "most" | "least";
}

const TopCitiesTable = ({ data, title, type }: TopCitiesTableProps) => {
	const setCameraPosition = useMapStore((state) => state.setCameraPosition);
	// const top10MostInfectedCities = getTopProvincesByCases({ data: mockData, pageSize: 10, ascending: false });
	// const top10LeastInfectedCities = getTopProvincesByCases({ data: mockData, pageSize: 10, ascending: true });

	return (
		<>
			<div
				className={`top-cities-table relative ${type === "most" ? "warning-styles" : "available-styles"}`}
			>
				<div className="top-cities-title flex gap-2">
					<span className="top-cities-number">10</span>
					<div className="top-cities-description-container">
						<span className="top-cities-description">Cities</span>
						<span className="top-cities-sub-description">{title}</span>
					</div>
				</div>
				<table>
					<tbody>
						{data.length > 0 &&
							data.map((province, index) => (
								<tr
									key={`${province.name}-${index}`}
									className="table-chart-content border-b border-green-50/30 hover:bg-green-50/20 transition-colors cursor-pointer"
									onClick={() =>
										setCameraPosition({ activeMesh: normalText(province.name) })
									}
								>
									<td className="px-2">{index + 1}</td>
									<td className="px-2 font-medium w-[150px]">
										{formatProvinceName(province.name)}
									</td>
									<td className="text-left font-medium text-red-300 w-[150px]">
										<div
											className="table-chart-bg px-2"
											style={{
												width: `${(province.numberOfFactory / ((type === "most" ? data[0]?.numberOfFactory : data[data.length - 1]?.numberOfFactory) || 1)) * 100}%`,
												minWidth: "25%",
											}}
										>
											<span className="text-white text-[10px]">
												{province.numberOfFactory.toLocaleString()}
											</span>
										</div>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default TopCitiesTable;
