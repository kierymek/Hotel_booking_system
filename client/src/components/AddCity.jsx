import React, { useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';

const AddCity = () => {
    const {AddCities} = useContext(HotelsContext);
    const [name, setName] = useState("");
    const [countryName, setCountryName] = useState("");

    const handleSubmit = async (e) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.post("/cities", {
                name: name,
                country_name: countryName,
            });
            if(response.data.status === "failed") {
                alert("Podany kraj jeszcze nie został dodany!")
            } else {
                AddCities(response.data.data.city);
                console.log(response);
            }
        } catch (err) {}
    }

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa miasta" required/>
                    </div>
                    <div className="col">
                        <input value={countryName} onChange={e => setCountryName(e.target.value)} type="text" className="form-control" placeholder="nazwa kraju" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    )
}

export default AddCity
