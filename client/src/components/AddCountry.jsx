import React, { useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';

const AddCountry = () => {
    const {AddCountries} = useContext(HotelsContext);
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.post("/countries", {
                name: name,
            });
            AddCountries(response.data.data.country);
            console.log(response);
        } catch (err) {}
    }

    return (
        <div className="mb-4">
            <form action="">
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa kraju"/>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    )
}

export default AddCountry
