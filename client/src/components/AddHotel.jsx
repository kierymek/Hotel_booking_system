import React, { useContext, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelFinder from "../apis/HotelFinder";
import { HotelsContext } from '../context/HotelsContext';

const AddHotel = () => {
    const {addHotels} = useContext(HotelsContext);
    const [name, setName] = useState("");
    const [cityName, setCityName] = useState("");
    const [priceRange, setPriceRange] = useState(1);

    const handleSubmit = async (e) => {
        e.stopPropagation();
        try {
            const response = await HotelFinder.post("/", {
                name: name,
                city_name: cityName,
                price_range: priceRange
            });
            if(response.data.status === "failed") {
                alert("Podane miasto jeszcze nie zostało dodane!");
            } else if(response.status === 203) {
                alert(response.data.data.err);
            } else {
                addHotels(response.data.data.hotel);
                console.log(response);
            }
        } catch (err) {
            alert("Błąd przy wprowadzaniu hotelu!");
        }
    }

    return (
        <div className="mb-4">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="nazwa hotelu" required/>
                    </div>
                    <div className="col">
                        <input value={cityName} onChange={e => setCityName(e.target.value)} type="text" className="form-control" placeholder="nazwa miasta" required/>
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2" required>
                            <option disabled>Zakres cenowy</option>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    )
}

export default AddHotel
