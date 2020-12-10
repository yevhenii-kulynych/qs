import React, {useEffect, useState} from 'react'
import { useHttp } from "../../hoocks/useHttp";
import Card from "../Card/Card";
import './CartView.css'


const CartView = () => {

    const [items, setItems] = useState([])
    const [total, setTotal] = useState(0)

    const { request } = useHttp()

    const getTotal = () => {

      let sum = 0;
      items.forEach((el) => {

        let result = el.price * el.quantity
        sum += result;
      })
      setTotal(sum)
    }

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

    useEffect(() => {

      getTotal()
    },[total, items])


    return (
      <>
          <div className="cart-products">
              {
                  items.map((el, index) => {

                      return <Card
                        id={el.id}
                        key={index}
                        title={el.title}
                        price={el.price}
                        description={el.description}
                        inCart={true}
                        value={el.quantity}
                        setItems={ setItems }
                        isDisabled={ el.inCart }
                      />
                  })
              }
          </div>
          <div className="total">
              <p>Total: { total } $</p>
          </div>
      </>
    )
}

export default CartView;