import React, { useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom';
import HotelFinder from '../apis/HotelFinder';

const AddReview = () => {
    const {id} = useParams();
    const history = useHistory();
    const location = useLocation();

    const [name, setName] = useState("Anonim");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await HotelFinder.post(`/${id}/addReview`, {
                name,
                review : reviewText,
                rating,
            });
            history.push("/");
            history.push(location.pathname);
        } catch (e) {
            console.log(e);
            alert(e.response.data.data.err);
        }
        
    }

    return (
        <div className="mb-2">
            <form action="" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-8">
                        <label htmlFor="name">Imie</label>
                        <input value={name} onChange={e => setName(e.target.value)} id="name" placeholder="name" type="text" className="form-control" required/>
                    </div>
                    <div className="form-group col-8">
                        <label htmlFor="rating">Ocena</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} id="rating" className="custom-select" required> 
                            <option value="" defaultValue disabled>Ocena</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="Review">Recenzja</label>
                    <textarea value={reviewText} onChange={e => setReviewText(e.target.value)} id="Review" className="form-control" placeholder="Tutaj napisz recenzję" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Zatwierdź</button>
            </form>
            
        </div>
    )
}

export default AddReview
