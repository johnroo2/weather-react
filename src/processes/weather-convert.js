function dirFromAngle(ori, cardinal){
    if ((ori >= 360 - cardinal  && ori <= 360)|| (ori <= cardinal && ori >= 0)){return "N";}
    else if (ori > cardinal && ori < 90 - cardinal){return "NE";}
    else if(ori >= 90 - cardinal && ori <= 90 + cardinal){return "E";}
    else if(ori > 90 + cardinal && ori < 180 - cardinal){return "SE";}
    else if(ori >= 180 - cardinal && ori <= 180 + cardinal){return "S";}
    else if(ori > 180 + cardinal && ori < 270 - cardinal){return "SW";}
    else if(ori >= 270 - cardinal && ori <= 270 + cardinal){return "W";}
    else if(ori > 270 + cardinal && ori < 360 - cardinal){return "NW";}
    else{return "";}
  }
  
function tempMod(temp, digits){
    let intVal = +parseFloat((Number(temp)-273)).toFixed(digits);
    return intVal + "°";
}

function dateProcess(time, full=false){
    if (full){
        return new Date(time*1000).toLocaleString();
    }
    return new Date(time*1000).toLocaleTimeString();
}

function getImage(data){
    let current = data.weather[0].main;
    if(current){
        if(current === "Clear"){return require("./../imgs/clear.png");}
        else if(current === "Clouds"){return  require("./../imgs/clouds.png");}
        else if(current === "Mist"){return require("./../imgs/mist.png");}
        else if(current === "Overcast"){return require("./../imgs/overcast.png");}
        else if(current === "Rain"){return require("./../imgs/rain.png");}
        else if(current === "Snow"){return require("./../imgs/snow.png");}
        else if(current === "Thunderstorm"){return require("./../imgs/thunderstorm.png");}
        else{return require("./../imgs/yikes.png");}
    }
    else{
        return require("./../imgs/yikes.png");
    }
}

export function convert(data){
    let weather;

    if (data){
        weather = {
            loading: false,
            loc: !data.name ? "Unknown" : data.name,
            country: !data.sys.country ? "??" : data.sys.country,
            retrieved: !data.dt ? "Unknown" : dateProcess(data.dt, true),
            temp: !data.main.temp ? "Unknown" : tempMod(data.main.temp, 0),
            temp_fl: !data.main.feels_like ? "Unknown" : tempMod(data.main.feels_like, 0),
            wtype: !data.weather[0].main ? "Unknown" : data.weather[0].main,
            wind: (!data.wind.speed || !data.wind.deg) ? "0 km/h []" : parseFloat(data.wind.speed * 3.6).toFixed(0)
            + " km/h [" + dirFromAngle(data.wind.deg, 20) + "]",
            wind_gust: !data.wind.gust ? "0 km/h" : parseFloat(data.wind.gust * 3.6).toFixed(0) + " km/h",
            humidity: !data.main.humidity ? "0%" : data.main.humidity + "%",
            pressure: !data.main.pressure ? "0 kPa" : data.main.pressure/10.0 + " kPa", //?? 
            visibility: !data.visibility ? "0 km" : parseFloat(2.4 * data.visibility/1000.0).toFixed(1) + " km", //this is broken
            sunrise: !data.sys.sunrise ? "Unknown" : dateProcess(data.sys.sunrise), 
            sunset: !data.sys.sunset? "Unknown" : dateProcess(data.sys.sunset),
            image: getImage(data)
        };
    }
    else{
        weather = {
        loading:true};
    }

    return weather;
}