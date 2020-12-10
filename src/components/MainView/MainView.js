import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Card from './../Card/Card'
import Button from "../Button/Button"
import { useHttp } from '../../hoocks/useHttp'
import './MainView.css'


const MainView = () => {

    const [items, setItems] = useState([])

    const { request } = useHttp()

    useEffect(() => {

        const fetchData = async () => {

            try {
              const data = await request('/products')
             // const data = await request('/products?_page=1&_limit=10')
             setItems(data)
            } catch (error) {
                
            }
         }
         fetchData()
    }, [request])

    return (
      <>
        <div className="nav__filter">
          <input type="text"/>
          <Link to="/create">
            <Button name={ 'Create' }/>
          </Link>
        </div>
        <div className="products">
            {
                items.map((el, index) => {

                  return <Card
                    id={el.id}
                    item={ el }
                    key={ index }
                    title={ el.title }
                    price={ el.price }
                    description={ el.description }
                    inCart={ false }
                    isDisabled={ el.inCart }
                    setItems={ setItems }
                  />
                })
            }
        </div>
      </>
    )
}

export default MainView;