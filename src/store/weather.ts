import { createSlice } from "@reduxjs/toolkit";

interface IWeather{
  input: string;
  countryHistory: string[];
  currentWeather: CurrentWeather | null;
}

interface Coordinates {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level?: number;
  grnd_level?: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust?: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface CurrentWeather {
  coord: Coordinates;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const initialState:IWeather = {
  input: '',
  countryHistory: [],
  currentWeather: null,
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateInput: (state, action) => {
      state.input = action.payload;
    },
    addCountryToHistory: (state, action) => {
      if (!state.countryHistory.includes(action.payload)) {
        state.countryHistory = [...state.countryHistory, action.payload];
      }
    },
    updateCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
  },
})

export default weatherSlice.reducer;
export const { updateInput, addCountryToHistory, updateCurrentWeather } = weatherSlice.actions;