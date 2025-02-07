import React, { useState, useEffect } from "react";
import "../styles/Slideshow.css";

const images = [
  "/src/assets/Greenbay-Banner-Images-3-2.jpg",
  "/src/assets/Greenbay-Banner-Images-2-3.jpg",
  "/src/assets/Greenbay-Banner-Images-1-1.jpg"
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-transition every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      {/* Left Arrow */}
      <button className="arrow left" onClick={prevSlide}>&#10094;</button>

      {/* Image Display */}
      <img src={images[currentIndex]} alt="Slideshow" className="slide-image" />

      {/* Right Arrow */}
      <button className="arrow right" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default Slideshow;