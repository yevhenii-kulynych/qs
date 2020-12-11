import React, { useState } from 'react'
import Button from "../Button/Button"
import { useHistory } from 'react-router-dom'
import { useHttp } from "../../hoocks/useHttp"
import './CreateView.css'


const CreateView = () => {

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const { request } = useHttp()

  const history = useHistory()

  const redirect = () => {
    history.push('/')
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

  const saveData = async () => {
    const temp = {}
    temp.id = Math.floor(Math.random() * 1000000)
    temp.title = title.trim()
    temp.price = parseInt(price)
    temp.description = description.trim()
    temp.inCart = false

    const sendData = await request(`/products`, 'POST', JSON.stringify(temp), {'Content-Type': 'application/json'})
    redirect()
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

  console.log()
    return (
        <div className="create_page">
          <label htmlFor="title">Title</label>
          <input id="title" className="input__title" type="text" onChange={ changeTitleHandler }/>
          <label htmlFor="price">Price</label>
          <input id="price" className="input__price" type="number" onChange={ changePriceHandler }/>
          <label htmlFor="description">Description</label>
          <input id="description" className="input__description" type="text" onChange={ changeDescriptionHandler }/>
          <Button name={ 'Save' } handler={ simpleValidate } />
        </div>
    )
}

export default CreateView;