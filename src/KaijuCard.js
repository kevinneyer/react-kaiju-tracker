// React
import React from 'react'
// Components
import EditKaijuForm from './EditKaijuForm'

class KaijuCard extends React.Component {

  state = {
    edit: false
  }

  editHandler = () => {
    this.setState({ edit: !this.state.edit })
  }
  // How can we show the edit form conditionally?
  render() {

    const { id, name, power, image} = this.props.kaiju

    return (
      <div className='kaiju-card'>

        <h2 className='kaiju-card-name'>{name}</h2>
        <h3 className='kaiju-card-power'>Power: {power}</h3>

        <img className='kaiju-card-image' src={image} alt={name} />

        {/* What should this edit button do? */}
        { this.state.edit? <button className='kaiju-card-edit-button' onClick={this.editHandler}>Hide Form</button> : <button className='kaiju-card-edit-button' onClick={this.editHandler} >Edit</button> }
        { this.state.edit ? <EditKaijuForm kaiju={this.props.kaiju} editKaiju={this.props.editKaiju} deleteKaiju={this.props.deleteKaiju} editHandler={this.editHandler} /> : null }
      </div>
    )
  }
}

export default KaijuCard
