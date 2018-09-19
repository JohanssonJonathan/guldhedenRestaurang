import React, { Component } from 'react';


class Search extends Component {

  constructor(){
    super();
    this.state = {
      person: [],
      val: "",
      message: ""
    }
  }

  componentDidUpdate(){
    console.log(this.state.person)
  }



  handleChange(e){


        this.setState({val: e.target.value});

  }


  getKey(e,click){

      if(e.key === "Enter" || click === "Click"){
        console.log(click)

        let name = this.state.val.toUpperCase();
        fetch("/api/jonte?name="+ name).then(res=> res.json()).then(user => {

          console.log(user[0].name)
          this.setState({person:user, boolFetch:true, message:""})

        }
      ).catch(err => {
        console.log("hej")
        this.setState({
          message: "We could not find that person"
        })

      })


      }
  }






  render(){

    return (

      <React.Fragment>

        <div className="searchUser">
          <input type="text" value={this.state.val} onChange={e=> this.handleChange(e)} onKeyPress={e=> this.getKey(e)}/>
          <button onClick={e=> this.getKey(e,"Click")}>Search</button>
        </div>



        <h3>{this.state.message}</h3>
        <ul>

          {this.state.person.map(each=>{
            <li>{each}</li>
          })}

        </ul>
      </React.Fragment>
    )
  }


}

export default Search
