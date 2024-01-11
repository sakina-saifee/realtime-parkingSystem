import React, { useEffect, useState } from 'react'
import './Booking.css';
import { db } from '../firebaseConfig/Firebase';
import { onValue, ref } from 'firebase/database';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Booking from './Booking';
import { useNavigate } from 'react-router-dom';

const ViewParkingLocation = () => {

    const [parkinglocation, setparkinglocation] = useState([]);
    const [showBooking, setshowBooking] = useState(false);
    const [selectedlocation, setselectedlocation] = useState(false);

    const navigate = useNavigate();

    const dbRef = ref(db, 'ParkingLocations/');

    useEffect(() => {
        onValue(dbRef, (snapshot) => {
            const newData = Object.values(snapshot.val());
            setparkinglocation(newData);
            console.log("snapshot", snapshot.val());
        });
    }, []);

    useEffect(() => {
        if (parkinglocation.length > 0) {
            console.log("parkinglocation n", parkinglocation);
        }
    }, [parkinglocation]);

    const chooseDay = (location) => {
        console.log("location", location);
        setselectedlocation(location);

        setshowBooking(true);
    }
    useEffect(() => { console.log("selectedlocation", selectedlocation) }, [selectedlocation])


    return (

        <>
          



            {showBooking && parkinglocation && parkinglocation.length > 0 ?
           
             <Booking selectedlocation={selectedlocation} MallNameviewparking={selectedlocation.MallName}/> 
          
               : 

                <>
                  <div className='image-banner'>
                <div className='image-banner-text'>
                    <h1>Parking Lot System</h1>
                </div>
            </div>

            <div className='booking-header'>
                <h1>Book Parking Slot Now</h1>
            </div>

                {parkinglocation.map((location, i) => {
                    return (
                        <div className='ParkingLcoationOuterCard ' onClick={() => chooseDay(location)}>
                            <div className="card ParkingLocationInnerCard">

                                <div className='location-icon-div'>
                                    <LocationOnIcon className='location-icon'></LocationOnIcon>

                                </div>


                                <div className='location-info'>

                                    <div className='mallname-div'>
                                        <p>{location.MallName.toUpperCase()}</p>

                                    </div>
                                    <div className='cityname-div'>
                                        <p>{location.City.toUpperCase()}</p>
                                    </div>
                                    <div className='floorno-div'>
                                        <p>{location.Floor.toUpperCase()}</p>

                                    </div>
                                    <div className='slots-div'>
                                        <p>{location.Slots} Slots</p>

                                    </div>
                                </div>


                            </div>

                        </div>

                    );




                }



                )}

                </>
              

            }


        </>
    )
}

export default ViewParkingLocation
