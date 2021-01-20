import React from "react";

function Weather(props) {
  return (
    <div className="container">
      <div className="cards">
        <h1>
          {props.city}
        </h1>
        <h5 className="py-4">
          <i className={"wi " + props.weatherIcon + " display-1"}></i>
        </h5>
       {props.tempCurrent ?  <h1 className="py-2 px-4">{props.tempCurrent}&deg;</h1> : null} 
        {minmaxTemp(props.minTemp, props.maxTemp)}
        <h3 className="py-4 text-capitalize">{props.description}</h3>
      </div>
    </div>
  );
}
function minmaxTemp(min, max) {
  if(min&&max){
  return (
    <h3>
      <span className="px-4">{min}&deg;</span>
      <span className="px-4">{max}&deg;</span>
    </h3>
  );
  }
}
export default Weather;
