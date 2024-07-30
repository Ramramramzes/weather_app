import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styles from './weatherdata.module.scss';

export function WeatherData() {
  const WeatherState = useSelector((state: RootState) => state.weather);

  return (
    <>
    {WeatherState.currentWeather != null ? 
      <div className={styles.container}>
        <span className={styles.city}>{WeatherState.currentWeather.name}</span>
        <span className={styles.mainTemp}>{Math.ceil(WeatherState.currentWeather.main.temp)}°</span>
        <div className={styles.maxmin}>
          <span>max: {Math.ceil(WeatherState.currentWeather.main.temp_max)}°</span>
          <span>mix: {Math.ceil(WeatherState.currentWeather.main.temp_min)}°</span>
        </div>
      </div>
    :
    <></>}
    </>
  );
}
