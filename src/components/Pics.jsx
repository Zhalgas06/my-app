import React from 'react';
import like4 from '../img/like4.png';


const Pics = (data)=>{
    const {photo} = data;

    return <div className="photo" >
        <a href="#" target="_blank">
            <img src={photo.urls.small}></img>
        </a>
        <div className="photo__author">
            <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">
                <img src={photo.user.profile_image.small}/>
                <p>{photo.user.name}</p>
            </a>
        </div>
        <div className="photo__rate">
            <img src={like4}/>
            <p>{photo.likes} likes</p>
        </div>
    </div>
};

export default Pics;