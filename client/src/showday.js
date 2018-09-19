import React, { Component } from 'react';
// import dateVariable from "./datum.js";
import Dag from "./dagar/dag.js"



class Showday extends Component {

    constructor(){
      super();
    }

    render(){
      let page = 1;
      let currentD = ""
      let currentDate = ""
      for(let i=1; i<8;i++){

        if(this.props.day.currentDay === i){

          page = i;
          currentD = this.props.day.currentDayName
          currentDate = this.props.day.currentWeek[i-1]
        }
      }


      switch (page) {
        case 1:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 2:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 3:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 4:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 5:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 6:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;
        case 7:
          return (<Dag handler={this.props.handler} mainProps={this.props} day={currentD} date={currentDate}/>)
            break;

        default:

      }





    }

}

export default Showday
