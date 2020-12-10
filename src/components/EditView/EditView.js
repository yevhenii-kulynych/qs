import React, { useState, useEffect, useRef } from 'react'
import { useHttp } from "../../hoocks/useHttp"
import Button from "../Button/Button"
import './EditView.css'


const EditView = props => {

  const [item, setItem] = useState([])
  const [id, setId] = useState([])
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const { request } = useHttp()

  const inputTitle = useRef(null)
  const inputPrice = useRef(null)
  const inputDescription = useRef(null)

  const getID = () => {

    const id = JSON.parse(localStorage.getItem('id')) || null
    return id
  }

  const getData = async () => {

    const data = await request(`/products/${id}`)
    // setTitle(data.title)
    // setPrice(data.price)
    // setDescription(data.description)
    return data
  }

  const changeTitleHandler = event => {
    setTitle(event.target.value)
  }

  const changePriceHandler = event => {
    setPrice(event.target.value)
  }

  const changeDescriptionHandler = event => {
    setDescription(event.target.value)
  }

  useEffect(() => {

    setId(getID)
    setItem(getData)
    inputTitle.current.value = item.title
    inputPrice.current.value = item.price
    inputDescription.current.value = item.description
    console.log('render')
  }, [])


  const saveData = async () => {
    const temp = {}
    temp.id = id
    temp.title = title.trim()
    temp.price = parseInt(price)
    temp.description = description.trim()

    //const sendData = await request(`/products/${props.id}`, 'PATCH', JSON.stringify(temp), {'Content-Type': 'application/json'})

  }

  const simpleValidate = () => {

    if (title.length < 3) {

      alert('Title is too short. Min length is 3 symbols')
    } else if (isNaN(parseInt(price))) {

      alert('Price is`t valid')
    } else if (description.length < 10) {

      alert('Description is too short. Min length is 10 symbols')
    } else {
      saveData()
      console.log('GOOD')
    }
  }

  return (
    <div className="create_page">
      <label htmlFor="title">Title</label>
      <input id="title" className="input__title" type="text" ref={ inputTitle } onChange={ changeTitleHandler }/>
      <label htmlFor="price">Price</label>
      <input id="price" className="input__price" type="number" ref={ inputPrice } onChange={ changePriceHandler }/>
      <label htmlFor="description">Description</label>
      <input id="description" className="input__description" type="text" ref={ inputDescription } onChange={ changeDescriptionHandler }/>
      <Button name={ 'Save' } handler={ simpleValidate }/>
    </div>
  )
}

export default EditView;