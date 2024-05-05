// Carousel.js
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from '../images/image1.jpg';
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import styles from './CssFolder/Carousel.module.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

function MyCarousel() {
  const navigate=useNavigate()
  return (
    <Carousel> {/* Set the interval for automatic sliding */}
      <Carousel.Item>
        <img className='w-100' src={image1} alt="First slide" />
     
          <Carousel.Caption className={styles.centered}>
            <h3>MEXICAN</h3>
            <p>Experience the vibrant flavors of Mexico in every bite</p>
            <button onClick={()=>{navigate('/reciepes-page',{state:"MEXICAN"})}} className='btn btn-warning'>MEXICAN</button>
          </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='w-100' src={image2} alt="Second slide" />
        
          <Carousel.Caption className={styles.centered}>
            <h3>INDIAN</h3>
            <p>Savor the rich spices and aromas of authentic Indian dishes</p>
            <button onClick={()=>{navigate('/reciepes-page',{state:"INDIAN"})}} className='btn btn-warning'>INDIAN</button>
          </Carousel.Caption>
   
      </Carousel.Item>
      <Carousel.Item>
        <img className='w-100' src={image3} alt="Third slide" />
          <Carousel.Caption className={styles.centered}>
            <h3>CHINESE</h3>
            <p>Indulge in the diverse tastes and textures of traditional Chinese cooking</p>
            <button onClick={()=>{navigate('/reciepes-page',{state:"CHINESE"})}} className='btn btn-warning'>CHINESE</button>
          </Carousel.Caption>
        
      </Carousel.Item>
      <Carousel.Item>
        <img className='w-100' src={image4} alt="Fourth slide" />
          <Carousel.Caption className={styles.centered}>
            <h3>ITALIAN</h3>
            <p>Discover the passion and simplicity of classic Italian recipes</p>
            <button onClick={()=>{navigate('/reciepes-page',{state:"ITALIAN"})}} className='btn btn-warning'>ITALIAN</button>
          </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
