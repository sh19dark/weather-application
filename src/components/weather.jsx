import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react";

import style from "./weather.module.css";

import wind from "./img/wind.png";
import humidity from "./img/humidity.png";
import pressure from "./img/pressure.png";

function Weather() {
    const [weather, setWeather] = useState([]);
    const [INPUT, setINPUT] = useState("");
    const [CITY, setCITY] = useState("tetouan");

    useEffect(() => {
        if (INPUT !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=7aa369ece7e8f58bb59291029700b587`)
                .then(res => {
                    setWeather(res.data);
                    setINPUT("")
                })
                .catch((e) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${INPUT} is not a city!`,
                    })
                })
        }
    }, [CITY])
    const handchange = (e) => {
        setINPUT(e.target.value)
    }
    const handclick = (e) => {
        e.preventDefault()
        if (INPUT === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'input is empty!',
            })
        }
        else {
            setCITY(INPUT)
        }
    }
    return (
        <div className={style.parent}>
            <div className={style.child}>
                <div className={style.child2}>
                    <form className={style.form}>
                        <input onChange={handchange} value={INPUT} type="text" placeholder="choose the city..." />
                        <button onClick={handclick}>search</button>
                    </form>
                    {weather.length !== 0 &&
                        <div className={style.info}>
                            <div className={style.head}>
                                <div>
                                    <img src={pressure} alt="" />
                                    {weather.main.pressure}hPa
                                </div>
                                <div>
                                    <img src={humidity} alt="" />
                                    {weather.main.humidity}%
                                </div>
                                <div>
                                    <img src={wind} alt="" />
                                    {weather.wind.speed}m/s
                                </div>
                            </div>
                            <div className={style.temp}>{Math.floor(weather.main.temp - 273.15)}<span>°C</span></div>
                            <div className={style.city}>{weather.name}, {weather.sys.country}</div>
                            <div className={style.desc}>{weather.weather[0].description}</div>
                            <div className={style.img}>
                                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
export default Weather;