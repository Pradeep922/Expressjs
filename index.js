const express = require('express');
const app = express();
const PORT = 8000

var room =[]

app.get('/room', function(req, res, next) {
    res.send(room);
});


app.post("/Create Room",(req,res)=>{
    data={
      roomID:req.body.roomID,
      capacity:req.body.capacity,
      price:req.body.price,
      bookedStatus:"Available",
      customerName:"",
      date:"",
      startTime:"",
      endTime:""
    }
    room.push(data);
    res.json({
      message:"Room created Successfully"
    })
})

app.post("/NewBooking",(req,res)=>{
    let booked=false;
    room.map((e)=>{
      if(e.roomID===req.body.roomID){
        e.bookedStatus="Occupied";
        e.customerName=req.body.customerName;
        e.date=req.body.date;
        e.startTime=req.body.startTime;
        e.endTime=req.body.endTime;
        booked=true;
      }
    })
    if(booked){
      res.json({
        message:"Booking Successfull"
      })
    }else{
      res.json({
        message:"Booking Failed",
        instruction:"Check room exist or not and check the availability"
      })
    }
})


app.get("/Booked-Room",(req,res)=>{
    let data=[];
    room.map((e)=>{
      if(e.bookedStatus=="Occupied"){
        data.push({
          roomID:e.roomID,
          bookedStatus:e.bookedStatus,
          customerName:e.customerName,
          date:e.date,
          startTime:e.startTime,
          endTime:e.endTime
        })
      }
    })
    res.send(data);
})

app.get("/Customer Booked",(req,res)=>{
  let data=[];
  room.map((e)=>{
    if(e.bookedStatus=="Occupied"){
      data.push({
        customerName:e.customerName,
        roomID:e.roomID,
        date:e.date,
        startTime:e.startTime,
        endTime:e.endTime
      })
    }
  })
  res.send(data);
})


app.listen(PORT, ()=> console.log("Service listening on port " +PORT));