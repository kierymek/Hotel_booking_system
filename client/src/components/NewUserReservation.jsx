import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';

const NewUserReservation = () => {
    const {idHotel, idOption} = useParams();
    const history = useHistory();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [startDate, setStartDate] = useState("2021-02-04");
    const [endDate, setEndDate] = useState("2021-02-04");
    const [selectedClient, setSelectedClient] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HotelFinder.post(`/${idHotel}/reservation/${idOption}/newUser`, {
                name,
                surname,
                nickname,
                password,
                start_date : startDate,
                end_date : endDate
            });
            setSelectedClient(response.data.data);
            history.push(`/clients/${response.data.data.newClient.id_klient}/reservations`);
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
                <h2>Nowy użytkownik</h2> <br/>
                <div className="form-col" style={{maxWidth:"250px"}}>
                    <div className="form-group">
                        <label htmlFor="name">Imię</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className="form-control" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Nazwisko</label>
                        <input value={surname} onChange={e => setSurname(e.target.value)} id="surname" className="form-control" required/>
                    </div>
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

export default NewUserReservation
