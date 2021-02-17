import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import HotelFinder from '../apis/HotelFinder';

const UpdateHotel = () => {
    const {id} = useParams();
    let history = useHistory();
    const [name, setName] = useState("");
    const [priceRange, setPriceRange] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchData = async() => {
            const response = await HotelFinder.get(`/${id}`);
            setName(response.data.data.hotel.nazwa);
            setPriceRange(response.data.data.hotel.cena);
            if (!response.data.data.hotel.opis) {
                const updatedDescription = await HotelFinder.post(`/${id}/description`, {
                    description : "brak opisu"
                });
            }
            setDescription(response.data.data.hotel.opis ? response.data.data.hotel.opis : "brak opisu");
        }
        fetchData();
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedHotel = await HotelFinder.put(`/${id}`, {
            name,
            price_range: priceRange
        });
        const updatedHotel2 = await HotelFinder.put(`/${id}/description`, {
            description
        });
        history.push("/");

    }
    
    return (

        <div>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nawa</label>
                    <input value={name} onChange ={e => setName(e.target.value)} id="name" type="text" className="form-control" required/>
                </div>

                <div className="form-group">
                    <label htmlFor="price_range">Zakres cenowy</label>
                    <input value={priceRange} onChange={e => setPriceRange(e.target.value)} id="price_range" type="number" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis hotelu</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} id="description" type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Zatwierdź zmiany</button>
            </form>
        </div>
    )
}

export default UpdateHotel
