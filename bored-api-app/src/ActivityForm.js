    import axios from "axios";

    const ActivityForm = ({
    activities,
    handleSubmit,
    handleChange,
    newActivity,
    }) => {
    return (
        <>
        <div className="create-activity-form-container">
            <form onSubmit={handleSubmit}>
            <label className="label">
                {" "}
                NEW ACTIVITY:
                <input
                type="text"
                id="activity"
                name="activity"
                value={newActivity}
                onChange={handleChange}
                />
            </label>
            <button type="submit">Submit</button>
            </form>
        </div>
        </>
    );
    };

    export default ActivityForm;

    //add name attributes to input fields so we can attach it to the body of the post request
    //use the name properties to access the form data on the server
