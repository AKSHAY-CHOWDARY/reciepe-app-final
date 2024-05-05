import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./CssFolder/AddReciepe.module.css";

function AddRecipe() {
  const { currentUser } = useSelector((state) => state.userLogin);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  // Axios with token
  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  // Form submit
  const addNewRecipe = async (data) => {
    data.reciepeId = Date.now();
    data.dateOfCreation = new Date();
    data.comments = [];
    data.username = currentUser.username;
    data.status = true;
    data.likes = [];

    try {
      const res = await axiosWithToken.post(
        "http://localhost:2000/user-api/new-reciepe",
        data
      );

      if (res.data.message === "NEW RECIEPE ADDED") {
        navigate("/reciepe-of-user");
      } else {
        console.log(res.data.message);
        setErr(res.data.message);
      }
    } catch (error) {
      console.error("Error adding new recipe:", error);
      setErr("Error adding new recipe");
    }
  };

  const [imageLink, setImageLink] = useState("");

  const handleChange = (event) => {
    setImageLink(event.target.value);
  };

  return (
    <div className={`create-form text-light ${styles.createform}`}>
      <h1 className="text-center">Add a New Recipe</h1>
      <div className="mt-2 p-5">
        <form
          className={`add-form w-75 mx-auto p-5 ${styles.addform}`}
          onSubmit={handleSubmit(addNewRecipe)}
        >
           <div className="form-group m-4">
            <label>Title:</label>
            <input
              type="text"
              className="form-control w-100"
              {...register("title", { required: true })}
            />
          </div>
          <div className="form-group m-4">
            <label htmlFor="cuisineSelect">Cuisine:</label>
            <select
              id="cuisineSelect"
              className="form-control w-100"
              {...register("cuisine", { required: true })}
            >
              <option value="">Select Cuisine</option>
              <option value="ITALIAN">Italian</option>
              <option value="MEXICAN">Mexican</option>
              <option value="INDIAN">Indian</option>
              <option value="CHINESE">Chinese</option>
              <option value="KOREAN">Korean</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="form-group m-4">
            <label>Content:</label>
            <textarea
              className="form-control w-100 h-50"
              {...register("content")}
            />
          </div>
          <div
            className="form-group m-4 justify-content-center
                     "
          >
            <label>Ingredients:</label>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Chicken"
                {...register("ingredients")}
              />{" "}
              Chicken
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Tomatoes"
                {...register("ingredients")}
              />{" "}
              Tomatoes
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Onions"
                {...register("ingredients")}
              />{" "}
              Onions
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Coriander"
                {...register("ingredients")}
              />{" "}
              Coriander
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Pepper"
                {...register("ingredients")}
              />{" "}
              Pepper
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Salt"
                {...register("ingredients")}
              />{" "}
              Salt
            </div>
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                name="ingredient"
                value="Oil"
                {...register("ingredients")}
              />{" "}
              Oil
            </div>
          </div>
          <div className="form-group m-4">
            <label>Time:</label>
            <input type="time" className="form-control" {...register("time")} />
          </div>
          <div className="form-group m-4">
          <div>
          <label>Enter image link:</label>
          <input type="text" value={imageLink} className="form-control w-100"   {...register("image")} onChange={handleChange}  />
           {imageLink && <img src={imageLink} alt="Icon" style={{ width: '50px', marginLeft: '15px' }} />}
        </div>
          </div>
          <button type="submit" className="btn btn-success m-4">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
