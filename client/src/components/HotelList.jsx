import React, {useContext, useEffect} from 'react';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';
import { useHistory } from "react-router-dom";
import StarRating from './StarRating';


const HotelList = (props) => {
    const {hotels, setHotels} = useContext(HotelsContext);
    let history = useHistory();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelFinder.get("/");
                setHotels(response.data.data.hotels);
            } catch (err) {}
        }
        
        fetchData();
    }, [])

    const  handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.delete(`/${id}`);
            setHotels(hotels.filter(hotel => {
                return hotel.id_hotelu !== id;
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const  handleUpdate = (e, id) => {
        e.stopPropagation();
        history.push(`/hotels/${id}/update`);
    };

    const handleHotelSelect = (id) => {
        history.push(`/hotels/${id}`);
    }

    const renderRating = (hotel) => {
        if (!hotel.count) {
            return <span className="text-warning">0 opinii</span>
        }
        return (
            <>
                <StarRating rating={hotel.srednia_ocena}/>
                <span className="text-warning ml-1">({hotel.count})</span>
            </>
        )
    }

    return (
        <div className="list-group">
            <h2>Aby poznać szczegóły kliknij na wybrany hotel</h2>
            <table className="table table-light table-striped table-hover">
                <thead>
                    <tr className="bg-info">
                        <th scope="col">Hotel</th>
                        <th scope="col">Miasto</th>
                        <th scope="col">Zakres cenowy</th>
                        <th scope="col">Ocena</th>
                        <th scope="col">Edytuj</th>
                        <th scope="col">Usuń</th>
                    </tr>
                </thead>
                <tbody>
                    {hotels && hotels.map((hotel) => {
                        return (
                            <tr onClick={() => handleHotelSelect(hotel.id_hotelu)} key={hotel.id_hotelu}>
                            <td>{hotel.nazwa}</td>
                            <td>{hotel.nazwa_miasta}</td>
                            <td>{"$".repeat(hotel.cena)}</td>
                            <td>{renderRating(hotel)}</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e, hotel.id_hotelu)} className="btn btn-warning">Edycja</button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, hotel.id_hotelu)} className="btn btn-danger">Usuń</button>
                            </td>
                  
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default HotelList
