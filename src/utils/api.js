"use client";
import axios from "axios";
const API_KEY = "554250b77098b3419c9c2e9fc89521e0";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeatherData = async (city, unit = "metric") => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const fetchForecastData = async (city, unit = "metric") => {
  try {
    const response = await axios.get(FORECAST_URL, {
      params: {
        q: city,
        units: unit,
        appid: API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(`HTTP Error: ${error.code}`);
  }
};
