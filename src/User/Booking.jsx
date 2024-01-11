import React, { useEffect, useState } from 'react'
import Navbar2 from '../Navbar2'
import '../Navbar.css'
import { Button, FormControl, InputLabel, MenuItem, Select, Typography, Modal, Box, TextField } from '@mui/material'
import './Booking.css';
import RedCar from '../Assets/redcar.png';
import { toast } from 'react-toastify';
import { auth, db } from '../firebaseConfig/Firebase';
import { onValue, push, ref, remove, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import YellowCar from '../Assets/yellowcar.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Booking = (props) => {
  const [day, setday] = useState("");
  const [selectedparkingLocation, setselectedparkingLocation] = useState({});
  const [showSlots, setShowSlots] = useState(false);
  const [selectedTime, setselectedTime] = useState({
    starttime: "",
    endtime: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [startDateDb, setStartDateDb] = useState(null);
  const [endDateDb, setEndDateDb] = useState(null);

  const [slotno, setSlotNo] = useState(1);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [bookedinfo, setbookedInfo] = useState([]);
  const [viewfinaldata, setviewfinaldata] = useState([]);

  // Assuming props.selectedlocation.slots is a number
  const [open, setOpen] = useState(false);
  const [viewopen, setViewOpen] = useState(false);
const [viewslot, setviewSlot]=useState(0);
const [viewSlotSelectedopen, setviewSlotSelectedopen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleViewClose = () => setViewOpen(false);

  useEffect(() => {
    setselectedparkingLocation(props.selectedlocation);
  }, [props.selectedlocation]);

  // console.log("selected parking info", selectedparkingLocation);



  // Event handlers that update the state variables
  const handleStartDateChange = (event) => {
    const newStartDateString = event.target.value;
    const newStartDate = new Date(newStartDateString); // Parse the date string

   const date= new Date(newStartDateString).getTime();

    setStartDate(newStartDateString); // Update the state
    setStartDateDb(date);
  };

  const handleEndDateChange = (event) => {

    const newStartDateString = event.target.value;
    const newStartDate = new Date(newStartDateString); // Parse the date string

   const date= new Date(newStartDateString).getTime();

   setEndDate(newStartDateString); // Update the state
    setEndDateDb(date);
  }



  const handlechange = (e) => {
    setday(e.target.value);
    const { name, value } = e.target;

    setselectedTime((prevdata) => (
      { ...prevdata, [name]: value }));
  }



  function GetCurrentUser() {
    const [user, setUser] = useState("");


    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {


          const userRef = ref(db, 'UserRegister/' + userlogged.uid);
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            setUser(data);
          });
        } else {
          setUser(null);
        }
      });
    }, []);

    return user;
  }

  const loggeduser = GetCurrentUser();
  if (loggeduser) {
    // console.log(loggeduser)
  }



  const handlebooknow = (slot) => {
    setOpen(true);
    setSlotNo(slot);

  }
  
  const handleviewDetails = (i) => {
    
    setviewSlot(i)

  }

 

  useEffect(() => {


console.log("view slot use state", viewslot)

    const dbRef = ref(db, `${props.MallNameviewparking}/`+`${viewslot}/`);
    onValue(dbRef, (snapshot) => {
 

        const snapshotVal = snapshot.val();
 
        console.log("snapshot vlaues new", snapshotVal);
        if (snapshotVal==null) {
          setviewSlotSelectedopen(false);
          setViewOpen(false);
        }else{
          setviewSlotSelectedopen(true);
          setViewOpen(true);

          const newData = Object.values(snapshotVal);
      
          setbookedInfo(newData);
          
          console.log("snapshot slot booked", newData);
        }
      
     
    });


  }, [viewslot]);

  useEffect(()=>{
    const newData = bookedinfo.map(job => Object.values(job)); // Transform each job to the desired structure
    console.log("new data", newData.flat())
    setviewfinaldata(newData.flat());

  },[bookedinfo])

const [itemskeys, setitemskeys]=useState([]);
const [showdata, setshowdata]=useState(true);






  const SubmitBookingDetails = () => {
console.log("inside run ", viewfinaldata);

let show =true;
viewfinaldata.map((i)=>{
  // if(i.StartDateTime==startDateDb && i.EndDateTime==endDateDb ){
  //   setshowdata(false);
  //   return 
  // }

  // if ((startDateDb > i.StartDateTime && endDateDb < i.EndDateTime) ||
  // (startDateDb > i.StartDateTime && endDateDb <= i.EndDateTime) || 
  // (startDateDb <= i.StartDateTime && endDateDb >= i.EndDateTime) || 
  // (startDateDb == i.StartDateTime && endDateDb == i.EndDateTime)) { 
  //   show=false;
  //   toast.error("This slot is already been booked. Choose another slot!");
  // }

  if ((startDateDb < i.StartDateTime && endDateDb > i.StartDateTime) || 
  (startDateDb < i.StartDateTime && endDateDb >= i.EndDateTime) || 
  (startDateDb >= i.StartDateTime && startDateDb < i.EndDateTime && endDateDb >= i.EndDateTime) || 
  (startDateDb >= i.StartDateTime && endDateDb <= i.EndDateTime) || 
  (startDateDb == i.StartDateTime && endDateDb == i.EndDateTime) || 
  (startDateDb <= i.StartDateTime && endDateDb >= i.EndDateTime) || 
  (startDateDb < i.StartDateTime && endDateDb == i.StartDateTime) || 
  (startDateDb == i.EndDateTime && endDateDb > i.EndDateTime)) { 
show=false;
toast.error("This slot is already been booked. Choose another slot!");
return;
}

  console.log("condition start date ", i.StartDateTime, "condition end date ", i.EndDateTime,"condition start date on change ", startDateDb, "condition end date  on change", endDateDb, "eunnnnnnnnnnnnnnnn");
})

if(show){
  const itemref=ref(db, 'userBooked/' + loggeduser?.uid);
  const pushkeys=push(itemref)
  
  set(pushkeys,{
    FullName: loggeduser.Username,
    Email: loggeduser.Email,
    DayBooked: day,
    SlotNo: slotno,
    StartDateTime: startDateDb,
    EndDateTime: endDateDb,
    PushKeys: pushkeys.key,
    StartDateTimeString: startDate,
    EndDateTimeString: endDate,

  }).then(() => {
    toast.success("Youve Booked The Slot!");
    setitemskeys(pushkeys);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
    setBookedSlots((prevBookedSlots) => [...prevBookedSlots, slotno]);
  })


  
  const itemref2=ref(db, `${props.MallNameviewparking}/` + `${slotno}/`+`${loggeduser.uid}`);

  const pushkeys2=push(itemref2);

  set(pushkeys2, {
    FullName: loggeduser.Username,
    Email: loggeduser.Email,
    DayBooked: day,
    StartDateTime: startDateDb,
    EndDateTime: endDateDb,
    uid: loggeduser?.uid,
    PushKeys: pushkeys2.key,
    StartDateTimeString: startDate,
    EndDateTimeString: endDate,
  })


}


  
  }



  const [bookedInfokeys , setbookedInfokeys]=useState([]);


  


  useEffect(() => {
   
    if(slotno==viewslot){
      setviewSlotSelectedopen(true);
    }


  }, [bookedInfokeys]);

  const handlecancelnow=(item,uniqueIdentifierForSlot)=>{


    remove(ref(db, `${props.MallNameviewparking}` + `${slotno}/`+`${loggeduser.uid}/`+`${uniqueIdentifierForSlot}`)).then(()=>{
      toast.warning("You cancelled the Slot");
    })
   
     
};
  
    
      
    

  const renderCarSlots = () => {

    if (!showSlots) return null;

    const slots = props.selectedlocation?.Slots;
    // If slots is not a number or less than 1, don't render anything
    if (!slots || slots < 1) return null;

    const slotDivs = [];
    for (let i = 0; i < slots; i++) {
      const isBooked = bookedSlots.includes(i + 1);
  
   
      slotDivs.push(
        <div key={i} className='display-car-div'>
          {/* Content of car slot, e.g., a car image or slot number */}
          <div className='innercontentCar'>

            <div className='image-car'>
              <img src={isBooked ? YellowCar : RedCar} width="300" height="300" />
            </div>
            <div className='slotNo'>
              <p >Slot {i + 1}</p>
            </div>


 <Button className='viewDetails-btn' onClick={() => handleviewDetails(i+1)}>View Details</Button>

         {viewSlotSelectedopen ? <>
          <div className='view-details-div'>
             
             <Modal
               open={viewopen}
               onClose={handleViewClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               className="modal"
             >
               <Box sx={style}>

                 <div className='inputs-for-booking'>
                   <Typography id="modal-modal-title" variant="h6" component="h2">
                     View Details of The Slot No {viewslot}
                   </Typography>
                   <br />

                 </div>

                 <div className='bookedViewDetails'>




                   <table>
                     <thead>
                       <tr>

                         <th>FullName</th>
                         <th>Booked On</th>
                         <th>Email</th>
                         <th>Start Date</th>
                         <th>End Date</th>
                         <th>Action</th>
                       </tr>

                     </thead>



                     {viewfinaldata.map((item, index) => 
                     (


                       <>
                         <tbody>
                           <tr key={index}>
                             <td>{item?.FullName?.toUpperCase()}</td>
                             <td>{item?.DayBooked?.toUpperCase()}</td>
                             <td>{item?.Email}</td>
                             <td>{new Date(item?.StartDateTimeString).toLocaleString()}</td>
                             <td>{new Date(item?.EndDateTimeString).toLocaleString()}</td>
                             <td>  {item?.Email==loggeduser.Email ?<Button className='cancel-btn' onClick={() => 
              handlecancelnow((i+1),item?.PushKeys)} >Cancel Now</Button>:<></>} </td>
                            
                             
                           </tr>

                         </tbody>
                       </>
                     ))}

                   </table>







                   <br />



                 </div>



               </Box>
             </Modal>
           </div>
         </>: <></>}
            
            

            <div>
              <Button className='bookNow-btn' onClick={() => handlebooknow(i+1)}> Book Now</Button>
            
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
              >
                <Box sx={style}>

                  <div className='inputs-for-booking'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Select Duration To Book The Slot {slotno}
                    </Typography>
                    <br />

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Select Start Date & Time" className='datetimepicker' />
                      </DemoContainer>
                    </LocalizationProvider>
                    <br />

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateTimePicker']}>
                        <DateTimePicker label="Select End Date & Time" className='datetimepicker'



                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <br /> */}

                    <div className='start-date-time-picker-div'>
                      <label>Start Date Time Picker</label>
                      <input
                        type="datetime-local"
                        id="start-date-time-picker"
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                    </div>

                    <div className='end-date-time-picker-div'>
                      <label>End Date Time Picker</label>
                      <input
                        type="datetime-local"
                        id="end-date-time-picker"
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                    </div>


                    <div>
                      <Button onClick={SubmitBookingDetails} className="modal-book-now-btn">Book</Button>
                    </div>
                  </div>




                </Box>
              </Modal>
            </div>



          </div>

        </div>
      );
    }
    return slotDivs;
  };

  const handleDisplaySlots = () => {
    if (day == "") {
      toast.error("Choose a day");
    } else {
      setShowSlots(true);
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

      <div className='booking-header'>

        <h1>Showing Book Parking Slot Now For </h1>

        <p className='selectionlocation'>{props.selectedlocation?.MallName?.toUpperCase()}</p>
        <p className='selectionlocation'>{props.selectedlocation?.City?.toUpperCase()}</p>
        <p className='selectionlocation'>{props.selectedlocation?.Floor?.toUpperCase()}</p>

      </div>

      <div className='choose-a-day'>
        <FormControl fullWidth variant="outlined"
          id="outlined-basic" color="success">
          <InputLabel id="demo-simple-select-label" >Select a Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="day"

            onChange={handlechange}
            value={day}
          >
            <MenuItem value="monday">Monday</MenuItem>
            <MenuItem value="tuesday">Tuesday</MenuItem>
            <MenuItem value="wednesday">Wednesday</MenuItem>
            <MenuItem value="thursday">Thursday</MenuItem>
            <MenuItem value="friday">Friday</MenuItem>
            <MenuItem value="saturday">Saturday</MenuItem>
            <MenuItem value="sunday">Friday</MenuItem>
          </Select>
        </FormControl>

        <Button className="display-slots-btn" onClick={handleDisplaySlots}>Display Slots</Button>
      </div>


      <div className='display-car-container'>
        {renderCarSlots()}
      </div>

      <div>
        {/* <img src={carStatus.ImageCar}/> */}
      </div>


    </>
  )
}

export default Booking
