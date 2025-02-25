import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import styled, { createGlobalStyle } from "styled-components";
import { fetchWeatherData, fetchForecastData } from "../utils/api";

import History from "../components/History";
import ForeCast from "../components/ForeCast";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";

const weatherImages = {
  Fog: "/images/fog.jpg",
  Rain: "/images/rain.jpg",
  Snow: "/images/snow.jpg",
  Clear: "/images/clear.jpg",
  Clouds: "/images/cloud.jpg",
  Default: "/images/default.jpg",
  Thunderstorm: "/images/thunderstorm.jpg",
};

export default function Home({ initialWeather }) {
  const [city, setCity] = useState(initialWeather.name);
  const [unit, setUnit] = useState("metric");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const handleSearch = (cityName) => {
    setCity(cityName);
    const updatedHistory = [cityName, ...history.filter((c) => c !== cityName)].slice(0, 5);
    setHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const { data: weather, error } = useQuery({
    queryKey: ["weather", city, unit],
    queryFn: () => fetchWeatherData(city, unit),
    enabled: !!city,
    retry: false,
  });

  const { data: forecast } = useQuery({
    queryKey: ["forecast", city, unit],
    queryFn: () => fetchForecastData(city, unit),
    enabled: !!city,
    retry: false,
  });

  const weatherCondition = weather?.weather?.[0]?.main || "Default";
  const background = weatherImages[weatherCondition] || weatherImages.Default;

  return (
    <>
      <GlobalStyle />
      <BackgroundWrapper>
        <Image src={background} alt="Weather background" fill style={{ objectFit: "cover" }} priority={false} />
      </BackgroundWrapper>
      <Container>
        <h1>Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {error && <ErrorMessage>Hata: {error.message}</ErrorMessage>}
        {weather && (
          <>
            <ToggleButton onClick={toggleUnit}>{unit === "metric" ? "Switch to °F" : "Switch to °C"}</ToggleButton>
            <WeatherCard weather={weather} unit={unit} />
          </>
        )}
        {forecast && <ForeCast forecast={forecast} unit={unit} />}
        {history.length > 0 && <History history={history} onSearch={handleSearch} />}
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const initialWeather = await fetchWeatherData("Ankara", "metric");
  return {
    props: { initialWeather },
    revalidate: 3600,
  };
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    text-align: center;
  }

  h1,h3 {
    color: #fff;
  }
`;

const BackgroundWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Container = styled.div`
  padding: 0 10px;
`;

const ToggleButton = styled.button`
  margin-top: 10px;
  padding: 8px 15px;
  font-size: 16px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #218838;
  }
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-transform: capitalize;
`;
