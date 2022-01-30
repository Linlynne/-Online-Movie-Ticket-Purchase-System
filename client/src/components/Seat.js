import React,{ useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
import '../App.css';


function Seat(props) {

    const [selected, setSelected] = useState(false);
    const [color, setColor] = useState('bg-success');
    const [title, setTitle] = useState('');

    const compareTitle = (value)=>{
        return value!=title;

    }; 

    const handleClick = (title) => {
        setTitle(title);
        var selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if(!selectedSeats){
            selectedSeats = [];
        }
        
        if(!selected){
            setSelected(true);
            setColor('bg-danger');
            selectedSeats = [...selectedSeats, title];
            //localStorage.setItem('bookingSeats', JSON.stringify(selectedSeats));
            //props.handleClickSeat(String[quantity]);
        }else{
            setSelected(false);
            setColor('bg-success');
            selectedSeats = selectedSeats.filter(value=>value!==title);
            //localStorage.setItem('bookingSeats', JSON.stringify(selectedSeats));
        }
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
        props.handleClickSeat();
    };

    return (
        <div className={"sm-4 m-1 border cursor-pointer seat " + color} onClick={()=>handleClick(props.title)}>
            {props.title}
        </div>

    );
}


export default Seat;