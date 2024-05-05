import React, { useState ,useEffect} from "react";
import styles from "./CssFolder/Reciepe.module.css"; // Import CSS module
import { useLocation } from "react-router-dom";
import { LiaCommentSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { FcLike } from "react-icons/fc";

function RecipeCard() {
  const { state } = useLocation();
  const { register, handleSubmit } = useForm();
  const { currentUser } = useSelector((state) => state.userLogin);
  let [commentStatus, setCommentStatus] = useState("");
  let [err, setErr] = useState("");
  const token = sessionStorage.getItem("token");
  const axiosWithToken = axios.create({
    headers: { Authorization: `Bearer ${token}` },
  });

  const addComment = async (comment) => {
    comment.username = currentUser.username;
    let res = await axiosWithToken.post(
      `http://localhost:2000/user-api/comments/${state.reciepeId}`,
      comment
    );
    if (res.data.message === "comment added") {
      setCommentStatus(res.data.message);
    } else {
      setErr(res.data.message);
    }
    console.log(comment);
  };

  const [conversionType, setConversionType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const conversions = {
    tablespoonToTeaspoon: (value) => value * 3, // 1 tablespoon = 3 teaspoons
    teaspoonToTablespoon: (value) => value / 3, // 1 teaspoon = 1/3 tablespoon
    cupToMilliliters: (value) => value * 236.588, // 1 cup = 236.588 milliliters
    millilitersToCup: (value) => value / 236.588, // 1 milliliter = 1/236.588 cup
    fahrenheitToCelsius: (value) => ((value - 32) * 5) / 9, // Fahrenheit to Celsius conversion formula
    celsiusToFahrenheit: (value) => (value * 9) / 5 + 32, // Celsius to Fahrenheit conversion formula
    poundsToKilograms: (value) => value * 0.453592, // 1 pound = 0.453592 kilograms
    kilogramsToPounds: (value) => value / 0.453592, // 1 kilogram = 2.20462 pounds
    ouncesToGrams: (value) => value * 28.3495, // 1 ounce = 28.3495 grams
    gramsToOunces: (value) => value / 28.3495, // 1 gram = 0.035274 ounces
    litersToQuarts: (value) => value * 1.05669, // 1 liter = 1.05669 quarts
    quartsToLiters: (value) => value / 1.05669, // 1 quart = 0.946353 liters
    gallonsToLiters: (value) => value * 3.78541, // 1 gallon = 3.78541 liters
    litersToGallons: (value) => value / 3.78541, // 1 liter = 0.264172 gallons
    tablespoonsToMilliliters: (value) => value * 14.7868, // 1 tablespoon = 14.7868 milliliters
    millilitersToTablespoons: (value) => value / 14.7868, // 1 milliliter = 0.067628 tablespoons
  };

  const handleConvert = () => {
    if (!isNaN(inputValue)) {
      const result = conversions[conversionType](parseFloat(inputValue));
      setResult(
        `${inputValue} ${getUnitName(
          conversionType,
          inputValue
        )} = ${result.toFixed(2)} ${getTargetUnitName(conversionType, result)}`
      );
    } else {
      setResult("Invalid input value!");
    }
  };

  const getUnitName = (conversionType, value) => {
    // Implement getUnitName logic
    // Since this logic is specific to each conversion type,
    // you can create a map object to store the unit names for each conversion type
    const unitNames = {
      tablespoonToTeaspoon: value === 1 ? "tablespoon" : "tablespoons",
      teaspoonToTablespoon: value === 1 ? "teaspoon" : "teaspoons",
      cupToMilliliters: value === 1 ? "cup" : "cups",
      millilitersToCup: value === 1 ? "milliliter" : "milliliters",
      fahrenheitToCelsius: value === 1 ? "degree" : "degrees",
      celsiusToFahrenheit: value === 1 ? "degree" : "degrees",
      poundsToKilograms: value === 1 ? "pound" : "pounds",
      kilogramsToPounds: value === 1 ? "kilogram" : "kilograms",
      ouncesToGrams: value === 1 ? "ounce" : "ounces",
      gramsToOunces: value === 1 ? "gram" : "grams",
      litersToQuarts: value === 1 ? "liter" : "liters",
      quartsToLiters: value === 1 ? "quart" : "quarts",
      gallonsToLiters: value === 1 ? "gallon" : "gallons",
      litersToGallons: value === 1 ? "liter" : "liters",
      tablespoonsToMilliliters: value === 1 ? "tablespoon" : "tablespoons",
      millilitersToTablespoons: value === 1 ? "milliliter" : "milliliters",
    };

    return unitNames[conversionType] || "";
  };

  const getTargetUnitName = (conversionType, result) => {
    // Implement getTargetUnitName logic
    // Since this logic is specific to each conversion type,
    // you can create a map object to store the target unit names for each conversion type
    const targetUnitNames = {
      tablespoonToTeaspoon: result === 1 ? "teaspoon" : "teaspoons",
      teaspoonToTablespoon: result === 1 ? "tablespoon" : "tablespoons",
      cupToMilliliters: result === 1 ? "milliliter" : "milliliters",
      millilitersToCup: result === 1 ? "cup" : "cups",
      fahrenheitToCelsius: result === 1 ? "Celsius" : "Celsius",
      celsiusToFahrenheit: result === 1 ? "Fahrenheit" : "Fahrenheit",
      poundsToKilograms: result === 1 ? "kilogram" : "kilograms",
      kilogramsToPounds: result === 1 ? "pound" : "pounds",
      ouncesToGrams: result === 1 ? "gram" : "grams",
      gramsToOunces: result === 1 ? "ounce" : "ounces",
      litersToQuarts: result === 1 ? "quart" : "quarts",
      quartsToLiters: result === 1 ? "liter" : "liters",
      gallonsToLiters: result === 1 ? "liter" : "liters",
      litersToGallons: result === 1 ? "gallon" : "gallons",
      tablespoonsToMilliliters: result === 1 ? "milliliter" : "milliliters",
      millilitersToTablespoons: result === 1 ? "tablespoon" : "tablespoons",
    };

    return targetUnitNames[conversionType] || "";
  };

  let [likeStatus,setLikeStatus]=useState(false);

  const likestat=async()=>{
    try{
      const requestData = {
        username: currentUser.username,
    };
    const res = await axiosWithToken.post(
      `http://localhost:2000/user-api/likestatus/${state.reciepeId}`,requestData
    );
    console.log(res);
    if (res.data.message === "already liked") {
      setLikeStatus(true);
    } else {
      setLikeStatus(false);
    }
    }catch (error) {
      console.log(error);
    }
  }
  const Like = async () => {
    try {
      const requestData = {
          username: currentUser.username,
      };
      const res = await axiosWithToken.post(
        `http://localhost:2000/user-api/like/${state.reciepeId}`,requestData
      );
      console.log(res);

      if (res.data.message === "liked") {
        setLikeStatus(true);
      } else {
        setLikeStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    likestat();
  },[])

  return (
    <div className={styles["recipe-card"]}>
         <div className={styles["recipe-card__image"]} style={{ backgroundImage: `url(${state.image})` }}>
  <button className={styles.heart} onClick={Like}>  
    {likeStatus ? (
      <>
         <FcLike size={'2.5rem'}  />
      </>
    ) : (
      <>
          <FaRegHeart size={'2.5rem'} />
          
      </>
    )}
  </button>
</div>

      <div className={styles["recipe-card__body"]}>
        <h1 className={styles["recipe-card__heading"]}>{state.title}</h1>
        
        <ul className={styles["recipe-card__nav"]}>
          <li>
            <h3 className="active">Ingredients</h3>
          </li>
        </ul>

        <div>
            {
                state.ingredients.map(ingredient=>(
                    <ul className={styles["recipe-card__ingredients"]}>
                        <li>{ingredient}</li>
                    </ul>
                ))
            }
        </div>
        <p>{state.content}</p>
      </div>
      <div className={styles.converter}>
        <div>
          <select
            id="conversionType"
            value={conversionType}
            onChange={(e) => setConversionType(e.target.value)}
          >
            <option value="">Select Conversion Type</option>
            <option value="tablespoonToTeaspoon">Tablespoon to Teaspoon</option>
            <option value="teaspoonToTablespoon">Teaspoon to Tablespoon</option>
            <option value="cupToMilliliters">Cup to Milliliters</option>
            <option value="millilitersToCup">Milliliters to Cup</option>
            <option value="fahrenheitToCelsius">Fahrenheit to Celsius</option>
            <option value="celsiusToFahrenheit">Celsius to Fahrenheit</option>
            <option value="poundsToKilograms">Pounds to Kilograms</option>
            <option value="kilogramsToPounds">Kilograms to Pounds</option>
            <option value="ouncesToGrams">Ounces to Grams</option>
            <option value="gramsToOunces">Grams to Ounces</option>
            <option value="litersToQuarts">Liters to Quarts</option>
            <option value="quartsToLiters">Quarts to Liters</option>
            <option value="gallonsToLiters">Gallons to Liters</option>
            <option value="litersToGallons">Liters to Gallons</option>
            <option value="tablespoonsToMilliliters">
              Tablespoons to Milliliters
            </option>
            <option value="millilitersToTablespoons">
              Milliliters to Tablespoons
            </option>
          </select>
        </div>
        <div>
          <input
            type="number"
            id="inputValue"
            placeholder="Enter value to convert"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button id="convertBtn" onClick={handleConvert}>
            Convert
          </button>
        </div>
        <div id="result">{result}</div>
      </div>
       {/* User comments */}
       <div className='container mt-5 mb-5'>
                <p className='fs-3'>COMMENTS</p>
                {state.comments.length === 0 ? (
                    <p className='lead'>No comments</p>
                ) : (
                    state.comments.map((comment) => {
                        return (
                            <div className='mt-3'>
                                <p className='text-warning'><LiaCommentSolid /><span className='ms-3'>{comment.username}</span></p>
                                <p className='lead ms-3'>{comment.comment}</p>
                            </div>
                        );
                    })
                )}
            </div>
            <h3>{commentStatus}</h3>
            <form onSubmit={handleSubmit(addComment)}>
                <label className='form-control-label mb-3' htmlFor="comment"></label>
                <input placeholder='Write a comment' id='comment' type='text' className='mb-3 form-control' {...register("comment")} />
                <button type='submit' className='btn btn-success'>post</button>
            </form>
    </div>
  );
}

export default RecipeCard;

