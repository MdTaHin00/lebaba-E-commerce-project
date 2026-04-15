import React from 'react'
import Navbar from '../../components/Navbar'
import Hero from './Hero'
import Categories from './Categories'
import Trend from './Trend'
import TrendProducts from './TrendProducts'
import DealsSection from './DealsSection'
import Features from './Features'
import Blogs from '../blog/Blogs'

function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
      <Trend/>
      <TrendProducts/>
      <DealsSection/>
      <Features/>
      <Blogs/>
    </div>
  )
}

export default Home
