import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faCloudRain, faCloud } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";

import classes from "./App.module.css";

// const wheater = [
//   {
//     id: "w1",
//     day: "Friday",
//     date: "March 1st, 1:00 pm",
//     icon: <WbSunnyIcon fontSize="large" />,
//     temperature: 35,
//     precipitation: "clear sky",
//   },
//   {
//     id: "w2",
//     day: "Saturday",
//     date: "March 2nd, 1:00 pm",
//     icon: <CloudIcon fontSize="large" />,
//     temperature: 36,
//     precipitation: "light rain",
//   },
//   {
//     id: "w3",
//     day: "Sunday",
//     date: "March 3nd, 1:00 pm",
//     icon: <CloudIcon fontSize="large" />,
//     temperature: 36,
//     precipitation: "broken clouds",
//   },
//   {
//     id: "w4",
//     day: "Monday",
//     date: "March 4th, 1:00 pm",
//     icon: <WbSunnyIcon fontSize="large" />,
//     temperature: 34,
//     precipitation: "clear sky",
//   },
//   {
//     id: "w5",
//     day: "Tuesday",
//     date: "March 5th, 1:00 pm",
//     icon: <CloudIcon fontSize="large" />,
//     temperature: 26,
//     precipitation: "Scattened clouds",
//   },
// ];

const App = () => {
  const [isTouced, setIsTouched] = useState(true);
  const [days, setDays] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(
        "https://wheater-app-7abf7-default-rtdb.firebaseio.com/wheater.json"
      );

      const data = await res.json();

      console.log(data);
      setDays(data);
    };
    getData();
  }, []);

  const switchHandler = () => {
    setIsTouched(!isTouced);
  };

  const calculateTemperature = (wheaterDay) => {
    return ((wheaterDay.temperature - 32) / 1.8).toFixed();
  };

  console.log(days);
  const wheater = Object.keys(days).map((key) => ({ ...days[key] }));

  console.log(wheater);

  return (
    <div>
      {wheater.length > 0 &&
        wheater.map((wheaterDay) => {
          return (
            <div className={classes.card}>
              <Card
                sx={{
                  maxWidth: 200,
                  textAlign: "center",
                }}
              >
                <CardHeader
                  title={wheaterDay.day}
                  subheader={wheaterDay.date}
                />
                <CardContent>
                  <Typography className={classes.img}>
                    <FontAwesomeIcon
                      icon={
                        wheaterDay.icon === 1
                          ? faSun
                          : wheaterDay.icon === 2
                          ? faCloud
                          : faCloudRain
                      }
                      className="fa-3x"
                    />
                  </Typography>
                  <Typography variant="h4">
                    {`${
                      isTouced
                        ? wheaterDay.temperature
                        : calculateTemperature(wheaterDay)
                    } ${isTouced ? "F" : "C"}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {wheaterDay.precipitation}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          );
        })}
      <Switch defaultChecked onClick={switchHandler} />
    </div>
  );
};

export default App;
