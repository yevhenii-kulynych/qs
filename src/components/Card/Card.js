import React, { useState, useEffect } from 'react'
import Button from "../Button/Button"
import { Link } from "react-router-dom"
import './Card.css'


const Card = (props) => {

    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
      if (props.inCart) {
        setQuantity(props.value)
      }

    }, [quantity])

    return (
        <div className="item">
            <div>
                <h2>{ props.title }</h2>
                <p>{ props.price }</p>
                <p>{ props.description }</p>
                {
                  props.inCart
                    ?
                    <div className="qauntity_wrapper">
                      <button>-</button>
                      <p>{ quantity }</p>
                      <button>+</button>
                    </div>
                    :
                    <div></div>
                }
            </div>
          {
            !props.inCart

              ?
              <div className="btns-wrapper">
                <Link to="/edit">
                  <Button  name={ 'Edit' }/>
                </Link>
                <Button  name={ 'Delete' }/>
                <Button  name={ 'Add to cart' }/>
              </div>
              :
              <div className="btns-wrapper">
                <Button  name={ 'Delete' }/>
              </div>
          }
        </div>
    )
}

export default Card;