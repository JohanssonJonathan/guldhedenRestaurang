import React, { Component } from 'react';
import dateVariable from "./datum.js";



class Week extends Component {

    constructor(){
      super();
      this.state={
        currentId: "",
        showWeek: false,
      }
    }

    clickLi(i,d){


      this.props.handler(i+1,d,"day"+(i+1),this.state.showWeek)

      this.setState({
        currentId:i
      })
    }

    getStyling(id){

      if(id=== this.state.currentId){

        return {background:"rgba(255,255,255,0.6)", color:"rgba(0,0,0,0.5)"}
      }



    }

    showWeekDays(bool){
      if(bool){
        this.setState({
          showWeek:true,
        })
      }else{
        this.setState({
          showWeek:false,
        })
      }

    }

    render(){

      return(

        <React.Fragment>
          {this.state.showWeek ?
            <div className="weekList">
              <ul className="week" onClick={e=>this.showWeekDays(false)}>
                  {dateVariable.datum.listaWeek.map((d,i)=>
                    <li id={i} style={this.getStyling(i)}  onClick={e=> this.clickLi(i,d) } key={i}>{d}</li>)
                  }
              </ul>
            </div>

            :
            <div className="showWeek" onClick={e=> this.showWeekDays(true)}>Välj dag</div>
          }

          </React.Fragment>
        )

    }
}

export default Week
