import { React, useState, useEffect } from "react";
import "./App.css";
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";
import axios from "axios";

//create activity idea 
//delete activity 
//get all activities 



const activitiesData = [
  {
    activity: "Take a bubble bath",
    accessibility: 0.1,
    type: "relaxation",
    participants: 1,
    price: 0.15,
  },
  {
    activity: "Learn how to fold a paper crane",
    accessibility: 0.05,
    type: "education",
    participants: 1,
    price: 0.1,
    key: "3136036",
  },
];

function App() {
  // const [data, setData] =useState(null)
  const [activities, setActivities] = useState([]); //will use this to set initial data 
  const [newActivity, setNewActivity] = useState("") //new variable to track handleChange . This variable will be used to update our state 


  const BASE_URL = "http://localhost:8080/api/activity";
  const getActivities = () => {
    axios.get(BASE_URL).then((res) => {
      // console.log(res.data)
      setActivities(res.data);
      console.log(activities)
    });
  };

  useEffect(() => {
    getActivities(activities);
  }, []);

  if(!activities){
    return <p>Loading activities</p>
  }

  const handleChange = (event) => {
    setNewActivity(event.target.value);
    //new activity is whatever is typed into input box
    console.log(newActivity);
  };


  const handleSubmit = (event) => {
    event.preventDefault()
    const newItem = {
      activity: newActivity
    }
    const items = [...activities, newItem]
    console.log(items)
    setActivities(items)
    console.log(activities)
    axios.post(BASE_URL, items)
    setNewActivity("")
  }

//target the id of the item that is clicked and delete it 
const markComplete = (activity) => {
  let url2 = `http://localhost:8080/api/activity/${activity._id}`
  console.log(url2)
 axios.delete(url2, activity._id)
 setActivities(activities.filter((item) => item.activity._id !== activity._id
    ))
 
}





  // const markComplete = (id) => {
  //   let { id } = useParams()
  // const url2 = BASE_URL + id 
  // console.log(url2)
  //   //why is _id coming up as undefinde? 
  // }

  return (
    <>
      <ActivityForm
        activities={activities}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newActivity={newActivity}
        markComplete = {markComplete}
        getActivities ={getActivities}
      />
      <ActivityList activities={activities} markComplete={markComplete} />
    </>
  );
}

export default App;
