import PHOTOS from '../api/PHOTOS';
import React, {useState, useEffect} from 'react';
import {Formik, Form, Field} from 'formik';
import Pics from './Pics';
import icon from '../img/photo.png';

const Header = ()=>{
    const [searchValue,setSearchValue] = useState(null);
    let page = 1;
    const division = 3;
    const [topics, setTopics] = useState(null);
    const [firstSet, setFirst] = useState(null);
    const [secondSet, setSecond] = useState(null);
    const [thirdSet, setThird] = useState(null);

    useEffect(()=>{
        let getPhotos = async()=>{
            let data = await PHOTOS.getRandomPhotos();
            setFirst(data.data.slice(0,data.data.length/division));
            setSecond(data.data.slice(data.data.length/division,data.data.length/division*2));
            setThird(data.data.slice(data.data.length/division*2));
        };
        getPhotos();
    },[]);

    useEffect(()=>{
        let getTopics = async()=>{
            let data = await PHOTOS.getTopics();
            setTopics(data.data);
        };
        getTopics();
    },[]);

    let searchPhotos = async(value,picNum)=>{
        let data = await PHOTOS.getPhotos(value,picNum);
        setFirst(data.data.results.slice(0,data.data.results.length/division));
        setSecond(data.data.results.slice(data.data.results.length/division,data.data.results.length/division*2));
        setThird(data.data.results.slice(data.data.results.length/division*2));
    };

    let changeDisplay = ()=>{
        let elem = document.getElementById("topics");

        if(elem.style.display=="none")
            elem.style.display = "flex";
        else
            elem.style.display = "none";
    };

    let validate = (text)=>{
        let elem = document.getElementById("input");
        if(/\w+/.test(text)){
            setSearchValue(text);
            elem.style.backgroundColor="white";
            searchPhotos(text);
        }
        else{
            elem.style.backgroundColor="#fb8989";
            elem.animate([
                {transform: "translate(1px, 1px) rotate(0deg)"},
                {transform: "translate(-1px, -2px) rotate(-1deg)"},
                {transform: "translate(-3px, 0px) rotate(1deg)"},
                {transform: "translate(3px, 2px) rotate(0deg)"},
                {transform: "translate(1px, -1px) rotate(1deg)"},
                {transform: "translate(-1px, 2px) rotate(-1deg)"},
                {transform: "translate(-3px, 1px) rotate(0deg)"},
                {transform: "translate(-1px, -1px) rotate(1deg)"},
                {transform: "translate(1px, 2px) rotate(0deg)"},
                {transform: "translate(1px, -2px) rotate(-1deg)"}
            ],{
                duration: 500
            });
        }
    }

    return <div className="main">
        <div className="header">
            <img className="icon" src={icon} alt="icon"/>
            <p>PhotoPoto</p>
            <Formik
                initialValues={{
                    photo: '',
                }}
                onSubmit={(value)=>validate(value.photo)}
                >
                <Form>
                    <Field id="input" name="photo" placeholder="Find the perfect Image"></Field>
                    <button type="submit">
                    </button>
                </Form>
            </Formik>
            <button onClick={()=>changeDisplay()}>Topics</button>
        </div>

        <div id="topics">
            {!!topics && topics.map((value)=>{
                return<button onClick={()=>searchPhotos(value.title)}>{value.title}</button>
            })}
        </div>

        <div className="result">
            <div className="result__row">
                {!!firstSet && firstSet.map((value)=>{
                    return <Pics photo={value}></Pics>
                })}
            </div>
            <div className="result__row">
                {!!secondSet && secondSet.map((value)=>{
                    return <Pics photo={value}></Pics>
                })}
            </div>
            <div className="result__row">
                {!!thirdSet && thirdSet.map((value)=>{
                    return <Pics photo={value}></Pics>
                })}
            </div>
        </div>
        <div className="buttons">
            <button onClick={()=>{
                if(page!=1)
                    page--;
                if(searchValue != null)
                    searchPhotos(searchValue,page);
            }}></button>
            <button onClick={()=>{
                page++;
                if(searchValue != null)
                    searchPhotos(searchValue,page);
            }}></button>
        </div>
    </div>
}

export default Header;