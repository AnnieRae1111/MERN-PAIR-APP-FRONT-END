import {React, useState, useEffect} from "react"
import './App.css';
// import ActivityList from './ActivityList';
// import ActivityForm from "./ActivityForm";
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
  const [activityData, setActivityData] = useState([])
  const [activities, setActivities] = useState([])
  const [newActivity, setNewActivity] = useState() 

const url = "http://localhost:8080/activity"

const getActivities = () => {
  axios.get(url, {activity: newActivity})
    .then(res => setActivityData(res.data))
    .catch(console.log)
}

  console.log(activityData)
  
  useEffect(()=> {
    getActivities(activityData)
  }, [])



  const handleChange = (event) => { 
    setNewActivity(event.target.value)    
   //new activity is whatever is typed into input box 
    console.log(newActivity)
  }

  //this is submitting data to the API and making it show up on the browser.
  const handleSubmit = (event) => {
    event.preventDefault()
    const newItem = { 
      activity: newActivity
    }
    const items = [...activities, newItem]
    console.log(items)//items is now an array of objects, which is what we want to send to db
    //each time you press submit, it adds to the array. so that's working
    setActivities(items)
    console.log(activities)
    axios.post(url, items)
  }
  //Need to make the delete button target the ID and delete the item from the activities
  const handleClick = (activity) => {
    
    console.log(activity._id)
    const uniqueURL = `http://localhost:8080/activity/${activity._id}`
    axios
      .delete(uniqueURL, activity._id)
  }

  // console.log(activityData._id)

  return (
    <>
    <div className= "app">
      <form onSubmit={ handleSubmit }>  
            <label className = "label"> NEW ACTIVITY: 
            <input type="text" id="activity" name="activity"
            value={newActivity}
            onChange = { handleChange}
            />
            </label>
            <input type="submit"></input>
        </form>
      {activityData.map(activity => {
        return(
          <div>
            <p>{ activity.activity }</p>
            <button onClick={ () => { handleClick(activity)}}> Delete </button>  
          </div>
      )})}
      {/* <div>{ activities }</div>  */}
    {/* <p> {!data ? "Loading..." : data} </p> */}
    {/* <ActivityForm activities ={activities} handleSubmit={handleSubmit} handleChange={handleChange} newActivity={newActivity}/> */}
    {/* <ActivityList activities={activities} /> */}
    
    </div>
    
    </>
  )
}

export default App;
