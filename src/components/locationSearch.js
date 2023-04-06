import React from 'react';
import {useRef, Component} from 'react'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./../App.css";
import {retrieve} from "./../processes/weather-retrieve";
import {convert} from "./../processes/weather-convert";

const cities = require('cities.json');

export default function LocationSearch({setWeather}){
    const valueRef = useRef('');

    let cval = "";

    const sendValue = () => {
        cval = valueRef.current.value;

        if (cval !== undefined || cval !== null || cval !== "") {
          for (let i = 0; i < cities.length; i++) {
            if (cval.toString().toLowerCase() === cities[i].name.toLowerCase()) {
              retrieve({lat:cities[i].lat, long:cities[i].lng}).then((result) => {
                setWeather(convert(result));
              })
              break;
            }
          }
        }
        return cval;
    }

    return(
        <div className="top-container">
            <div className="top-subcontainer">
                <TextField
                shrink="false"
                id="outlined-basic"
                variant="outlined" 
                inputRef={valueRef}
                InputLabelProps={{
                    style: { color: "white", fontFamily: "Jost", fontWeight: "lighter"},
                    }}
                inputProps={{
                    style: { color: "#99CCE9", fontFamily: "Jost", fontWeight: "lighter"},
                    }}
                sx = {{
                    minWidth:"28%",
                    minHeight:"50px",
                    maxWidth:"28%",
                    maxHeight:"50px",

                    marginTop:"2vh",
                    
                    "& .MuiOutlinedInput-root": {
                        "& > fieldset": {
                            borderColor: "white",
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "white",
                        }             
                    },
                    "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                        borderColor: "white",
                        }
                    },
                    input:{color:"white"},
                    label:{color:"white"}
                }}
                label="search a location...">
                </TextField>

                <Button
                onClick={sendValue}

                variant="contained"
                startIcon={<img src={require("./../imgs/searchIcon.png")} 
                style={{width:"38px",
                    height:"38px",
                    marginLeft:"12px"}}
                alt="search"/>}

                sx={{backgroundColor:"#99CCE9", 
                minWidth:"50px", 
                minHeight:"50px",
                maxWidth:"50px", 
                maxHeight:"50px",

                marginTop:"3vh",

                '&:hover': {
                    backgroundColor: 'white'
                }}}
                />

                <p style={{color:"white"}}>{cval}</p>
            </div>
        </div>     
    );
};