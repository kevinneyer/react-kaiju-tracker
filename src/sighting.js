import React from 'react'

const Sighting = (props) => {
    return(
        <div>
            <p>{props.sighting.location}: {props.sighting.description}</p>
        </div>
    )
}

export default Sighting 