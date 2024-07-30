import axios from 'axios';
import styles from './history.module.scss';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { updateCurrentWeather, updateInput } from '../../store/weather';

export function History() {
  const WeatherState = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch<AppDispatch>()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const historyClickHandler = async(country:string) => {
    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&lang=ru&appid=fcca49da077b7c62ff42dd6365329afb`)
      .then(response => {
        dispatch(updateCurrentWeather(response.data))
        dispatch(updateInput(''));
        handleClose()
        console.log(response.data);
      })
      .catch(error => {
        dispatch(updateCurrentWeather(null))
        console.error('Error fetching weather data:', error);
      });
  }

  return (
    <>
      <button onClick={handleShow} className={styles.btn}>
        История
      </button>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>История</Offcanvas.Title>
        </Offcanvas.Header>
        {WeatherState.countryHistory.length > 0 ? 
        <ul className={styles.list}>
          {WeatherState.countryHistory.map((country,index) => (
            <li key={index} onClick={() => historyClickHandler(country)}>{country}</li>
          ))}
        </ul>
        :
        'История пуста'}
      </Offcanvas>
    </>
  );
}