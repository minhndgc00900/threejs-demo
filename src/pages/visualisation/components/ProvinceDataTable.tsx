import { getTopProvincesByCases } from "../../../utils/common";
import mockData from "../../../data/mockData.json";
import useMapStore from "../../../stores/useMapStore";
import { formatProvinceName } from "../../../utils/map";
import { normalText } from "../../../utils/map";

const ProvinceDataTable = () => {
	const setCameraPosition = useMapStore((state) => state.setCameraPosition);
	const provincesWithData = getTopProvincesByCases({
		data: mockData,
		pageSize: 0,
		ascending: false,
	});

	return (
		<div className="w-80 bg-gradient-to-br from-white to-green-50/20 p-4 rounded-lg shadow-lg mt-4 backdrop-blur-sm border border-green-100/30">
			<div className="flex items-center justify-between mb-3 uppercase">
				<h3 className="text-base font-semibold text-[#28667e]">All cities</h3>
				<span className="text-xs text-[#28667e]">
					Updated: {new Date().toLocaleDateString()}
				</span>
			</div>
			<div className="overflow-y-auto h-[70vh]">
				<div className="top-cities-table">
					<table className="w-full text-sm">
						<thead>
							<tr className="table-chart-content border-b border-green-50/30 hover:bg-green-50/20 transition-colors cursor-pointer">
								<th className="text-left py-2 px-2 font-medium text-[#28667e]">
									#
								</th>
								<th className="text-left py-2 px-2 font-medium text-[#28667e]">
									City
								</th>
								<th className="text-right py-2 px-2 font-medium text-[#28667e]">
									Number of factory
								</th>
								<th className="text-right py-2 px-2 font-medium text-[#792884]">
									Pollution level
								</th>
							</tr>
						</thead>
						<tbody>
							{provincesWithData.map((province, index) => (
								<tr
									key={`${province.name}-${index}`}
									className="table-chart-content border-b border-green-50/30 transition-colors cursor-pointer"
									onClick={() =>
										setCameraPosition({ activeMesh: normalText(province.name) })
									}
								>
									<td className="py-2 px-2 text-[#28667e]">{index + 1}</td>
									<td className="py-2 px-2 font-medium text-[#28667e]">
										{formatProvinceName(province.name)}
									</td>
									<td className="py-2 px-2 text-right font-medium text-[#28667e]">
										{province.numberOfFactory.toLocaleString()}
									</td>
									<td className="py-2 px-2 text-right text-[#792884]">
										{province.pollutionLevel.toLocaleString()} µg/m³
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className="mt-3 text-xs text-[#28667e] text-right">
				* Data source: Ministry of Construction
			</div>
		</div>
	);
};

export default ProvinceDataTable;
