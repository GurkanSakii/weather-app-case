import { useEffect, useState } from "react";
import styled from "styled-components";

const WeatherCard = ({ weather, unit }) => {
  const [temperature, setTemperature] = useState(weather.main.temp);

  useEffect(() => {
    if (unit === "metric") {
      setTemperature(weather.main.temp);
    } else {
      setTemperature((weather.main.temp * 9) / 5 + 32);
    }
  }, [weather.main.temp, unit]);

  return (
    <Card>
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>
        Temperature: {temperature} {unit === "metric" ? "°C" : "°F"}
      </p>
      <p>Condition: {weather.weather[0].description}</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </Card>
  );
};

export default WeatherCard;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;
