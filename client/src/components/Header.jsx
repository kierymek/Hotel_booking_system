import React from 'react'
import { useHistory } from 'react-router-dom';
import logo from '../images/hotel_image.png';

const Header = () => {
    const history = useHistory();
    const  handleChoose = async (e, id) => {
        e.stopPropagation();
        history.push("/checkReservations");
    }

    return (
        <div>
            <h1 className="font-weight-bold display-1 text-center">Baza Hoteli</h1>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom : '30px'}}>
                <img src={logo}/>
            </div>
            <h5 className="text-center font-italic">Sprawdzenie rezerwacji dla zarejestrowanych użytkowników</h5>
            <div className="text-center" style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom : '30px'}}>
                <button onClick={(e) => handleChoose(e,)} className="btn btn-success">Sprawdź rezerwacje</button>
            </div>
        </div>
    )
}

export default Header;
