import React from "react";
import { Link } from 'react-router-dom';



function Dashboard() {
    return (
        <div className="d-grid gap-2 col-4 mx-auto mt-6">
            <br /><Link className="btn btn-primary" to="/admin/create_movie">Add Movie</Link>
            <Link className="btn btn-primary" to="/admin/movie_list">Movie List</Link>
            <Link className="btn btn-primary" to="/admin/schedule_list">Schedule List</Link>
            <Link className="btn btn-primary" to="/admin/user_list">User List</Link>
            <Link className="btn btn-primary" to="/admin/upload">Upload Image</Link>
        </div>
    );
}


export default Dashboard;


