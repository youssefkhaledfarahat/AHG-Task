import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const jwt = require("jsonwebtoken");

function AddEmployee() {
    const token = localStorage.getItem('token');
    const decoded = jwt.decode(token);
    const { isAdmin } = decoded;

    const history = useNavigate();
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        title: '',
        department: ''
    });

    const [employeeErr, setEmployeeErr] = useState({
        firstNameErr: '',
        lastNameErr: '',
        addressErr: '',
        titleErr: '',
        departmentErr: ''
    });

    let { firstName, lastName, address, title, department } = employeeData;
    let { firstNameErr, lastNameErr, addressErr, titleErr, departmentErr } = employeeErr;

    const clearEmployeeData = () => {
        setEmployeeData({
            firstName: '',
            lastName: '',
            address: '',
            title: '',
            department: ''
        })
    }

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setEmployeeData({ ...employeeData, [name]: value });
    }

    const postRequest = async () => {
        await axios.post('http://localhost:5000/EMS/addemployee', employeeData);
    }

    const clearEmployeeErr = () => {
        setEmployeeErr({
            firstName: '',
            lastName: '',
            address: '',
            title: '',
            department: ''
        });
    }

    const submitEmployeeData = () => {
        if (!firstName) {
            firstNameErr = 'First Name is required'
        } else {
            firstNameErr = ''
        }

        if (!lastName) {
            lastNameErr = 'Last Name is required'
        } else {
            lastNameErr = ''
        }

        if (!address) {
            addressErr = 'Address is required'
        }
        else {
            addressErr = ''
        }

        if (!title) {
            titleErr = 'Title is required'
        }
        else {
            titleErr = ''
        }

        if (!department) {
            departmentErr = 'Department is required'
        }
        else {
            departmentErr = ''
        }


        if (firstNameErr || lastNameErr || addressErr || titleErr || departmentErr) {
            setEmployeeErr({ firstNameErr, lastNameErr, addressErr, titleErr, departmentErr });
            return;
        }
        clearEmployeeData();
        clearEmployeeErr();
        if (isAdmin) {
            postRequest().then(() => history('/viewemployee')).catch((err) => console.log(err));
        }
        else {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'You Are Not An Admin.',
                showConfirmButton: true
            });
        }
    }

    return (
        <>
            <div className='row justify-content-center mt-5'>
                <div className="col-md-4 col-10 form-bar text-center">
                    <h1>Add Employee</h1>
                </div>
            </div>

            <div className="row justify-content-end">
                <div className="col-md-6 col-12 text-center button-group">
                    <Link className='btn btn-success mx-3' to='/viewemployee'>View Employee</Link>
                    <Link className='btn btn-warning' to='/searchemployee'>Search Employee</Link>
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-5 col-10 text-center form-bar">
                    <div className="form-addEmployee">
                        <div className="mb-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {firstNameErr}
                            </p>
                        </div>

                        <div className="my-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {lastNameErr}
                            </p>
                        </div>

                        <div className="my-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter Employee Address'
                                name='address'
                                value={address}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {addressErr}
                            </p>
                        </div>

                        <div className="my-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter Employee Title'
                                name='title'
                                value={title}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {titleErr}
                            </p>
                        </div>

                        <div className="my-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter Employee Department'
                                name='department'
                                value={department}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {departmentErr}
                            </p>
                        </div>

                        <div className='mt-5 text-center'>
                            <Link className='btn btn-danger' to='/Home'>Cancel</Link>
                            <button className='btn btn-warning mx-4' onClick={clearEmployeeData}>Clear</button>
                            <Link className='btn btn-primary' onClick={submitEmployeeData}>Submit</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddEmployee