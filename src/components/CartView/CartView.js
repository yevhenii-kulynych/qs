import React, {useEffect, useState} from 'react'
import { useHttp } from "../../hoocks/useHttp";
import Card from "../Card/Card";
import './CartView.css'


const CartView = () => {

    const [items, setItems] = useState([])

    const { request } = useHttp()

    useEffect(() => {

        const fetchData = async () => {

            try {
                const data = await request('/cart')

                setItems(data)
            } catch (error) {

            }
        }
        fetchData()
    }, [request])


    return (
      <div className="cart-products">
          {
              items.map((el, index) => {

                  return <Card key={index} title={el.title} price={el.price} description={el.description} inCart={ true } value={ el.quantity }/>
              })
          }
      </div>
    )
}

export default CartView;