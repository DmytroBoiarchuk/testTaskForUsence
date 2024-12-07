
export interface CacheContextReadOnlyInterface {
  searchTerm: string;
  coordinates: { lat: string; lng: string };
}
export interface CacheContextInterface extends CacheContextReadOnlyInterface {
  addCache: (term: string, coords: { lat: string; lng: string }) => void;
}
export interface SearchResultInterface {
  context: {
    geo_bounds: {
      circle: {
        center: {
          latitude: number;
          longitude: number;
        },
        radius: number
      }
    }
  }
  results: PlaceInterface[];
}
export interface City {
  adminCode1: string;
  adminCodes1: { ISO3166_2: string };
  adminName1: string;
  countryCode: string;
  countryId: string;
  countryName: string;
  fcl: string;
  fclName: string;
  fcode: string;
  fcodeName: string;
  geonameId: number;
  lat: string;
  lng: string;
  name: string;
  population: number;
  toponymName: string;
}

export interface PlaceInterface {
  fsq_id: string;
  geocodes: {
    main: { latitude: number; longitude: number };
    roof: { latitude: number; longitude: number };
  };
  link: string;
  location: {
    address: string;
    admin_region: string;
    country: string;
    formatted_address: string;
    locality: string;
    post_town: string;
    postcode: string;
    region: string;
  };
  name: string;
  rating:number;
}
export interface DemoPlaceDataInterface {
  fsq_id: string,
  categories:
    {
      id: number,
      name: string,
      short_name: string,
      plural_name: string,
      icon: {
        prefix: string,
        suffix: string
      }
    }[],
  description: string | undefined,
  photos:
    {
      id: string,
      created_at: string,
      prefix: string,
      suffix: string,
      width: number,
      height: number
      classifications: string[]
    }[],
  rating: number | undefined,
}