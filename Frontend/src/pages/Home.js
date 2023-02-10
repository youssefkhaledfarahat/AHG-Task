import React from 'react'

function Home() {
  const token = localStorage.getItem('token');

  return (
    
    // <div className='home-container'>
    //   <h4>Welcome to Employee Management System</h4>
    // </div>
    <div className="row justify-content-center">
      <div className="text-center col-md-12 col-10 home-container">
        <p>I'm not playing Hogwarts Legacy because of this</p>
        {console.log(token)}

      </div>
    </div>
    
  )
}

export default Home
