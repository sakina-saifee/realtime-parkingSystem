import React, { useState } from 'react'
import Navbar2 from '../Navbar2'
import '../Navbar.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import './AdminMain.css'
import { auth, db } from '../firebaseConfig/Firebase';
import { getDatabase, ref, set, push } from "firebase/database";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";




const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const AdminMain = () => {


    const [parkingAreas, setParkingAreas] = useState({
        mallname: "",
        city: "",
        floor: "",
        slots: "",
    })

    const handlechange = (e) => {
        const { name, value } = e.target;
        setParkingAreas({ ...parkingAreas, [name]: value })
    }



    const handleSubmit = () => {

        if (parkingAreas.mallname == "" || parkingAreas.city == "" || parkingAreas.floor == "" || parkingAreas.slots == "") {
            toast.error("Please Fill The required Fields");
        } else {
            push(ref(db, 'ParkingLocations/'), {
                MallName: parkingAreas.mallname,
                City: parkingAreas.city,
                Floor: parkingAreas.floor,
                Slots: parkingAreas.slots,
            })
                .then(() => {
                    toast.success("Location Added Successfully!");
                    setParkingAreas({
                        mallname: "",
                        city: "",
                        floor: "",
                        slots: "",
                    });



                })
        }


    }



    return (
        <>

            <Navbar2 />
            <div className='image-banner'>
                <div className='image-banner-text'>
                    <h1>Parking Lot System</h1>
                </div>
            </div>

            <div className='enter-location'>
                <div className='inputs-location'>
                    <br />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Mall Name"
                        variant="outlined"
                        value={parkingAreas.mallname}
                        name="mallname"
                        onChange={handlechange}
                        className='mallname'
                        color="success"
                    />
                    <br />
                    <br />
                    <FormControl fullWidth variant="outlined"
                        id="outlined-basic" color="success">
                        <InputLabel id="demo-simple-select-label" >Select City</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="city"

                            onChange={handlechange}
                            value={parkingAreas.city}
                        >
                            <MenuItem value="karachi">Karachi</MenuItem>
                            <MenuItem value="quetta">Quetta</MenuItem>
                            <MenuItem value="hyderabad">Hyderabad</MenuItem>
                            <MenuItem value="lahore">Lahore</MenuItem>
                            <MenuItem value="peshawar">Peshawar</MenuItem>
                            <MenuItem value="islamabad">Islamabad</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <br />

                    <FormControl fullWidth color="success">
                        <InputLabel id="demo-simple-select-label">Select Floor No.</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="floor"
                            onChange={handlechange}
                            value={parkingAreas.floor}
                        >
                            <MenuItem value="floor1">Floor 1st</MenuItem>
                            <MenuItem value="floor2">Floor 2nd</MenuItem>
                            <MenuItem value="floor3">Floor 3rd</MenuItem>

                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <TextField
                        id="outlined-basic"
                        label="Slots"
                        variant="outlined"
                        value={parkingAreas.slots}
                        name="slots"
                        onChange={handlechange}
                        color="success"
                        type='number'
                    />
                    <Button onClick={handleSubmit} className='submitbtn'>
                        Submit
                    </Button>


                </div>


            </div>
        </>
    )
}

export default AdminMain
