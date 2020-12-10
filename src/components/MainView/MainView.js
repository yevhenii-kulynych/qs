import React, { useState, useEffect } from 'react'
import Card from './../Card/Card'
import { useHttp } from './../../hoocks/useHttp'
import './MainView.css'


const MainView = () => {

    const [items, setItems] = useState([])

    const { request } = useHttp()



    useEffect(() => {

        const fetchData = async () => {

            try {
             const data = await request('/products')
             
             setItems(data)
            } catch (error) {
                
            }
         }
         fetchData()
    }, [request])

    console.log(items);

    return (
        <div className="products">
            {
                items.map((el, index) => {
                    return <Card key={index} title={el.title} price={el.price} description={el.description}/>
                })
            }
        </div>
    )
}

export default MainView;