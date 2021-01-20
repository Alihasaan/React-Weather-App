import React from "react";
import Weather from "./app_components/weather.component.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weather-icons-master/css/weather-icons.css";
import Form from "./app_components/form.component";
import "./App.css";
const API_key = "d17964bd50ad650c065c1cc255174b74";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      tempCurrent: undefined,
      minTemp: undefined,
      maxTemp: undefined,
      description: "",
      icon: undefined,
      error : false,
      response : ""
      
    };
  
  this.weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Dizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Fog: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };
}
  calcelius(temp) {
    let cell = Math.floor(temp - 273);
    return cell;
  }
  get_weatherIcon(icon, rangeID) {
    if (rangeID >= 200 && rangeID <= 232) {
      this.setState({ icon: this.weatherIcon.Thunderstorm });
    } else if (rangeID >= 300 && rangeID <= 321) {
      this.setState({ icon: this.weatherIcon.Dizzle });
    } else if (rangeID >= 500 && rangeID <= 531) {
      this.setState({ icon: this.weatherIcon.Rain });
    } else if (rangeID >= 600 && rangeID <= 622) {
      this.setState({ icon: this.weatherIcon.Snow });
    } else if (rangeID >= 701 && rangeID <= 781) {
      this.setState({ icon: this.weatherIcon.Fog });
    } else if (rangeID >= 801 && rangeID <= 804) {
      this.setState({ icon: this.weatherIcon.Clouds });
    } else if (rangeID === 800) {
      this.setState({ icon: this.weatherIcon.Clear });
    } else {
      this.setState({ icon: this.weatherIcon.Clear });
    }
  }
  getWeather = async (e) => {
    
      e.preventDefault();
    const city = e.target.elements.city.value; 
    const country = e.target.elements.country.value; 
    if(city){
      const api_call = await fetch(
        "http://api.openweathermap.org/data/2.5/weather?q=" +
         city + ","+
         country+
         "&appid=" +
         API_key 
        // "d17964bd50ad650c065c1cc255174b74"
          
      );
     
      const response = await api_call.json();
      
      if(response.cod==="404"){
        this.setState({error : true});
        this.setState({response : response.message});
      }
      else{
      this.setState({
        city: response.name +" , "+response.sys.country ,
        tempCurrent: this.calcelius(response.main.temp),
        minTemp: this.calcelius(response.main.temp_min),
        maxTemp: this.calcelius(response.main.temp_max),
        description: response.weather[0].description,
        error : false
      });
      this.get_weatherIcon(this.weatherIcon, response.weather[0].id);
    }
    }
    else{
        this.setState({error : true});
        console.log(this.state.error);
  }
  };
  render() {
    
      return (
        <div className="App">
          
          <Form loadweather={this.getWeather} error = {this.state.error}
           />
          <Weather
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            tempCurrent={this.state.tempCurrent}
            minTemp={this.state.minTemp}
            maxTemp={this.state.maxTemp}
            weatherIcon={this.state.icon}
          />
        </div>
      );
    }
    
  
}

export default App;
