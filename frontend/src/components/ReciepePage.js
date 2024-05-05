// ReciepePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FcLike, FcAlarmClock } from "react-icons/fc";
import RecipePageCss from './CssFolder/ReciepePage.module.css';

function ReciepePage() {
  const { state } = useLocation();
  const [reciepeList, setReciepeList] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` }
  });

  const getReciepies = async () => {
    try {
      const res = await axiosWithToken.get(`http://localhost:2000/user-api/reciepe-by-cuisine/${state}`);
      if (res.data.message === 'reciepe by cuisine') {
        setReciepeList(res.data.payload);
      } else {
        setErr(res.data.message);
      }
    } catch (error) {
      console.error('Error fetching reciepes:', error);
    }
  };

  useEffect(() => {
    getReciepies();
  }, []);

  const readReciepeById = (reciepe) => {
    navigate(`../reciepe/${reciepe.reciepeId}`, { state: reciepe });
  };

  return (
    <div className={RecipePageCss.recepiePage}>
      {reciepeList.length === 0 ? (
        <h5 >No reciepes found</h5>
      ) : (
        <div className={RecipePageCss.flexbox}>
          {reciepeList.map(reciepe => (
            <div key={reciepe.reciepeId} className={RecipePageCss.foodCard} style={{ backgroundImage: `url(${reciepe.image})` }}>
              <div className={RecipePageCss.foodCardContent}>
                <div className={RecipePageCss.heading + ' ' + RecipePageCss.show}>
                  <h2>{reciepe.title}</h2>
                  <div className={RecipePageCss.shadow} />
                </div>
                <div className={RecipePageCss.heading + ' ' + RecipePageCss.author + ' ' + RecipePageCss.show}>
                  <h3>{reciepe.title}</h3>
                  <h5>
                    By{' '}
                    <a href="#profile" className={RecipePageCss.profile}>
                      {reciepe.username}
                    </a>
                  </h5>
                  <div className={RecipePageCss.shadow} />
                </div>
                <div className={RecipePageCss.hoverContent}>
                  <div className={RecipePageCss.foodCardProperties}>
                    <div>
                      <FcAlarmClock size={'3rem'}/>
                      <p className={RecipePageCss.fs3}>{reciepe.time}</p>
                    </div>
                    <div>
                      <FcLike size={'3rem'}/>
                      <p className={RecipePageCss.fs3}>{reciepe.likes.length}</p>
                    </div>
                  </div>
                  <hr />
                  <button onClick={() => readReciepeById(reciepe)} className={RecipePageCss.viewMore}>
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

export default ReciepePage;
