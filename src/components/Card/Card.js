import React, { useState, useEffect } from 'react'
import Button from "../Button/Button"
import { Link } from "react-router-dom"
import { useHttp } from "../../hoocks/useHttp"
import './Card.css'


const Card = (props) => {

    const [quantity, setQuantity] = useState(0)
    const { request } = useHttp()

    const increase = async () => {

      let data = await request(`/cart/${props.id}`, 'PATCH', JSON.stringify({quantity: props.value + 1}), {'Content-Type': 'application/json'})
      let getData = await request(`/cart`)
      props.setItems(getData)
    }

    const decrease = async () => {

      if (quantity > 1) {

        let data = await request(`/cart/${props.id}`, 'PATCH', JSON.stringify({quantity: props.value - 1}), {'Content-Type': 'application/json'})

        let getData = await request(`/cart`)

        props.setItems(getData)

      }
    }

    const remove = async () => {

      const data = await request(`/cart/${props.id}`, 'DELETE')
      const update = await request(`/products/${props.id}`, 'PATCH', JSON.stringify({ inCart: false }), {'Content-Type': 'application/json'})
      const getData = await request(`/cart`)
      props.setItems(getData)
    }

    const add = async () => {

      const data = await request(`/products?id=${props.id}`)
      const temp = {...data[0]};
      temp.quantity = 1
      const update = await request(`/products/${props.id}`, 'PATCH', JSON.stringify({ inCart: true }), {'Content-Type': 'application/json'})
      const sendData = await request(`/cart`, 'POST', JSON.stringify(temp), {'Content-Type': 'application/json'})
      const newData = await request(`/products`)

      props.setItems(newData)
    }

    const removeFromMain = async () => {

      const data = await request(`/products/${props.id}`, 'DELETE')
      const getData = await request(`/products`)
      props.setItems(getData)
    }

    useEffect(() => {

      if (props.inCart) {

        setQuantity(props.value)
      }
    }, [quantity, request, increase, decrease])

    const passID = () => {
      localStorage.setItem('id', JSON.stringify(props.id))
    }

    return (
        <div className="item">
            <div className="item__inner">
                <h2>{ props.title }</h2>
                <p>{ props.price } $</p>
                <p>{ props.description }</p>
                {
                  props.inCart
                    ?
                    <div className="qauntity_wrapper">
                      <button onClick={decrease}>
                        -
                      </button>
                      <p>{ quantity }</p>
                      <button onClick={increase}>
                        +
                      </button>
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
                  <Button handler={ passID } id={ props.id }  name={ 'Edit' }/>
                </Link>
                <Button handler={ removeFromMain }  name={ 'Delete' }/>
                <Button
                  handler={ add }
                  data={ props.id }
                  isDisabled={props.isDisabled}
                  name={ 'Add to cart' }
                />
              </div>
              :
              <div className="btns-wrapper">
                <Button handler={ remove }  name={ 'Delete' }/>
              </div>
          }
        </div>
    )
}

export default Card;