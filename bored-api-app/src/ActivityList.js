    import ActivityItem from "./ActivityItem";

    const ActivityList = ({ activities, markComplete }) => {
    //activities is the data being passed down from app.js
    console.log(activities);
    return (
        <>
        {activities.map((activity) => {
            return (
            <ActivityItem
                key={activity._id}
                activity={activity}
                markComplete={markComplete}
                id={activity._id}
            />
            );
        })}
        </>
    );
    };

    export default ActivityList;
