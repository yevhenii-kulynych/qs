import React from 'react'
import './Pagination.css'


const Pagination = (props) => {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i+=1) {
    pageNumbers.push(i)
  }

  return (
    <nav className="pagination__wrapper">
      <ul className="pagination">
        {
          pageNumbers.map(number => (
            <li key={number} onClick={ () => props.paginate(number) }>
              { number }
            </li>
          ))
        }
      </ul>
    </nav>
  )
}

export default Pagination