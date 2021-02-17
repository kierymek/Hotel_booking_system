import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';
import ExistingUserReservation from '../components/ExistingUserReservation';
import NewUserReservation from '../components/NewUserReservation';
import { HotelsContext } from '../context/HotelsContext';

const ReservationPage = () => {
    const {idHotel, idOption} = useParams();
    const {selectedOption, setSelectedOption} = useContext(HotelsContext);
    const {selectedHotel, setSelectedHotel} = useContext(HotelsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hotel = await HotelFinder.get(`/${idHotel}`);
                setSelectedHotel(hotel.data.data);
                const option = await HotelFinder.get(`/options/${idOption}`);
                setSelectedOption(option.data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {selectedHotel && selectedOption &&(
                <>
                    <h1 className="text-center display-2" style={{paddingBottom:"30px"}}>Dane rezerwacji</h1>
                    <div className="row row-cols-3 mb-2 mt-3 " style={{paddingBottom:"70px"}}>
                        <div className="card text-dark bg-info mb-3 mr-4" style={{maxWidth: "30%", marginLeft:"20px"}}>
                            <div className="card-header">dane hotelu</div>
                            <div className="card-body">
                                <h5 className="card-title">{selectedHotel.hotel.nazwa}</h5>
                                <p className="card-text font-italic">{selectedHotel.hotel.opis}</p>
                            </div>
                        </div>
                        <div className="card text-dark bg-warning mb-3 mr-4" style={{maxWidth: "30%"}}>
                            <div className="card-header">Wybrana opcja</div>
                            <div className="card-body">
                                <h5 className="card-title">{selectedOption.option.rodzaj}</h5>
                            </div>
                        </div>
                        <div className="d-flex align-items-center" style={{maxWidth: "30%"}}>
                            <strong>Przetwarzanie...</strong>
                            <div className="spinner-grow text-warning ms-auto" role="status" aria-hidden="true"></div>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <NewUserReservation/>
                        </div>
                        <div className="col">
                            <ExistingUserReservation/>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ReservationPage
