import React from 'react'

class EditKaijuForm extends React.Component {

  state = {
    name: this.props.kaiju.name,
    power: this.props.kaiju.power,
    image: this.props.kaiju.image
  }

  editHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  submitEdit = (e) => {
    e.preventDefault()
    let { name, power, image } = this.state
    fetch(`http://localhost:4000/kaijus/${this.props.kaiju.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepts': 'application/json'
      },
      body: JSON.stringify({
        name,
        power,
        image
       })
    })
    .then(res => res.json())
    .then(data => this.props.editKaiju(data))
  }

  render() {

    const { name, power, image } = this.state

    return (
      <>
        <form onSubmit={this.submitEdit}className='kaiju-card-edit-form'>

          <label>Name: </label>
          <input onChange={this.editHandler} name='name' type='text' value={name} />
          <br/>

          <label>Power: </label>
          <input onChange={this.editHandler} name='power' type='text' value={power} />
          <br/>

          <label>Image URL: </label>
          <input onChange={this.editHandler} name='image' type='text' value={image} />
          <br/>

          <input type="submit" value="Save Changes" />

        </form>
        <button onClick={() => this.props.deleteKaiju(this.props.kaiju.id)}>Delete</button>
      </>
    )
  }
}

export default EditKaijuForm
