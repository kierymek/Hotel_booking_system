import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import HotelFinder from '../apis/HotelFinder';
import AddOption from '../components/AddOption';
import AddReview from '../components/AddReview';
import HotelOptions from '../components/HotelOptions';
import Reviews from '../components/Reviews';
import StarRating from '../components/StarRating';
import { HotelsContext } from '../context/HotelsContext';

const HotelDetailPage = (props) => {
    const {id} = useParams();
    const {selectedHotel, setSelectedHotel} = useContext(HotelsContext);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await HotelFinder.get(`/${id}`);
                setSelectedHotel(response.data.data);
            } catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {selectedHotel && (
                <>
                    <h1 className="text-center display-1">{selectedHotel.hotel.nazwa}</h1>
                    <div className="text-center">
                        <StarRating rating={selectedHotel.hotel.srednia_ocena}></StarRating>
                        <span className="text-warning ml-1">
                            {selectedHotel.hotel.count ? `(${selectedHotel.hotel.count})` : "(0)"}
                        </span>
                        <p className="font-italic">{selectedHotel.hotel.opis}</p>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedHotel.reviews}/>
                    </div>
                    <div>
                        <AddReview/>
                    </div>
                    <div style={{paddingTop: "50px"}}>
                        <HotelOptions options={selectedHotel.options}/>
                    </div>
                    <div>
                        <AddOption/>
                    </div>
                </>
            )}
        </div>
    )
}

export default HotelDetailPage
