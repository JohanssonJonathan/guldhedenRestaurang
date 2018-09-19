import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import dateVariable from "./datum.js";
import Week from "./week.js";
import Showday from "./showday.js"
import "./App.css"

class App extends Component {

  constructor(){
    super();
    this.state={
      currentDay : 1,
      callWeek: true,
      currentWeek: [],
      currentDayNrClickedOn: "",
      currentMonthClickedOn: "",
      fullDate: "",
      resetValues:false,
      currentDayNr:""
    }

    this.handler = this.handler.bind(this)

  }

  componentDidUpdate(){
    // fetch("/api/jonte").then(res=> res.json()).then(user => this.setState({person:user}))
  }

  handler(value,dayNr,dayId){

    let currentMonthClickedOn = ""

    if(value !== undefined){
    let wholeDaySubstring = ""
    let wholeDay = dayNr;
    wholeDaySubstring = wholeDay.substring(0,3)

    let wholeDayNr= dayNr;

    function loopaText(val){

      for(let i=0; i< val.length; i++){
        if(val.charAt(i)=== "/"){
          currentMonthClickedOn = val.charAt(i+1)
        }
      }

    }

    if(wholeDayNr.substring(0,3) === "Tor"){
      loopaText(dayNr)
      dayNr = dayNr.substring(8,10)

    }else{
      loopaText(dayNr)

      dayNr = dayNr.substring(7,9)
    }

    for(let i=0; i<dayNr.length; i++){
      if(dayNr.charAt(i)=== "/"){
        dayNr = dayNr.charAt(i-1);
      }
    }
      this.setState({
        currentDay: value,
        currentDayNrClickedOn: dayNr,
        currentMonthClickedOn: currentMonthClickedOn,
        resetValues:true,
        wholeDaySubstring: wholeDaySubstring
      })
    }else{
      this.setState({
        resetValues:false,
      })
    }

  }

  componentDidMount(){


    this.setState(
      {
      callWeek: false,
      currentWeek: dateVariable.datum.listaWeek,
      currentDayNrClickedOn: dateVariable.datum.currentDayNrInMonth,
      currentMonthClickedOn:dateVariable.datum.currentMonth,
      currentDayNr:dateVariable.datum.currentDayNrInMonth,
      wholeDaySubstring: dateVariable.datum.listaWeek[0].substring(0,3),
    })

  }




  render() {


    let weekNr =dateVariable.datum.currentDayNrInWeek;
    let monthNr =dateVariable.datum.currentDayNrInMonth;
    let currentMonth = dateVariable.datum.currentMonth;
    let year = dateVariable.datum.fullYear;

    if(this.state.callWeek){
      dateVariable.createWeekList(weekNr,monthNr , currentMonth, year)
    }


    return (
      <div >
        <h3>Anmälan för lunch/middag på Guldheden</h3>
        <p> Lunch serveras mellan 11:30 till 13:00.</p>

        <p>Middag serveras mellan 16:00 till 17:00.</p>
        <div className="diven">
          <h5 id="textKlickaI" >Klicka i den dag som du vill anmäla dig själv</h5>

          <Week handler={this.handler}/>
        </div>
        <Showday day={this.state} handler={this.handler}/>



      </div>
    );
  }
}

export default App;
