import styles from './general.module.scss';
import { Form } from "../Form";
import clear  from '../../assets/clear.jpg';
import rain from '../../assets/rain.jpg';
import thunder from '../../assets/Thunderstorm.png';
import snow from '../../assets/snow.jpg';
import clouds from '../../assets/clouds.jpg';
import logo from '../../assets/я.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import { WeatherData } from '../WeatherData';
import { History } from '../History';

export const weatherIcon = {
  'null': logo,
  'Clear': clear,
  'Rain': rain,
  'Thunderstorm': thunder,
  'Snow': snow,
  'Clouds': clouds
};

export function General() {
  const WeatherState = useSelector((state: RootState) => state.weather);
  const [weatherImg, setWeatherImg] = useState<keyof typeof weatherIcon>('null');

  useEffect(() => {
    if (WeatherState.currentWeather != null) {
      setWeatherImg(WeatherState.currentWeather.weather[0].main as keyof typeof weatherIcon);
    }
  }, [WeatherState.currentWeather]);

  return (
    <div 
      className={styles.general} 
      style={{ backgroundImage: `url(${weatherIcon[weatherImg]})` }} 
    >
      <WeatherData />
      <Form setWeatherImg={setWeatherImg} />
      <History />
    </div>
  );
}
