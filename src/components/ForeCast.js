import styled from "styled-components";

const ForeCast = ({ forecast, unit }) => {
  const dailyForecasts = forecast.list.slice(3).filter((_, index) => index % 8 === 0);

  const convertTemperature = (temp) => {
    return unit === "metric" ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <ForecastContainer>
      <h3>5-Day Forecast</h3>
      <ForecastArea>
        <ForecastList>
          {dailyForecasts.map((day, index) => (
            <ForecastItem key={index}>
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p>
                Temp: {convertTemperature(day.main.temp)} {unit === "metric" ? "°C" : "°F"}
              </p>
              <p>{day.weather[0].description}</p>
            </ForecastItem>
          ))}
        </ForecastList>
      </ForecastArea>
    </ForecastContainer>
  );
};

export default ForeCast;

const ForecastContainer = styled.div`
  margin-top: 20px;
  text-transform: capitalize;
`;

const ForecastArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ForecastList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
`;

const ForecastItem = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
  min-width: 150px;
`;
