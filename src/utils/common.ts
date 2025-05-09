import { LightingEffect, ScenegraphLayer } from "deck.gl";
import { Color } from "@utils/colors";
import { useControl } from "react-map-gl/mapbox";
import { MapboxOverlay as DeckOverlay } from "@deck.gl/mapbox";
import { TopProvinceData } from "@/types";

export const getPollutionLevel = (density: number) => {
    if (density < 20) return "low";
    if (density < 40) return "medium";
    return "high";
};

export const getPollutionLevelDetail = (density: number) => {
    if (density < 20) return "Good";
    if (density < 40) return "Moderate";
    return "Unhealthy";
};

export const getColorByPollution = (
    density: number,
    isHex?: boolean,
): [number, number, number] | string => {
    const level = getPollutionLevel(density);

    switch (level) {
        case "low":
            if (isHex) {
                return Color.GOOD;
            }
            return [0, 184, 148]; // Green
        case "medium":
            if (isHex) {
                return Color.MODERATE;
            }
            return [253, 203, 110]; // Orange
        case "high":
            if (isHex) {
                return Color.UNHEALTHY;
            }
            return [214, 48, 49]; // Red
        default:
            return [200, 200, 200]; // fallback gray
    }
};

export const formatDate = (date: Date, prevDate?: Date) => {
    if (!prevDate || date.getDate() !== prevDate.getDate()) {
        return Number(date.getHours().toString()) % 6 === 0 ? date.toLocaleDateString('en-US', { weekday: 'short' }) : '';
    }

    return Number(date.getHours().toString()) % 6 === 0 ? Number(date.getHours().toString()) : '';
};

// Generate 2-day history with hourly data
export const generateTwoDayHistory = () => {
    const history = [];
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000); // 48 hours ago

    for (let d = new Date(twoDaysAgo); d <= now; d.setHours(d.getHours() + 1)) {
        history.push({
            date: new Date(d),
            value: Math.floor(Math.random() * 100) // replace with your logic
        });
    }
    return history;
};

export const DeckGLOverlay = (props: {
    layers: ScenegraphLayer[];
    effects: LightingEffect[];
    controller: boolean;
}) => {
    const overlay = useControl(() => new DeckOverlay(props));
    overlay.setProps(props);
    return null;
};

export interface Province {
    id: number;
    name: string;
}

export interface ProvinceData {
    provinceID: number;
    numberOfFactory: number,
    pollutionLevel: number,
    mainFactor: number,
    mainSector: string
}
export interface ProvinceReportData {
    name: string,
    cases: number,
    deaths: number,
    recovered: number,
}

export interface WeeklyReport {
    date: string;
    totalInfected: number;
    totalDeaths: number;
    totalRecovered: number;
}

export interface VaccineReport {
    firstDose: number;
    secondDose: number;
    noDose: number;
}

export interface Data {
    provinces: Province[];
    dailyReports: ProvinceData[];
    weeklyReport: WeeklyReport[];
    vaccineReport: VaccineReport;
}

export const getTopProvincesByCases = ({
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
            };
        })
        .sort((a: TopProvinceData, b: TopProvinceData) => {
            return ascending ? a.pollutionLevel - b.pollutionLevel : b.pollutionLevel - a.pollutionLevel;
        })
        .slice(0, limit);
};