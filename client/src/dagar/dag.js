import React, { Component } from 'react';
import rumsnummerLista from "./rumsnummerLista.js"
// import dateVariable from "../datum.js";
import "../App.css"




class Dag extends Component {

    constructor(){
      super();

      this.state ={
        rumsnummer:"",
        lunch:false,
        middag:false,
        vegetarisk:false,
        laktosfritt:false,
        mjolkfritt:false,
        glutenfritt:false,
        message:"",
        inputStyle:{
          background:"",
          color:""
        },
        clickedRegister:false,
        finalMessage:{
          correctMessage:false,
          korrekta: "",
          values:"",
          regret:""
        }
      }

      this.rumsnummer = this.rumsnummer.bind(this);

    }

    staten(mat, self){

      console.log(mat)
        if(mat === "lunch"){

          if(self.state.lunch === false){
            self.setState({
              lunch: true
            })
          }else{
            self.setState({
              lunch:false,
            })
          }
        }else if(mat === "middag"){
          if(self.state.middag === false){
            self.setState({
              middag: true
            })
          }else{
            self.setState({
              middag:false,
            })
          }
        }else if(mat === "vegetarisk"){
          if(self.state.vegetarisk === false){
            self.setState({
              vegetarisk: true
            })
          }else{
            self.setState({
              vegetarisk:false,
            })
          }
        }else if(mat ==="laktosfritt"){
          if(self.state.laktosfritt === false){
            self.setState({
              laktosfritt: true
            })
          }else{
            self.setState({
              laktosfritt:false,
            })
          }
        }else if(mat ==="mjolkfritt"){
          if(self.state.mjolkfritt === false){
            self.setState({
              mjolkfritt: true
            })
          }else{
            self.setState({
              mjolkfritt:false,
            })
          }
        }else if(mat ==="glutenfritt"){
          if(self.state.glutenfritt === false){
            self.setState({
              glutenfritt: true
            })
          }else{
            self.setState({
              glutenfritt:false,
            })
          }
        }

    }

    handleClick(mat){

        this.staten(mat,this)

    }

    sendAndResetValues(){
      this.props.handler()
      this.setState({
        lunch:false,
        middag:false,
        vegetarisk:false,
        laktosfritt:false,
        mjolkfritt:false,
        glutenfritt:false
      })
    }

    getDefault (){
      return {
        value: ""
      }
    }
    componentDidMount(){

    }

    timeToRegistrateFood(today, currentNrClickedOn){

        today = Number(today);
        currentNrClickedOn = Number(currentNrClickedOn)

        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();


        if(today === currentNrClickedOn){

          if(hours > 8 || hours === 8 &&  minutes > 30){
                 return false;
          }else{
            return true;
          }

        }else{
          return true;
        }

    }


//Kolla om alla värdena stämmer och är korrekta innan de skickas till databasen

    registerFood(currentNrClickedOn,currentMonthClickedOn, wholeDaySubstring){

        //Diven ska visas även om man skrivit fel eller ej
      this.setState({
        clickedRegister:true
      })

      let personObj= {
        rumsnummer:this.state.rumsnummer,
        "day":currentNrClickedOn,
        "month":currentMonthClickedOn,
        lunch:this.state.lunch,
        middag:this.state.middag,
        vegetarisk:this.state.vegetarisk,
        laktosfritt:this.state.laktosfritt,
        mjolkfritt:this.state.mjolkfritt,
        glutenfritt:this.state.glutenfritt,
        dagensNamn: wholeDaySubstring

      }

      //Kolla om allt stämmer överens!

      //Kolla först rumsnummer om det numret finns
      let rumsnummer = Number(this.state.rumsnummer);
      let rumsnummerFinns = false

      for(let i=0; i < rumsnummerLista.length; i++){

        if(rumsnummer === rumsnummerLista[i]){
          rumsnummerFinns = true
        }

      }




      let rumNr = personObj.rumsnummer;
      let middag = personObj.middag;
      let lunch = personObj.lunch;
      let dag= personObj.day;
      let month = personObj.month;
      let veg = personObj.vegetarisk;
      let laktos = personObj.laktosfritt;
      let mjolk = personObj.mjolkfritt;
      let gluten= personObj.mjolkfritt;
      let dagensNamn = personObj.dagensNamn

      function setStateForTheFinalMessage(self,middag,lunch,dag,month,rumNr){

        if(lunch && middag){
          self.setState({
            finalMessage:{
              correctMessage:true,
              korrekta: "Allt klart! \n Stämmer detta?",
              values:`Nr ${rumNr} vill ha lunch och middag för ${dagensNamn} den ${dag}/${month}` ,
              regret:"Du kan inte ångra din registrering!"
            }
          })
        }else if(lunch && middag === false){
          self.setState({
            finalMessage:{
              correctMessage:true,
              korrekta: "Allt klart! \n Stämmer detta?",
              values:`Nr ${rumNr} vill ha lunch för ${dagensNamn} den ${dag}/${month}`,
              regret:"Du kan inte ångra din registrering!"
            }
          })
        }else if(lunch === false && middag){
          self.setState({
            finalMessage:{
              correctMessage:true,
              korrekta: "Allt klart! \n Stämmer detta?",
              values:`Nr ${rumNr} vill ha middag för ${dagensNamn} den ${dag}/${month}`,
              regret:"Du kan inte ångra din registrering!"
            }
          })
        }
      }

      console.log("rumsnummerFinns " + rumsnummerFinns)
      if(rumsnummerFinns && (middag || lunch)){
        //Första steget är att se att namnet finns och att man har kryssat i antingen middag eller lunch.


        //if (databasen ex....)
          //Andra steget MÅSTE man kolla i databasen och se om personen redan har registrerat sig eller
          // inte för den dagen.
          //HÄR MÅSTE GÖRAS EN FETCH för att få datan samt



          setStateForTheFinalMessage(this, middag, lunch, dag, month, rumNr)


      }else{

        this.setState({
          finalMessage:{
            correctMessage:false,
          }
        })
      }



  }

    // Uppdatera onchange på inputfältet för rumsnumret
    rumsnummer(e){
      this.setState({
        rumsnummer:e.target.value,
      })
    }

    // When focused out from the input field rumsnummer
    onfocusout(){

      let rumsnummer = Number(this.state.rumsnummer);
      let msg = "Rumsnummer finns inte"

      for(let i=0; i < rumsnummerLista.length; i++){

        if(rumsnummer === rumsnummerLista[i]){
          msg = ""
        }

      }

      if(msg !== "" && this.state.rumsnummer !== ""){
        this.setState({
          message: msg,
          inputStyle:{
            background: "rgb(189, 32, 32)",
            color:"white"
          },
        })
      }else{
        this.setState({
          message: msg,
          inputStyle:{
            background: "",
            color:"black"
          },
        })
      }

    }


    //Ta bort rutan som kommer upp när man klickar på registrera
    removeClickedRegister(){
      this.setState({
        clickedRegister:false
      })
    }

    render(){
      //Dagensdatum
      let todayNr = this.props.mainProps.day.currentDayNr;
      //Veckansdagar 7 dagar framåt från idag
      let veckansDagar = this.props.mainProps.day.currentWeek;
      //Datumet på den dagen du klickar på
      let currentNrClickedOn = this.props.mainProps.day.currentDayNrClickedOn;

      let currentMonthClickedOn= this.props.mainProps.day.currentMonthClickedOn;

      let wholeDaySubstring = this.props.mainProps.day.wholeDaySubstring

      let studieDagar=[]

      //Om det är en lördag eller söndag så kommer det uppdatera currentday med
      //den dagen man klickar eller är på.
      let currentDay= ""
      if(wholeDaySubstring === "Lör" || wholeDaySubstring ==="Sön"){

        currentDay = wholeDaySubstring;
        return(<div className="schema">


                <h3>Vi serverar tyvärr inte mat på {currentDay}dagar</h3>

            </div>)
      }

      for(let i=0; i<studieDagar.length; i++){
        if(this.props.day === studieDagar[i]){
          return (<div className="schema">


                  <h3>Detta är tyvärr en studiedag</h3>
                  <h5>Vi serverar inte mat på studiedagar</h5>

              </div>)
        }
      }


        console.log("resetValues: " +this.props.mainProps.day.resetValues)
        if(this.props.mainProps.day.resetValues){
          this.sendAndResetValues()
        }
        return(<div className="schema">


            <div>

              {this.state.clickedRegister ?

                  <div className="clickedRegister">
                    <div>
                    <h2 onClick={e=>this.removeClickedRegister()}>X</h2>

                        {this.state.finalMessage.correctMessage ?
                          <React.Fragment>
                            <h2>{this.state.finalMessage.korrekta}</h2>
                            <h5>{this.state.finalMessage.values}</h5>
                            <h3>{this.state.finalMessage.regret}</h3>
                          </React.Fragment>
                          :
                          <React.Fragment>

                              <h2>Något gick fel?</h2>

                          </React.Fragment>
                        }
                    </div>
                  </div>
                  :

                  <div>

                  </div>
              }
              <h5 className="datumInp">{this.props.date}</h5>
              <p>{this.state.message}</p>
              <input name="nr" type="text" className="rumsnummerStyle" value={this.state.rumsnummer} style={this.state.inputStyle} onBlur={e=> this.onfocusout()} onChange={this.rumsnummer} placeholder="Rumsnummer" id="rumsnummer"/>

              <div>
              <label className="labelInput" >
                <input type="checkbox" name="lunch"  onClick={e=>this.handleClick("lunch")}/>
                Lunch
                {!this.state.lunch ?
                  <img alt=" " src="/unchecked.png"  />
                  :
                  <img alt=" " src="/success.png"  />

                }

              </label>

              <label className="labelInput">
                <input type="checkbox" name="middag" onClick={e=>this.handleClick("middag")} />
                Middag
                {!this.state.middag   ?
                  <img alt="" src="/unchecked.png" />
                  :
                  <img alt="" src="/success.png"/>
                }
              </label>

              <label className="labelInput">
                <input type="checkbox" name="vegestarisk" onClick={e=>this.handleClick("vegetarisk")} />
                Vegestarisk
                {!this.state.vegetarisk   ?
                  <img alt="" src="/unchecked.png" />
                  :
                  <img alt="" src="/success.png"/>
                }
              </label>
              <label className="labelInput">
                <input type="checkbox" name="vegestarisk" onClick={e=>this.handleClick("laktosfritt")} />
                Laktosfritt
                {!this.state.laktosfritt   ?
                  <img alt="" src="/unchecked.png" />
                  :
                  <img alt="" src="/success.png"/>
                }
              </label>
              <label className="labelInput">
                <input type="checkbox" name="vegestarisk" onClick={e=>this.handleClick("mjolkfritt")} />
                Mjölkfritt
                {!this.state.mjolkfritt   ?
                  <img alt="" src="/unchecked.png" />
                  :
                  <img alt="" src="/success.png"/>
                }
              </label>
              <label className="labelInput">
                <input type="checkbox" name="vegestarisk" onClick={e=>this.handleClick("glutenfritt")} />
                Glutenfritt
                {!this.state.glutenfritt   ?
                  <img alt="" src="/unchecked.png" />
                  :
                  <img alt="" src="/success.png"/>
                }
              </label>
              </div>
                {this.timeToRegistrateFood(todayNr, currentNrClickedOn) ?
                  <button onClick={e=>this.registerFood(currentNrClickedOn,currentMonthClickedOn, wholeDaySubstring)} className="registrera" type="submit">Registrera</button>
                  :
                  <p>Du kan inte anmäla dig efter 8:30</p>
                }
            </div>

        </div>)
    }
}

export default Dag
