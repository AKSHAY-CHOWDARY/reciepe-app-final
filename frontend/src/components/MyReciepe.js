import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcLike, FcAlarmClock } from "react-icons/fc";
import { useSelector } from 'react-redux';
import styles from "./CssFolder/Favourites.module.css"; // Import CSS module

function MyReciepe() {
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
            const res = await axiosWithToken.get(`http://localhost:2000/user-api/reciepe/${currentUser.username}`);
            if (res.data.message === 'user reciepes') {
                setReciepeList(res.data.payload);
            } else {
                setErr(res.data.message);
            }
        } catch (error) {
            console.log(error);
            setErr('Error fetching recipes');
        }
    }

    useEffect(() => {
        getReciepies();
    }, []);

    const readReciepeById = (reciepe) => {
        navigate(`../reciepe/${reciepe.reciepeId}`, { state: reciepe });
    }

    return (
        <div className={styles.recepiepage}>
            {reciepeList.length === 0 ? (
                <h5 className='text-danger'>No recipes found</h5>
            ) : (
                <div className={`flexbox ${styles.flexbox}`}>
                    {reciepeList.map(reciepe => (
                        <div key={reciepe.reciepeId} className={`${styles.foodCard} food-card`} style={{ backgroundImage: `url(${reciepe.image})` }}>
                            <div className={`${styles.foodCardContent} food-card-content`}>
                                <div className={`heading show ${styles.show}`}>
                                    <h2>{reciepe.title}</h2>
                                    <div className="shadow" />
                                </div>
                                <div className={`heading author show ${styles.show}`}>
                                <h3>{reciepe.title}</h3>
                                    <h5>
                                        By{' '}
                                        <a href="#profile" className="profile">
                                            {reciepe.username}
                                        </a>
                                    </h5>
                                    <div className="shadow" />
                                </div>
                                <div className={`hover-content ${styles.hoverContent}`}>
                                    <div className={`${styles.foodCardProperties} food-card-properties`}>
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
                                    <button onClick={() => readReciepeById(reciepe)} className={`${styles.viewMore} view-more`}>
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

export default MyReciepe;
