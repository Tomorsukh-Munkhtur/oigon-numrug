export type RealEstateStat = {
  value: string;
  label: string;
};

export type RealEstateFloorPlan = {
  id: string;
  label: string;
  rooms: string;
  area: string;
  image: string;
};

export type RealEstateProject = {
  id: string;
  title: string;
  type: string;
  location: string;
  image: string;
  status: string;
  price: string;
  size?: string;
  summary?: string;
  longDescription?: string;
  developer?: string;
  completion?: string;
  floors?: string;
  units?: string;
  parking?: string;
  highlights?: string[];
  amenities?: string[];
  gallery?: string[];
  floorPlans?: RealEstateFloorPlan[];
};

export type RealEstateService = {
  id: string;
  title: string;
  description: string;
  points: string[];
};

export type RealEstateMilestone = {
  year: string;
  text: string;
};
