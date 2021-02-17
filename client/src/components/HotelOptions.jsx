import React from 'react'
import { useHistory, useParams} from 'react-router-dom';

const HotelOptions = ({options}) => {
    const {id} = useParams();
    const history = useHistory();

    const handleReservation = async (e, idOption) => {
        e.preventDefault();        
        history.push(`/hotels/${id}/reservation/${idOption}`);
    }

    return (
        <div className="row row-cols-3 mb-2">
            {options.map((option) => {
                return (
                    <div key={option.id_opcji}
                        className="card border-warning bg-trnsparent mb-3 mr-4" 
                        style={{maxWidth: "30%"}}>
                        <div className="card-header d-flex justify-content-between">
                            <span>{option.wolny === true ? "dostępny" : "zarezerwowany"}</span>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{option.rodzaj}</p>
                        </div>
                        <div className="card-footer border-warning">
                        <button onClick={(e) => handleReservation(e, option.id_opcji)} className="btn btn-warning">Rezerwuj</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default HotelOptions