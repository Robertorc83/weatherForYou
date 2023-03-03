export interface CityData {
    slug: string;
    country: string;
    lat: number;
    long: number;
    id: number
};

export interface Temp {
    dt: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
}

export interface TempCardProps extends Omit<Temp, 'temp'| 'dt'>, Pick<Temp['temp'], 'day' | 'min' | 'max' | 'night' | 'eve' | 'morn'> {
    date: number;
}