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
    create: false
  }

  componentDidMount(){
    requests.fetchKaijus()
    .then(kaijus => 
      this.setState({ kaijus }))
  }

  createHandler = () => {
    this.setState({ create: !this.state.create})
  }

  addKaijuHandler = (kaiju) => {
    this.setState({
      kaijus: [...this.state.kaijus, kaiju]
    })
  }

  render() {
    return (
      <>
        {this.state.create ? <button onClick={this.createHandler}>Hide Form</button> : <button onClick={this.createHandler}>Create a Kaiju</button> }
        {this.state.create? <CreateKaijuForm addKaijuHandler={this.addKaijuHandler}/> : null }

        <div id='kaiju-container'>

          {/* Kaiju cards should go in here! */}
         {this.state.kaijus.map((kaiju, key) => <KaijuCard key={key} kaiju={kaiju} /> )}

        </div>


        {/* Just pass kaijus to TickerContainer and it'll create a news ticker at the bottom */}
        <TickerContainer kaijus={this.state.kaijus} />
        {/* You won't have to modify TickerContainer but it's a fun preview for some other react features */}

      </>
    )

  }
}

export default KaijuContainer
