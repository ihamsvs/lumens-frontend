export interface CameraSettings {
  pro: string;
  mobile: string;
}
export interface Spot {
  name: string;
  country: string;
  city: string;
  category: string;
  image_url?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  description: string;
  best_time_to_visit: string;
  visitor_tip: string;
  movie_connection: string;
  camera_settings: string | CameraSettings;
}

export interface TravelGuide {
  destination: string;
  destination_image_url?: string;
  description_intro: string;
  best_month_to_visit: string;
  spots: Spot[];
}
