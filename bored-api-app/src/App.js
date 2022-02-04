import {React, useState, useEffect} from "react"
import './App.css';
import ActivityList from './ActivityList';
import ActivityForm from "./ActivityForm";
import axios from "axios"


const activitiesData = [
  {
    activity: "Take a bubble bath",
    accessibility: 0.1,
    type: "relaxation",
    participants: 1,
    price: 0.15
},
{
    activity: "Learn how to fold a paper crane",
    accessibility: 0.05,
    type: "education",
    participants: 1,
    price: 0.1,
    key: "3136036"
},
]


function App() {
  // const [data, setData] =useState(null)
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState({
    activity: ""
  }) 

  useEffect(()=> {
    fetch('https://localhost:8080/activity')
    .then((res)=> res.json())
    .then((data)=> {
      console.log(data)
      setActivities(data)
      console.log(activities)
    })
  }, [])
  
  const handleChange = (event) => { 
    setNewActivity(event.target.value)    
   //new activity is whatever is typed into input box 
    console.log(newActivity)

  }

  // const handleSubmit = (event) => {
  //   event.preventDefualt()
  //   const newItem = { 
  //     activity: newActivity.activity
  //   }
  //   axios.post('http://localhost:3001/create', newItem)

  //   // let test = [...activities] //test is now equal to an array that holds all the acitivities
  //   // test = [...test, {activity: newActivity}] //adding onto the data  
  //   // setActivities(test) //setting the activities data to the original data plus the new input data 
  //   // console.log('submit info')
  //   // setNewActivity('') //this resets the input box after submit the button has been clicked 
  // }

  return (
    <>
    <div className= "app">
      <div>{ activities }</div> 
    {/* <p> {!data ? "Loading..." : data} </p> */}
    <ActivityForm activities ={activities} handleSubmit={handleSubmit} handleChange={handleChange} newActivity={newActivity}/>
    <ActivityList activities={activities} />
    
    </div>
    
    </>
  )
}

export default App;
