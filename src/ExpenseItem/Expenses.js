import React, { useState } from 'react';
import './Expenses.css';


const Expenses = () => {
    const [ID,setID]=useState('')
    const [price,setPrice]=useState()
    const [name,setName]=useState('')
    const [Items,setItems]=useState([])
    const [totalPrice,setTotalPrice]=useState(0)

    const IDHandler=(event)=>{
        event.preventDefault();
        setID(event.target.value)
    }
    const priceHandler=(event)=>{
        event.preventDefault();
        setPrice(event.target.value)
    }
    const nameHandler=(event)=>{
        event.preventDefault();
        setName(event.target.value)
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const newItem={'ID':ID,'price':price,'name':name}
        setTotalPrice(totalPrice + parseInt(price))
        localStorage.setItem('Items', JSON.stringify(newItem));
        
        setItems([...Items,newItem])
        setID('')
        setName('')
        setPrice('')
    };

    // useEffect(() => {
    //   const storedData = localStorage.getItem('Items');
    //   if (storedData) {
    //     setItems(JSON.parse(storedData));
    //   }
    // }, []);
  
  
   
    const DeleteItem=(ID,price)=>{
        setTotalPrice(totalPrice-parseInt(price))
        const updatedItems=Items.filter((Item)=>Item.ID !== ID)
        //console.log(updatedItems)
        setItems(updatedItems)
    } 
    

    

  return (
    <>
       <form className="form" onSubmit={handleSubmit}>
      <h2>ADD PRODUCT</h2>
      <div className="form-group">
        <label>Product ID:</label>
        <input type="number" id="productID" name="ID" value={ID} onChange={IDHandler} required />
      </div>
      <div className="form-group">
        <label>Selling Price :</label>
        <input type="number" id="price" name="price" value={price} onChange={priceHandler} required />
      </div>
      <div className="form-group">
        <label>Product Name:</label>
        <input id="name" name="name" value={name} onChange={nameHandler} required />
      </div>
      <button type="submit">Add Product</button>
    </form> 

    <ul className='ItemsList'>
       {
        Items.map((Item)=>(
            <>
               <li key={ID}>{Item.price}-{Item.name}
               <button onClick={()=>DeleteItem(Item.ID,Item.price)}>Delete</button></li>
            </>
        ))
       }
       
    </ul>   
    <div className='total'>
      Total Amount  : {totalPrice}
    </div>
    </>
  );
};

export default Expenses;
