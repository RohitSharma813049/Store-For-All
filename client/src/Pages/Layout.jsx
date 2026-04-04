import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/UI/Home/Navbar'
import MobileBottomNav from '../Components/UI/Home/MobileBottomNav'


function Layout() {
  return (
<>
<header className=' container mx-auto sticky top-0 z-50 bg-bgGradientLight'>
  <Navbar/>
</header>
<main className=' container mx-auto'>
  <Outlet/>
</main>
<footer className=' bottom-0 absolute md:hidden w-full h-auto'>
<MobileBottomNav/>
</footer>
</>
  )
}

export default Layout