//React
import React from 'react'
// Components
import KaijuCard from './KaijuCard'
import CreateKaijuForm from './CreateKaijuForm'
import TickerContainer from './TickerContainer'
//Fetch Requests
import * as requests from './requests'
// Read the README for how to fetch

class KaijuContainer extends React.Component {

  state = {
    kaijus: [],
    create: false,
    sightings: []
  }

  componentDidMount(){
    requests.fetchKaijus()
    .then(kaijus => 
    this.setState({ kaijus }))
    requests.fetchSightings()
    .then(sightings => this.setState({ sightings }))
  }

  createHandler = () => {
    this.setState({ create: !this.state.create})
  }

  addKaijuHandler = (kaiju) => {
    this.setState({
      kaijus: [...this.state.kaijus, kaiju]
    })
  }

  editKaiju = (data) => {
    let newKaijus = this.state.kaijus.map( kaiju => {
      if(kaiju.id === data.id){
       return {...kaiju, name: data.name, power: data.power, image: data.image}
      } 
      return kaiju
     })
     this.setState({ kaijus: newKaijus })
  }

  deleteKaiju = (id) => {
    fetch(`http://localhost:4000/kaijus/${id}`, {
      method:'DELETE',
      headers: {
        'Content-Type': 'applicaton/json'
      }
    })
    .then(() => {
      let newState = [...this.state.kaijus]
      newState = newState.filter(kaij => kaij.id !== id)
      this.setState({
        kaijus: newState
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <>
        {this.state.create ? <button onClick={this.createHandler}>Hide Form</button> : <button onClick={this.createHandler}>Create a Kaiju</button> }
        {this.state.create? <CreateKaijuForm addKaijuHandler={this.addKaijuHandler}/> : null }

        <div id='kaiju-container'>

          {/* Kaiju cards should go in here! */}
         {this.state.kaijus.map((kaiju, key) => <KaijuCard key={key} kaiju={kaiju} editKaiju={this.editKaiju} deleteKaiju={this.deleteKaiju} /> )}

        </div>


        {/* Just pass kaijus to TickerContainer and it'll create a news ticker at the bottom */}
        <TickerContainer kaijus={this.state.kaijus} />
        {/* You won't have to modify TickerContainer but it's a fun preview for some other react features */}

      </>
    )

  }
}

export default KaijuContainer
