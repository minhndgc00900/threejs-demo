import { History } from "../../types";

export interface Factory {
    id: string;
    name: string;
    type: string;
    longitude: number;
    latitude: number;
    pollutionLevel: number;
    workers: number;
    district: string;
    populationDensity: number;
    history: History[];
    twoDayHistory: History[];
    modelPath?: string;
    scale?: number;
  }