import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

function Employee() {

  const [data, setData] = useState([]);

  const empId = useParams().id;

  const getEmployeeInfo = async () => {
    const res = await axios.get(`http://localhost:5000/EMS/employeeinfo/${empId}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    getEmployeeInfo().then((data) => setData(data.employeeDetails));
  }, []);

  let { firstName, lastName, address, title, department } = data;

  return (
    <>
      <div className="row justify-content-center mt-5 mb-3">
        <div className="col-md-4 text-center col-10 emp-head">
          <h1>Employee Details</h1>
        </div>
      </div>

      <div className="row justify-content-end">
        <div className="col-md-6 text-center col-6">
          <Link className='btn btn-danger' to={'/addemployee'}>Add Employee</Link>
          <Link className='btn btn-warning mx-3' to={'/viewemployee'}>View Employee</Link>
          <Link className='btn btn-success' to={'/searchemployee'}>Search Employee</Link>
        </div>
      </div>

      <div className="row justify-content-center mt-4 mb-3">
        <div className="col-md-6 col-10">
          <div className='emp-data'>
            <hr />
            <div>
              <span className='emp-title'>First Name: </span>
              <span>{firstName}</span>
            </div>

            <hr />
            <div>
              <span className='emp-title'>Last Name: </span>
              <span>{lastName}</span>
            </div>

            <hr />
            <div>
              <span className='emp-title'>Address: </span>
              <span>{address}</span>
            </div>

            <hr />
            <div>
              <span className='emp-title'>Title: </span>
              <span>{title}</span>
            </div>

            <hr />
            <div>
              <span className='emp-title'>Department: </span>
              <span>{department}</span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </>
  )
}

export default Employee