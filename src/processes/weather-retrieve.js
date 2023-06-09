import axios from "axios";

export function retrieve(coords) {
    const API = require("./../OpenWeatherMapApi.json");
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.long}&appid=${API.key}`;

    return axios.get(baseURL).then((response) => {
        let output = response.data;
        return output;
    });
}