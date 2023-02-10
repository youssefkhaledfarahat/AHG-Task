import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
const jwt = require("jsonwebtoken");

function EditEmployee() {

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

    const empId = useParams().id;

    const fetchEmployeeDetails = async () => {
        const res = await axios.get(`http://localhost:5000/EMS/employeeinfo/${empId}`).catch((err) => console.log(err));
        const data = await res.data;
        return data;
    }

    useEffect(() => {
        fetchEmployeeDetails().then((data) => {
            let { firstName, lastName, address, title, department } = data.employeeDetails;
            setEmployeeData({ firstName, lastName, address, title, department });
        });
    }, []);

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
    const putRequest = async () => {
        const token = localStorage.getItem('token');
        const decoded = jwt.decode(token);
        const { isAdmin } = decoded;
        if (isAdmin) {
            await axios.put(`http://localhost:5000/EMS/updateemployee/${empId}`, employeeData);
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

    const clearEmployeeErr = () => {
        setEmployeeErr({
            firstNameErr: '',
            lastNameErr: '',
            addressErr: '',
            titleErr: '',
            departmentErr: ''
        });
    }

    const UpdateEmployeeData = () => {
        if (!firstName) {
            firstNameErr = 'First Name Required'
        } else {
            firstNameErr = ''
        }

        if (!lastName) {
            lastNameErr = 'Last Name Required'
        } else {
            lastNameErr = ''
        }

        if (!address) {
            addressErr = 'Address Required'
        } else {
            addressErr = ''
        }

        if (!title) {
            titleErr = 'Title Required'
        } else {
            titleErr = ''
        }

        if (!department) {
            departmentErr = 'Address Required'
        } else {
            departmentErr = ''
        }

        if (firstNameErr || lastNameErr || addressErr || titleErr || departmentErr) {
            setEmployeeErr({ firstNameErr, lastNameErr, addressErr, titleErr, departmentErr });
            return;
        }
        clearEmployeeData();
        clearEmployeeErr();
        putRequest().then(() => history('/viewemployee')).catch((err) => console.log(err));

    }

    return (
        <>
            <div className='row justify-content-center mt-5'>
                <div className="col-md-4 col-10 form-bar text-center">
                    <h1>Edit Employee</h1>
                </div>
            </div>

            <div className="row justify-content-center mt-4">
                <div className="col-md-4 col-10 text-center form-bar">
                    <div className="form-addEmployee">
                        <div className="my-3">
                            <input type="text"
                                className='form-control text-center'
                                placeholder='Enter First Name'
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
                                placeholder='Enter Last Name'
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
                                placeholder='Enter Address'
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
                                placeholder='Enter Title'
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
                                placeholder='Enter Department'
                                name='department'
                                value={department}
                                onChange={(e) => handleInput(e)}
                            />
                            <p className='my-2 text-danger'>
                                {departmentErr}
                            </p>
                        </div>

                        <div className='mt-5 text-center'>
                            <Link className='btn btn-danger' to='/viewemployee'>Cancel</Link>
                            <button className='btn btn-warning mx-4' onClick={clearEmployeeData}>Clear</button>
                            <Link className='btn btn-primary' onClick={UpdateEmployeeData}>Update</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditEmployee