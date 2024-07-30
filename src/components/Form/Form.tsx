import axios from "axios";
import styles from './form.module.scss'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addCountryToHistory, updateCurrentWeather, updateInput } from "../../store/weather";
import { weatherIcon } from "../General";

export function Form({ setWeatherImg }: { setWeatherImg: (value: keyof typeof weatherIcon) => void }) {
  const WeatherState = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>()
  
  useEffect(() => {
    console.log(WeatherState.countryHistory);
  },[WeatherState.countryHistory])

  const getWeather = async() => {
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${WeatherState.input}&units=metric&lang=ru&appid=fcca49da077b7c62ff42dd6365329afb`)
      .then(response => {
        dispatch(addCountryToHistory(response.data.name))
        dispatch(updateCurrentWeather(response.data))
        dispatch(updateInput(''));
        console.log(response.data);
      })
      .catch(error => {
        dispatch(updateCurrentWeather(null))
        setWeatherImg('null')
        console.error('Error fetching weather data:', error);
      });
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInput(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getWeather()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input className={styles.inpt} type="text" 
              onChange={(e) => handleInputChange(e)}
              value={WeatherState.input}
            />
      <input capture className={styles.btn} type="submit" value="Узнать" />
    </form>
  )
}