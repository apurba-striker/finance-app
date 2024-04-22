import React, { useState, useEffect } from 'react'
import api from './api'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: '',
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({ 
      ...formData, 
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const response = await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: '',
    });
  };

  return (
    <div>
      <nav className='navbar navbar-dark bg-primary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href="#">
            Finance App
          </a>
        </div>
      </nav>


      <div className='container'>
        <form  onSubmit={handleSubmit}>

          <div className='mb-3 mt-3'>
            <label htmlFor="amount" className="form-label">Amount</label>
            <input type="text" className="form-control" id="amount" name="amount" value={formData.amount} onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="category" className="form-label">Category</label>
            <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor='is_income' className="form-label">
              Income? &nbsp; 
            </label>
            <input type='checkbox' id="is_income" name="is_income" value={formData.is_income} onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="date" className="form-label">Date</label>
            <input type="text" className="form-control" id="date" name="date" value={formData.date} onChange={handleChange} />
          </div>

          <button type='submit' className='btn btn-primary'>
            Submit
          </button>

        </form>
      </div>

    </div>
  )
}

export default App;
