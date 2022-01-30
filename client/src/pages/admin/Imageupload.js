import React, { useState } from "react";
import axios from "axios";
import { apiData }  from '../../Api/ApiData'
import { useNavigate } from 'react-router-dom';


function Imageupload() {

    const [imageSelected, setImageSelected] = useState('');

    const navigate = useNavigate();

    const uploadImage = () => {
        const formData = new FormData();
        formData.append('file', imageSelected);
        formData.append('upload_preset', apiData[0].repoName);
        axios.post(apiData[1].uploadURL, formData).then((response) => {
            console.log(response);
            navigate('/admin/create_movie');
        }).catch(error => {
            console.log(error.response);
        });;
    };



    return (
        <div className="form-signin mt-5">
            <input className="form-control" type="file" onChange={(event) => { setImageSelected(event.target.files[0]) }} />
            <button className="w-100 btn btn-lg btn-primary mt-5" onClick={uploadImage}>upload Image</button>
        </div>
    );
}



export default Imageupload;