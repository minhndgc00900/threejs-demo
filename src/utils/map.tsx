import { getColorByPollution, ProvinceData } from "./common";
import { Province } from "./common";
import { Data } from "./common";
export interface TopProvinceData extends ProvinceData {
	name: string;
}

export function normalText(text: string) {
	if (text === "Bà Rịa – Vũng Tàu") return "Vung_Tau";
	if (text === "TP. Hồ Chí Minh") return "Ho_Chi_Minh";
	return text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D")
		.replace(/ /g, "_");
}

export const getProvince = (name: string, data: Data) => {
	const province = data.provinces.find((province) => {
		return normalText(province.name) === name;
	});
	return province;
};

export const getProvinceData = (province: Province | undefined, data: Data) => {
	const provinceData = data.dailyReports.find(
		(report) => report.provinceID === province?.id
	);
	return provinceData;
};

export const formatProvinceName = (name: string | null | undefined): string => {
	if (!name) return "";
	return name.replace(/_/g, " ");
};

export function generateColor(province?: ProvinceData): string {
	if (!province) {
		return "#F3F4F6"; // Very light gray
	}

	return getColorByPollution(province.pollutionLevel, true) as string;
}

export const getTopProvincesByPollutionLevel = ({ 
  data, 
  pageSize = 0, 
  ascending = false 
}: { 
  data: Data; 
  pageSize?: number; 
  ascending?: boolean;
}) => {
	const limit = pageSize === 0 ? data.provinces.length : pageSize;
	return data.provinces
		.map((province) => {
			const dailyData = data.dailyReports.find(
				(report) => report.provinceID === province.id
			);
			return {
				name: province.name,
				numberOfFactory: dailyData?.numberOfFactory || 0,
				pollutionLevel: dailyData?.pollutionLevel || 0,
				mainFactor: dailyData?.mainFactor || 0,
				mainSector: dailyData?.mainSector || '',
				provinceID: province.id,
			};
		})
		.sort((a: TopProvinceData, b: TopProvinceData) => {
			return ascending ? a.pollutionLevel - b.pollutionLevel : b.pollutionLevel - a.pollutionLevel;
		})
		.slice(0, limit);
};
