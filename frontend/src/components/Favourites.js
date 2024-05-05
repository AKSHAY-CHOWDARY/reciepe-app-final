import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcLike, FcAlarmClock } from "react-icons/fc";
import { useSelector } from 'react-redux';
import FavouritesCss from './CssFolder/Favourites.module.css';

function Favourites() {
    const { currentUser } = useSelector(state => state.userLogin);
    const [reciepeList, setReciepeList] = useState([]);
    const navigate = useNavigate();
    const [err, setErr] = useState('');

    const token = sessionStorage.getItem('token');
    const axiosWithToken = axios.create({
        headers: { Authorization: `Bearer ${token}` }
    });

    const getReciepies = async () => {
        try {
            const res = await axiosWithToken.get(`http://localhost:2000/user-api/fav-reciepes/${currentUser.username}`);
            if (res.data.message === 'favourite reciepes') {
                setReciepeList(res.data.payload);
            } else {
                setErr(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getReciepies();
    }, []);

    const readReciepeById = (reciepe) => {
        navigate(`../reciepe/${reciepe.reciepeId}`, { state: reciepe });
    }

    return (
        <div className={FavouritesCss.recepiePage}>
            {reciepeList.length === 0 ? (
                 <h5 className='text-danger'>No recipes found</h5>
            ) : (
                <div className={FavouritesCss.flexbox}>
                    {reciepeList.map(reciepe => (
                        <div key={reciepe.reciepeId} className={FavouritesCss.foodCard} style={{ backgroundImage: `url(${reciepe.image})` }}>
                            <div className={FavouritesCss.foodCardContent}>
                                <div className={`${FavouritesCss.heading} ${FavouritesCss.show}`}>
                                    <h2>{reciepe.title}</h2>
                                    <div className={FavouritesCss.shadow} />
                                </div>
                                <div className={`${FavouritesCss.heading} ${FavouritesCss.author} ${FavouritesCss.show}`}>
                                <h3>{reciepe.title}</h3>
                                    <h5>
                                        By{' '}
                                        <a href="#profile" className={FavouritesCss.profile}>
                                            {reciepe.username}
                                        </a>
                                    </h5>
                                    <div className={FavouritesCss.shadow} />
                                </div>
                                <div className={FavouritesCss.hoverContent}>
                                    <div className={FavouritesCss.foodCardProperties}>
                                        <div>
                                            <FcAlarmClock size={'3rem'} />
                                            <p className='fs-3'>{reciepe.time}</p>
                                        </div>
                                        <div>
                                            <FcLike size={'3rem'} />
                                            <p className='fs-3'>{reciepe.likes.length}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <button onClick={() => readReciepeById(reciepe)} className={FavouritesCss.viewMore}>
                                        View More-&gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Favourites;
