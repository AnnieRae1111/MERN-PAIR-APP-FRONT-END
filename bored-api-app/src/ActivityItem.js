    const ActivityItem = ({ activity, markComplete }) => {
    return (
        <div className="item-container">
        <div className="item">
            <h3>{activity.activity}</h3> 
            <button
            onClick={() => {
                markComplete(activity);
            }}
            >
            DELETE
            </button>
        </div>
        </div>
    );
    };

    export default ActivityItem;
