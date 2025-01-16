import React, { useState } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

function UpdateData() {
  const location = useLocation();
  const navigate = useNavigate();

  const { id, image, title, price, description } = location.state;

  const [Updateimages, setImage] = useState(image);
  const [UpdateTitle, setTitle] = useState(title);
  const [UpdatePrice, SetPrice] = useState(price);
  const [UpdateDescription, SetDescription] = useState(description);

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .patch(`http://localhost:3000/products/${id}`, {
        image: Updateimages,
        title: UpdateTitle,
        price: UpdatePrice,
        description: UpdateDescription,
      })
      .then(() => {
        alert('Product successfully updated!');
        navigate('/Products');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div className="form-container">
        <h1 style={{ textAlign: 'center', paddingTop: '10px', paddingBottom: '10px' }}>Update Data</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Image URL"
            value={Updateimages}
            onChange={(e) => setImage(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid black',
              outline: 'none',
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Title"
            value={UpdateTitle}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid black',
              outline: 'none',
            }}
          />
          <br />
          <input
            type="text"
            placeholder="Price"
            value={UpdatePrice}
            onChange={(e) => SetPrice(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid black',
              outline: 'none',
            }}
          />
          <br />
          <textarea
            placeholder="Description"
            value={UpdateDescription}
            onChange={(e) => SetDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid black',
              outline: 'none',
            }}
          />
          <br />
          <button
            type="submit"
            style={{ padding: '8px 20px', marginLeft: '38%', cursor: 'pointer' }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateData;
