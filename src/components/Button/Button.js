import React from 'react'
import './Button.css'


const Button = props => {

  switch (props.name) {
    case 'Edit':
      return <button className="btn edit">{ props.name }</button>
    case 'Delete':
      return <button className="btn delete">{ props.name }</button>
    case 'Add to cart':
      return <button className="btn add">{ props.name }</button>
    case 'Create':
      return <button className="btn create">{ props.name }</button>
    default:
      return <button className="btn">{ props.name }</button>
  }

}


export default Button;