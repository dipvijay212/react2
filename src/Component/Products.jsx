import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';
import { Link } from 'react-router';

function Productss() {
  let [details, SetDetails] = useState([]);
  console.log(details);

  // fillter logic
  const [fillter, SetFillter] = useState("");
  console.log(fillter);

  // searchbar pending
  const [search, SetSearch] = useState('');
  // console.log(search);

  // Sort logic Panding
  const [Sort, setSort] = useState();
  console.log(Sort);

  // pagination logic
  const [currentPage, SetCurrentPage] = useState(1);
  let page = 5;

 

  
  

function FetchData() {
  const query = search.trim();
  axios
    .get(`http://localhost:3000/products`, {
      params: {
        category: fillter || undefined,
        q: query || undefined,
      },
    })
    .then((res) => {
      let filteredData = res.data.filter((product) => {
        if (query) {
          return product.title.toLowerCase().includes(query.toLowerCase());
        }
        return true;
      });

      if (Sort === "asc") {
        filteredData = filteredData.sort((a, b) => a.price - b.price);
      } else if (Sort === "desc") {
        filteredData = filteredData.sort((a, b) => b.price - a.price);
      }

      console.log("API Response for params:", filteredData);
      SetDetails(filteredData);
    })
    .catch((err) => {
      console.error("API Error:", err);
    });
}
  

  useEffect(() => {
    console.log("Fetching data with search:", search);
    FetchData();
  }, [fillter, search, Sort])
  

  // delete Logic
  function handleDelete(id) {
    axios.delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        alert("Product successfully deleted.")
      }).catch((err) => {
        console.log(err);
      })
  }

  //  pagination logic

  const totalPage = Math.ceil(details.length / page)
  console.log(totalPage)

  const ChangePage = (direction) => {
    SetCurrentPage((prev) => {
      if (direction === "prev") return Math.max(prev - 1, 1)
      if (direction === "next") return Math.min(prev + 1, totalPage)
      return prev;
    })
  }

  const currnet = details.slice((currentPage - 1) * page, currentPage * page);
  console.log(currnet);

  return (
    <div>
      <div className='Container'>
        <h1>Products</h1> 
        {/* fillter dropdown */}
        <div style={{ display: "flex", justifyContent: 'space-between', width: "90%", margin: "auto", marginBottom: '30px' }}>
          <select style={{ width: '200px', padding: '10px', fontSize: '16px', backgroundColor: '#f8f9fa', border: '1px solid #ccc', borderRadius: '4px', color: '#333', }} value={fillter} onChange={(e) => { SetFillter(e.target.value) }}>
            <option value="">Select category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="jewelery">Jewellery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <input type="text" placeholder='Search' value={search} style={{ padding: '10px 20px' }} onChange={(e) => SetSearch(e.target.value) } />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setSort('asc') }}>Price: Low to High</button>
            <button onClick={() => { setSort('desc') }}>Price: High to Low</button>
          </div>
        </div>
        <div className='main-cotainer'>
          {currnet.map((data, index) => {
            return (
              <div className='Main-container-details' key={index}>
                <Link to={`/Descriptionpage/${data.id}`}>
                <div className='image'>
                  <img src={data.image} alt={data.title} />
                </div>
                </Link>
                <div className='title'>
                  <h3>{data.title}</h3>
                </div>
                <div className='category'>
                  <p>{`(${data.category})`}</p>
                </div>
                <div className='Price'>
                  <h3>{`${data.price}$`}</h3>
                </div>
                <div className='descripton'>
                  <p>{data.description}</p>
                </div>
                
                <div className='btn-group'>
                  <button onClick={(el) => { handleDelete(data.id, el) }}>Delete</button>
                  <Link to="/Update" state={{
                    id: data.id,
                    image: data.image,
                    title: data.title,
                    price: data.price,
                    description: data.description
                  }}
                    style={{
                      marginRight: '10px',
                      color: 'black',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '4px',
                    }}>Edit</Link>
                </div>
              </div>
            )
          })}
        </div>
        <div className='pagination-btn'>
          <button onClick={() => { ChangePage("prev") }} disabled={currentPage === 1}>Prew</button>
          <span style={{ paddingRight: "10px" }}>{currentPage}</span>
          <button onClick={() => { ChangePage("next") }} disabled={currentPage === totalPage}>Next</button>

        </div>
      </div>
    </div>
  )
}

export default Productss;