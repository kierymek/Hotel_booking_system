import React, {useState, createContext} from "react";

export const HotelsContext = createContext();

export const HotelsContextProvider = props => {
    const [hotels, setHotels] = useState([]);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [cities, setCities] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedReservations, setSelectedReservations] = useState([]);

    const addCountries = (country) => {
        setCountries([...countries, country]);
    }

    const addCities = (city) => {
        setCities([...cities, city]);
    }

    const addHotels = (hotel) => {
        setHotels([...hotels, hotel]);
    }
    
    return (
        <HotelsContext.Provider value={{hotels, setHotels, addHotels, selectedHotel, setSelectedHotel, cities, setCities, addCities, countries, setCountries, addCountries, selectedOption, setSelectedOption, selectedClient, setSelectedClient, selectedReservations, setSelectedReservations}}>
            {props.children}
        </HotelsContext.Provider>
    )
}