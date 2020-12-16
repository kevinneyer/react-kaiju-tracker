import React from 'react'

class CreateKaijuForm extends React.Component {

  state = {
    name: '',
    power: '',
    image: ''
  }

  formHandler = (e) => {
    this.setState({ 
      [e.target.name]: e.target.value
    })
  }

  createHandler = (e) => {
    e.preventDefault()
    const { name, power, image } = this.state
    fetch('http://localhost:4000/kaijus/', {
      method: 'POST',
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
    .then(kaiju=> 
      this.props.addKaijuHandler(kaiju)
    )
    this.setState({     
    name: '',
    power: '',
    image: ''
    })
  }

  render() {
    const { name, power, image } = this.state
    return (
      <form onSubmit={this.createHandler} id='create-kaiju-form'>

        <label>Name: </label>
        <input value={name} onChange={this.formHandler} name='name' type='text' placeholder="add your name here.." />

        <label>Power: </label>
        <input value={power}onChange={this.formHandler} name='power' type='text' placeholder="add your power here..." />

        <label>Image: </label>
        <input value={image} onChange={this.formHandler} name='image' type='text' placeholder="add your image url here..." />

        <br/>

        <input type='submit' value='List Kaiju' />

      </form>
    )
  }
}

export default CreateKaijuForm
