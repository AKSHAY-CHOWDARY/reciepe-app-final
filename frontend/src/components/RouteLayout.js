import React from 'react'
import Navigation from './Navigation'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function RouteLayout() {
  return (
    <div>
      <Navigation />
      <div style={{ minHeight: "50vh" }}>
        <div >
          <Outlet />
        </div>
      </div>
        <Footer />

    </div>
  )
}

export default RouteLayout