import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';

const CheckReservations = () => {
    const history = useHistory();

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HotelFinder.get(`/clients/login/${nickname}/${password}`);
            if (response.data.status === "success") {
                history.push(`/clients/${response.data.data.client.id_klient}/reservations`);
            } else {
                alert("No such a user! Wrong login or password!")
            }
        } catch (e) {
            console.log(e);
            // alert("No such a user! Wrong login or password!")
        }
        
    }

    return (
        <div>
            <h1>Sprawdzenie rezerwacji użytkownika</h1><br/>
            <div style={{ width : "30%"}}>
                <h2>Istniejący użytkownik</h2> <br/>
                <form action="" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="nickname">Pseudonim</label>
                    <input value={nickname} onChange={e => setNickname(e.target.value)} size="50" id="nickname" className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} size="50" id="password" className="form-control" required/>
                </div>
                
                
                <button type="submit" className="btn btn-primary">zaloguj się</button>
            </form>
            </div>
            
            
        </div>
    )
}

export default CheckReservations
