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

    const {name, power, image} = this.props.kaiju

    return (
      <div className='kaiju-card'>

        <h2 className='kaiju-card-name'>{name}</h2>
        <h3 className='kaiju-card-power'>Power: {power}</h3>

        <img className='kaiju-card-image' src={image} alt={name} />

        {/* What should this edit button do? */}
        <button className='kaiju-card-edit-button' onClick={this.editHandler} >Edit</button>
        { this.state.edit ? <EditKaijuForm /> : null }
      </div>
    )
  }
}

export default KaijuCard
