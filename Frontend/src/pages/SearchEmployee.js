import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { Link } from 'react-router-dom';

function SearchEmployee() {

  let [data, setData] = useState([]);
  let [searchValue, setSearchValue] = useState('');

  const getAllEmployeesData = async () => {
    const res = await axios.get('http://localhost:5000/EMS/employees').catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getAllEmployeesData().then(data => setData(data.employees))
  }, []);

  return (
    <>
      <div className="row justify-content-center mt-5 mb-4">
        <div className="col-md-4 col-10 text-center search-bar">
          <input type="text"
            className='form-control text-center'
            placeholder='Enter Employee Name'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className="row justify-content-center mt-5 mb-2">
        <div className="col-md-4 col-10 text-center search-heading">
          <h1>Employee Details</h1>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-md-4 col-12 text-center button-group">
          <Link className='btn btn-success mx-3' to='/addemployee'>Add Employee</Link>
          <Link className='btn btn-warning' to='/viewemployee'>View Employee</Link>
        </div>
      </div>

      <div className="row justify-content-center my-5">
        <div className="col-md-10 col-10 text-center">
          <div className='table-responsive'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Title</th>
                  <th scope="col">Department</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.filter((emp) => {
                    if (!searchValue) {
                      return emp;
                    } else if (emp.firstName.toLowerCase().includes(searchValue.toLowerCase())) {
                      return emp;
                    }
                  }).map((emp, i) => {
                    return <tr key={i}>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.address}</td>
                      <td>{emp.title}</td>
                      <td>{emp.department}</td>
                    </tr>
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchEmployee
