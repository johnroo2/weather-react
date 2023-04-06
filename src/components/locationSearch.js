import React from 'react';
import {useRef} from 'react'
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
              return cval;
            }
          }
          alert("Entry not found");
        }
        return cval;
    }

    return(
      <div className="top-container">
        <div className="top-subcontainer">
          <TextField
          shrink="false"
          id="outlined-basic"
          variant="standard"
          inputRef={valueRef}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              sendValue();
              ev.preventDefault();
            }
          }}
          InputLabelProps={{
            style: { color: "white", fontFamily: "Jost", fontWeight: "lighter"},
          }}
          inputProps={{
            style: { color: "#99CCE9", fontFamily: "Jost", fontWeight: "lighter"},
            classes: {
              root: 'MuiInputBase-root',
              input: 'MuiInput-root',
            },
          }}
          sx={{ 
            minWidth:"28%",
            minHeight:"50px",
            maxWidth:"28%",
            maxHeight:"50px",
            marginTop:"2vh",
            '& .MuiInput-underline:before': {
              borderBottomColor: 'white',
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#99CCE9', 
            },
            '&:hover .MuiInputBase-root.MuiInput-root:before': {
              borderBottomColor: 'white',
            },
            '& .MuiInputBase-root.Mui-focused:not(.Mui-disabled):before': {
              borderBottomColor: 'white',
            },
            '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'white',
            },
          }}
          label="search a location..."
        />

        <Button
        onClick={sendValue}

        variant="contained"
        size="small"

        startIcon={<img src={require("./../imgs/searchIcon.png")} 
        style={{width:"25px",
            height:"25px",
            marginLeft:"12px"}}
        alt="search"/>}

        sx={{backgroundColor:"#99CCE9", 

        width: "5%",
        height: "50%",

        marginTop:"3vh",

        '&:hover': {
          backgroundColor: 'white'
        }

        }}
        />
      </div>
   </div>     
  );
};