export interface Stop {
  id: number;
  name: string;
  subtitle: string;
  address: string;
  lat: number;
  lng: number;
  hours: string;
  description: string;
  tip: string;
  category: string;
  stampIcon: string;
  color: string;
}

export interface Route {
  id: string;
  name: string;
  tagline: string;
  duration: string;
  distance: string;
  theme: string;
  heroImage: string;
  stops: Stop[];
}

export interface CheckIn {
  stopId: number;
  timestamp: string;
  lat?: number;
  lng?: number;
}
