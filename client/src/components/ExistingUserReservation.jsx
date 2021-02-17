import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';

const ExistingUserReservation = () => {
    const {idHotel, idOption} = useParams();
    const history = useHistory();

    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [startDate, setStartDate] = useState("2021-02-04");
    const [endDate, setEndDate] = useState("2021-02-04");
    const [selectedClient, setSelectedClient] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HotelFinder.post(`/${idHotel}/reservation/${idOption}/existingUser`, {
                nickname,
                password,
                start_date : startDate,
                end_date : endDate
            });
            if (response.status === 201) {
                setSelectedClient(response.data.data.existingClientData);
                history.push(`/clients/${response.data.data.existingClientData.id_klient}/reservations`);
            } else {
                alert("No such a user! Wrong login or password!")
            }
        } catch (e) {
            console.log(e);
            if (e.response.data !== undefined) {
                alert(e.response.data.data.err);
            }
        }
        
    }

    return (
        <div className="mb-2 text-left">
            <form action="" onSubmit={handleSubmit}>
                <h2>Istniejący użytkownik</h2> <br/>
                <div className="form-group" style={{maxWidth:"250px"}}>
                    <div className="form-group">
                        <label htmlFor="nickname">Pseudonim</label>
                        <input value={nickname} onChange={e => setNickname(e.target.value)} id="nickname" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} id="password" className="form-control" required/>
                    </div>
                    <div className="form-group" style={{marginRight:"20px"}}>
                        <p>termin zameldowania</p>
                        <input type="date" id="start" name="trip-start"
                            value={startDate} onChange={e => setStartDate(e.target.value)}
                            min="2021-01-01" max="2021-12-31"></input>

                    </div>
                    <div className="form-group">
                        <p>termin wymeldowania</p>
                        <input type="date" id="end" name="trip-end"
                            value={endDate} onChange={e => setEndDate(e.target.value)}
                            min="2021-01-01" max="2021-12-31"></input>
                    </div>
                </div>
                
                <button type="submit" className="btn btn-primary">Dokonaj rezerwacji</button>
            </form>
            
        </div>
    )
}

export default ExistingUserReservation
