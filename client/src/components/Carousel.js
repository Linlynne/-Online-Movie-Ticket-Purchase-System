import React, { useState } from "react";
import { images } from '../helpers/CarouselData'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


function Carousel(){

    const [currImg, setCurrImg] = useState(0);


    return (
        <div className="carousel" >
            <div className="carouselInner" style={{backgroundImage: `url(${images[currImg].img})`}}>
                <div className="left" onClick={() => {(currImg === 0) ? setCurrImg(2) : setCurrImg(currImg - 1)}}><ArrowBackIosNewIcon /></div>
                <div className="center"></div>
                <div className="right" onClick={() => {(currImg === images.length - 1) ? setCurrImg(0) : setCurrImg(currImg + 1)}}><ArrowForwardIosIcon /></div>
            </div>
        </div>
    );
}



export default Carousel;