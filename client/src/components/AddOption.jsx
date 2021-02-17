import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';

const AddOption = () => {
    const {id} = useParams();
    const history = useHistory();
    const location = useLocation();

    const [option, setOption] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HotelFinder.post(`/${id}/addOption`, {
                option
            });
            history.push("/");
            history.push(location.pathname);
        } catch (e) {
            console.log(e);
        }
        
    }

    return (
        <div className="mb-2">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="option">Opis nowej opcji</label>
                        <input value={option} onChange={e => setOption(e.target.value)} minLength="5" id="option" placeholder="nowa opcja" type="text" className="form-control" required/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Dodaj opcję</button>
            </form>
            
        </div>
    )
}

export default AddOption