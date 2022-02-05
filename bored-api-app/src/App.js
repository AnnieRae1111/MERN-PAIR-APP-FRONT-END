import { React, useState, useEffect } from "react";
import "./App.css";
import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";
import axios from "axios";
import { set } from "mongoose";

//create activity idea
//delete activity
//get all activities

//button for get activities to return activities? 
//delete button to delete one 

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


//need to add another getinitial activities that references a seperate database that we don't mess with . 
//when you hit the getActivities button, you can get pre-seeded data 
//need to figure out how to update an activitiy / what that will look like 

function App() {
  // const [data, setData] =useState(null)
  const [activities, setActivities] = useState([]); //will use this to set initial data
  const [newActivity, setNewActivity] = useState(""); //new variable to track handleChange . This variable will be used to update our state
  const [isDeleted, setIsDeleted] = useState(false)
  const [isCreated, setIsCreated] = useState(false)

  const BASE_URL = "http://localhost:8080/api/activity";
  const getActivities = () => {
    axios.get(BASE_URL).then((res) => {
      // console.log(res.data)
      setActivities(res.data);
      setIsDeleted(false)
      setIsCreated(false)
      console.log(activities);       //getting all the activities inititally 
    });                            
  };

  useEffect(() => {
    getActivities();
  }, [isDeleted, isCreated]);

  



  if (!activities) {
    return <p>Loading activities</p>;
  }

  const handleChange = (event) => {
    setNewActivity(event.target.value);
    //new activity is whatever is typed into input box
    console.log(newActivity);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      activity: newActivity,
    };
    const items = [...activities, newItem];
    console.log(items);
    // setActivities(items);
    console.log(activities);
    axios.post(BASE_URL, items)
    .then(getActivities())
    .then(setIsCreated(true))
    setNewActivity("");
  };

  //target the id of the item that is clicked and delete it
  const markComplete = (activity) => {
    let url2 = `http://localhost:8080/api/activity/${activity._id}`
    console.log(url2)
    axios.delete(url2, activity._id)
    .then(setActivities(
      activities.filter((item) => item.activity._id !== activity._id)
    ))
    .then(res => console.log(res))
    .catch(console.error())
    // setActivities(activities.shift(activity))
    setIsDeleted(true)
  };

  return (
    <>
      <ActivityForm
        activities={activities}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newActivity={newActivity}
        markComplete={markComplete}
        getActivities={getActivities}
      />
      <ActivityList activities={activities} markComplete={markComplete} />
    </>
  );
}

export default App;
