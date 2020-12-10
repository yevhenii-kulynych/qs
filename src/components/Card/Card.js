import React from 'react'
import './Card.css'


const Card = (props) => {

    return (
        <div className="item">
            <div>
                <h2>{ props.title }</h2>
                <p>{ props.price }</p>
                <p>{ props.description }</p>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Card;