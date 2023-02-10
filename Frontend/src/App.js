import React from 'react'
import { Navigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddEmployee from './pages/AddEmployee'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import ViewEmployee from './pages/ViewEmployee'
import Employee from './pages/Employee'
import SearchEmployee from './pages/SearchEmployee'
import EditEmployee from './pages/EditEmployee'
import PageNotFound from './pages/PageDoesntExist'
import Login from "./Login";
import Register from "./Register";
import SearchDepartment from './pages/SearchDepartment'
import UploadCSV from './pages/UploadCSV'

const App = () => {
  const user = localStorage.getItem("token");

  return (
    <div>
      <Router>
        <Routes>


          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
        <Navbar />
        <Routes>
          <Route path='/Home' element={<Home />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/viewemployee' element={<ViewEmployee />} />
          <Route path='/employee/:id' element={<Employee />} />
          <Route path='/searchemployee' element={<SearchEmployee />} />
          <Route path='/searchdepartment' element={<SearchDepartment />} />
          <Route path='/editemployee/:id' element={<EditEmployee />} />
          <Route path='/uploadcsv' element={<UploadCSV />}/>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App