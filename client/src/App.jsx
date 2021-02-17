import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HotelDetailPage from './routes/HotelDetailPage';
import UpdatePage from './routes/UpdatePage';
import Home from "./routes/Home";
import { HotelsContextProvider } from './context/HotelsContext';
import ReservationPage from './routes/ReservationPage';
import ClientsReservations from './routes/ClientsReservations';
import CheckReservations from './routes/CheckReservations';

const App = () => {
    return (
        <HotelsContextProvider>
            <div className="container">
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/hotels/:id/update" component={UpdatePage}/>
                        <Route exact path="/hotels/:id" component={HotelDetailPage}/>
                        <Route exact path="/hotels/:idHotel/reservation/:idOption" component={ReservationPage}/>
                        <Route exact path="/clients/:idClient/reservations" component={ClientsReservations}/>
                        <Route exact path="/checkReservations" component={CheckReservations}/>
                    </Switch>
                </Router>
            </div>
        </HotelsContextProvider>
 
    )
};

export default App;