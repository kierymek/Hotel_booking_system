import React, {useContext, useEffect} from 'react';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';
import { useHistory } from "react-router-dom";

const CitiesList = (props) => {
    const {cities, setCities} = useContext(HotelsContext);
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelFinder.get("/cities");
                setCities(response.data.data.cities);
            } catch (err) {}
        }
        
        fetchData();
    }, [])

    const  handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.delete(`/cities/${id}`);
            setCities(cities.filter(city => {
                return city.id_miasta !== id;
            }));
        } catch (err) {
            console.log(err);
            if (err.response.data !== undefined) {
                alert(err.response.data.data.err);
            }
        }
    }




    return (
        <div className="list-group">
            <table className="table table-light table-striped">
                <thead>
                    <tr className="bg-info">
                        <th scope="col">Miasto</th>
                        <th scope="col">Kraj</th>
                        <th scope="col">Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {cities && cities.map((city) => {
                        return (
                            <tr  key={city.id_miasta}>
                            <td>{city.nazwa}</td>
                            <td>{city.nazwa_kraju}</td>
                            <td>
                                <button onClick={(e) => handleDelete(e, city.id_miasta)} className="btn btn-danger">Usuń</button>
                            </td>
                  
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default CitiesList
