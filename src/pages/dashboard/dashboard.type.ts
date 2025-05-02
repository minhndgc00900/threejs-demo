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
    history: { date: Date; value: number }[];
  }