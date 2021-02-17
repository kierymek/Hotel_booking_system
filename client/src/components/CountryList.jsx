import React, {useContext, useEffect} from 'react';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';
import { useHistory } from "react-router-dom";

const CountriesList = (props) => {
    const {countries, setCountries} = useContext(HotelsContext);
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelFinder.get("/countries");
                setCountries(response.data.data.countries);
            } catch (err) {}
        }
        
        fetchData();
    }, [])

    const  handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.delete(`/countries/${id}`);
            setCountries(countries.filter(country => {
                return country.id_kraju !== id;
            }));
        } catch (err) {
            console.log(err);
            if (err.response != undefined) {
                alert(err.response.data.data.err);
            }
        }
    }




    return (
        <div className="list-group">
            <table className="table table-light table-striped">
                <thead>
                    <tr className="bg-info">
                        <th scope="col">Kraj</th>
                        <th scope="col">Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {countries && countries.map((country) => {
                        return (
                            <tr  key={country.id_kraju}>
                            <td>{country.nazwa}</td>
                            <td>
                                <button onClick={(e) => handleDelete(e, country.id_kraju)} className="btn btn-danger">Usuń</button>
                            </td>
                  
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CountriesList
