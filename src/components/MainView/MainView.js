import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import Card from './../Card/Card'
import Button from "../Button/Button"
import Pagination from "../Pagination/Pagination";
import { useHttp } from '../../hoocks/useHttp'
import './MainView.css'



const MainView = () => {

    const [items, setItems] = useState([])
    const [filtered, setFiltered] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(10)
    const inputFilter = useRef(null)
    const { request } = useHttp()

    const handleFilter = event => {

      let reg = new RegExp(event.target.value, 'i')

      setIsLoading(true)
      const filteredItems = currentPosts.filter((a) => {

        if (a.title.match(reg)) return true
      })

      setFiltered(filteredItems)

      if (!event.target.value) {
        setIsLoading(false)
      }

    }

    useEffect(() => {

        const fetchData = async () => {

            try {

              const data = await request('/products')
              setItems(data)
            } catch (error) {
                
            }
         }
         fetchData()
      return () => {
          setFiltered([])
      }
    }, [request])

    const indexOfLastPost = currentPage * postPerPage
    const indexOfFirstPost = indexOfLastPost - postPerPage
    const currentPosts = items.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = number => setCurrentPage(number)

    return (
      <>
        <div className="nav__filter">
          <input type="text" ref={ inputFilter } onChange={ handleFilter }/>
          <Link to="/create">
            <Button name={ 'Create' }/>
          </Link>
        </div>
        { !isLoading
        ?
          <>
            <div className="products">
              {
                currentPosts.map((el, index) => {

                  return <Card
                    posts={ currentPosts }
                    id={ el.id }
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
            <Pagination postsPerPage={ postPerPage } totalPosts={ items.length } paginate={ paginate }/>
          </>
        :
          <div className="products">
            {
              filtered.map((el, index) => {

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
        }
      </>
    )
}

export default MainView;