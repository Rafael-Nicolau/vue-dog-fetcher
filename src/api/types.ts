interface weight {
  imperial: string;
  metric: string;
}

interface height {
  imperial: string;
  metric: string;
}

export interface breeds {
  weight: weight;
  height: height;
  id: number;
  name: string;
  country_code?: string;
  bred_for: string;
  breed_group?: string;
  life_span: string;
  origin?: string;
  temperament: string;
  reference_image_id: string;
}

export interface Dog {
  breeds: [breeds];
  id: string;
  url: string;
  width: number;
  height: number;
}
