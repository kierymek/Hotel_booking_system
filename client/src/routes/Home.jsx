import React from 'react'
import AddCity from '../components/AddCity'
import AddCountry from '../components/AddCountry'
import AddHotel from '../components/AddHotel'
import CitiesList from '../components/CitiesList'
import CountriesList from '../components/CountryList'
import Header from '../components/Header'
import HotelList from '../components/HotelList'

const Home = () => {
    return (
        <div>
            <Header/>
            <AddCountry/>
            <CountriesList/>
            <AddCity/>
            <CitiesList/>
            <AddHotel/>
            <HotelList/>
        </div>
    )
}

export default Home
