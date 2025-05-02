import { Factory } from "./dashboard.type";
import * as d3 from 'd3';

const today = new Date();
const startDate = d3.timeMonth.offset(today, -11); // 12 months ago (inclusive)

// Generate one entry per day from startDate to today
const data = d3.timeDays(startDate, today).map(date => ({
  date,
  value: Math.floor(Math.random() * 100), // replace with your logic
}));

export const factories: Factory[] = [
  // Bac Ninh
  {
    id: 'f1',
    name: 'Samsung Electronics Vietnam',
    type: 'Electronics',
    latitude: 21.1193,
    longitude: 105.9245,
    pollutionLevel: 45,
    workers: 6000,
    district: 'Bac Ninh',
    history: data,
    populationDensity: 1400,
  },
  {
    id: 'f2',
    name: 'Foxconn Factory Bac Ninh',
    type: 'Electronics',
    latitude: 21.1000,
    longitude: 105.9400,
    pollutionLevel: 50,
    workers: 3000,
    district: 'Bac Ninh',
    history: data,
    populationDensity: 1400,
  },
  {
    id: 'f3',
    name: 'Bac Ninh Textile Company',
    type: 'Textile',
    latitude: 21.0833,
    longitude: 106.0500,
    pollutionLevel: 15,
    workers: 800,
    district: 'Bac Ninh',
    history: data,
    populationDensity: 1400,
  },

  // Dong Anh
  {
    id: 'f4',
    name: 'Dong Anh Textile Co.',
    type: 'Textile',
    latitude: 21.1425,
    longitude: 105.8555,
    pollutionLevel: 30,
    workers: 800,
    district: 'Dong Anh',
    history: data,
    populationDensity: 820,
  },
  {
    id: 'f5',
    name: 'Dong Anh Chemical Plant',
    type: 'Chemical',
    latitude: 21.1500,
    longitude: 105.8400,
    pollutionLevel: 38,
    workers: 400,
    district: 'Dong Anh',
    history: data,
    populationDensity: 700,
  },
  {
    id: 'f6',
    name: 'Vietnam Food Processing Plant (Dong Anh)',
    type: 'Food Processing',
    latitude: 21.1300,
    longitude: 105.8800,
    pollutionLevel: 55,
    workers: 500,
    district: 'Dong Anh',
    history: data,
    populationDensity: 1200,
  },

  // Hai Phong
  {
    id: 'f7',
    name: 'LG Display Hai Phong',
    type: 'Electronics',
    latitude: 20.8449,
    longitude: 106.6881,
    pollutionLevel: 13,
    workers: 5000,
    district: 'Hai Phong',
    history: data,
    populationDensity: 1100,
  },
  {
    id: 'f8',
    name: 'VinFast Manufacturing Plant',
    type: 'Automotive',
    latitude: 20.7951,
    longitude: 106.7185,
    pollutionLevel: 344,
    workers: 2000,
    district: 'Hai Phong',
    history: data,
    populationDensity: 1300,
  },

  // Thai Nguyen
  {
    id: 'f9',
    name: 'Samsung Electronics Thai Nguyen',
    type: 'Electronics',
    latitude: 21.5928,
    longitude: 105.8442,
    pollutionLevel: 23,
    workers: 7000,
    district: 'Thai Nguyen',
    history: data,
    populationDensity: 800,
  },
  {
    id: 'f10',
    name: 'Thai Nguyen Steel Plant',
    type: 'Construction Materials',
    latitude: 21.5881,
    longitude: 105.8442,
    pollutionLevel: 42,
    workers: 1200,
    district: 'Thai Nguyen',
    history: data,
    populationDensity: 800,
  },

  // Vinh Phuc
  {
    id: 'f11',
    name: 'Honda Vietnam Motorcycle Plant',
    type: 'Automotive',
    latitude: 21.3082,
    longitude: 105.6178,
    pollutionLevel: 33,
    workers: 4500,
    district: 'Vinh Phuc',
    history: data,
    populationDensity: 900,
  },
  {
    id: 'f12',
    name: 'Toyota Vietnam Assembly Plant',
    type: 'Automotive',
    latitude: 21.3080,
    longitude: 105.6180,
    pollutionLevel: 11,
    workers: 3000,
    district: 'Vinh Phuc',
    history: data,
    populationDensity: 900,
  },

  // Hung Yen
  {
    id: 'f13',
    name: 'Canon Vietnam Factory',
    type: 'Electronics',
    latitude: 20.9101,
    longitude: 106.0165,
    pollutionLevel: 14,
    workers: 4000,
    district: 'Hung Yen',
    history: data,
    populationDensity: 1120,
  },
  {
    id: 'f14',
    name: 'Hung Yen Textile & Garment',
    type: 'Textile',
    latitude: 20.9210,
    longitude: 106.0150,
    pollutionLevel: 58,
    workers: 1000,
    district: 'Hung Yen',
    history: data,
    populationDensity: 1100,
  },
];
