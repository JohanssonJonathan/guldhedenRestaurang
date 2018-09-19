// import React, { Component } from 'react';
//
// class TheForm extends Component{
//
//
//   constructor(){
//     super();
//     this.state = {
//       val:""
//     }
//   }
//
//   handleSubmit(e, self){
//     e.preventDefault()
//     fetch('/getinfo', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name: self.state.val,
//             skills: 'yourOtherValue',
//           })
//         })
//   }
//
//   handleChange(event, self){
//
//        self.setState({
//         val : event.target.value
//       })
//   }
//
//   render(){
//
//     return (
//
//       <form method="POST" >
//         <label htmlFor="name">Who is it?</label>
//         <input type="text" name="name" value={this.state.val} onChange={e=> this.handleChange(e,this)}/>
//         <input type="button" value="submit" onClick={e => this.handleSubmit(e,this)}/>
//       </form>
//
//     )
//   }
// }
//
//
// export default TheForm
