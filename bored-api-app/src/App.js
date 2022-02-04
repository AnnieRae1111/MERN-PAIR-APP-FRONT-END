import { React, useState, useEffect } from "react";
import "./App.css";
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";
import axios from "axios";


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


  const markComplete = (id) => {
    const url3 = BASE_URL + id
    console.log(url3)
    axios.delete(url3)
    .then(()=>{
      console.log("this was deleted")

    })

  }

  return (
    <>
      <ActivityForm
        activities={activities}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newActivity={newActivity}
        markComplete = {markComplete}
      />
      <ActivityList activities={activities} markComplete={markComplete} />
    </>
  );
}

export default App;
