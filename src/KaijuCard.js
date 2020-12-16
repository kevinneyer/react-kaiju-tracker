// React
import React from 'react'
// Components
import EditKaijuForm from './EditKaijuForm'
import Sighting from './sighting'

class KaijuCard extends React.Component {

  state = {
    edit: false,
    addSighting: false,
    description: '',
    location: ''
  }

  editHandler = () => {
    this.setState({ edit: !this.state.edit })
  }

  sightingHandler = () => {
    this.setState({ addSighting: !this.state.addSighting })
  }

  addSightingHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:4000/sightings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        kaijuId: this.props.kaiju.id,
        location: this.state.location,
        description: this.state.description
      })
    })
    .then(res => res.json())
    .then(sighting => this.props.addSighting(sighting))
    this.setState({
      addSighting: false,
      description: '',
      location: ''
    })
  }

  sightingFormHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  // How can we show the edit form conditionally?
  render() {

    const { id, name, power, image} = this.props.kaiju
    
    return (
      <div className='kaiju-card'>

        <h2 className='kaiju-card-name'>{name}</h2>
        <h3 className='kaiju-card-power'>Power: {power}</h3>

        <img className='kaiju-card-image' src={image} alt={name} />

        {this.props.sightings.map( sighting => {
          if(sighting.kaijuId === id){
            return <Sighting sighting={sighting} />
          }
        })
        }
    
        {/* What should this edit button do? */}
        { this.state.edit? <button className='kaiju-card-edit-button' onClick={this.editHandler}>Hide Form</button> : <button className='kaiju-card-edit-button' onClick={this.editHandler} >Edit</button> }
        { this.state.edit ? <EditKaijuForm kaiju={this.props.kaiju} editKaiju={this.props.editKaiju} deleteKaiju={this.props.deleteKaiju} editHandler={this.editHandler} /> : null }
        { this.state.addSighting ? <button onClick={this.sightingHandler}>Hide Form</button> : <button onClick={this.sightingHandler}>Add a Sighting for {name}</button> }
        { this.state.addSighting ? 
          <form onSubmit={this.addSightingHandler}>
            <input onChange={this.sightingFormHandler} type='text' name='location' value={this.state.location} placeholder='Add Location...'></input>
            <br />
            <textarea onChange={this.sightingFormHandler}type='text' name='description' value={this.state.description} placeholder='Add Description...'></textarea>
            <br />
            <input type="submit" value="Add Sighting" />
          </form>
        : 
        null
        }
      </div>
    )
  }
}

export default KaijuCard
