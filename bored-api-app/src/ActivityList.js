    import ActivityItem from "./ActivityItem";

    const ActivityList = ({updatedActivity, handleUpdateClick, handleUpdate, activities, markComplete }) => {
    //activities is the data being passed down from app.js
    console.log(activities);
    return (
        <>
        {activities.map((activity, index) => {
            return (
            <ActivityItem
                key={activity._id}
                activity={activity}
                markComplete={markComplete}
                id={activity._id}
                handleUpdate = {handleUpdate}
                handleUpdateClick = {handleUpdateClick}
                updatedActivity ={updatedActivity}
                index ={index}

            />
            );
        })}
        </>
    );
    };

    export default ActivityList;
