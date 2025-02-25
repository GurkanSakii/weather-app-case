import styled from "styled-components";

const WeatherCard = ({ weather, unit }) => {
  return (
    <Card>
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>
        Temperature: {weather.main.temp.toFixed(2)} {unit === "metric" ? "°C" : "°F"}
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
