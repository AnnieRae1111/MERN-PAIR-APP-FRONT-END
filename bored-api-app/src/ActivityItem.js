    const ActivityItem = ({index, id, event, handleUpdate,handleUpdateClick, updatedActivity, activity, markComplete }) => {
    return (
        <div className="item-container">
        <div className="item">
            <h3>{activity.activity}</h3> 
            <form>
            <input type="text" id={ index }
            value = {updatedActivity.index}  onChange={(event)=>{handleUpdate(event,index)}}>  
            {/* event is being defined only on the change */}
            </input>
            </form>
            <button
            onClick={() => {
                markComplete(activity);
            }}
            >
            DELETE
            </button>
            <button onClick={()=> {handleUpdateClick(activity, index)}}> UPDATE </button>
        </div>
        </div>
    );
    };

    export default ActivityItem;
