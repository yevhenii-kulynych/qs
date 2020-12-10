import React, { useState, useEffect } from 'react'
import './Button.css'


const Button = props => {

    const [disable, setDisable] = useState(false);

    useEffect(() => {

      setDisable(props.isDisabled)
    },[disable])

    switch (props.name) {
      case 'Edit':
        return <button className="btn edit" onClick={ props.handler }>{ props.name }</button>
      case 'Delete':
        return <button className="btn delete" onClick={ props.handler }>{ props.name }</button>
      case 'Add to cart':
        if (!props.isDisabled) {
          return <button className="btn add" onClick={ props.handler }>{ props.name }</button>
        }else {
          return <button className="btn disable" disabled={true}>{ props.name }</button>
        }
      case 'Create':
        return <button className="btn create">{ props.name }</button>
      default:
        return <button className="btn" onClick={ props.handler }>{ props.name }</button>
    }

}


export default Button;