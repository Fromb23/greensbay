import React, { useState, useEffect } from "react";
import "../styles/Slideshow.css";

const slides = [
  {
    image: "/src/assets/Greenbay-Banner-Images-3-2.jpg",
    title: "Convenient For You",
    motto: "Take the Hustle Out of Buying & Selling Pre-Owned Appliances",
    paragraph: "Fair prices & free delivery in Nairobi( with affordable delivery across Kenya), and excellent offer sale service."
  },
  {
    image: "/src/assets/Greenbay-Banner-Images-2-3.jpg",
    title: "Trusted And Trustworthy",
    motto: "No Hassle, No Scams",
    paragraph: "All items are tested & certified & backed by a 1-yr warranty."
  },
  {
    image: "/src/assets/Greenbay-Banner-Images-1-1.jpg",
    title: "Upgrade Your Life",
    motto: "With Trusted Home Appliances and Clean Energy",
    paragraph: "Our verified second hand life appliances are More affordable, while providing quality long-lasting solutions."
  }
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  // Auto-transition every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slideshow">
      {/* Left Arrow */}
      <button className="arrow left" onClick={prevSlide}>&#10094;</button>

      {/* Image Display with Text Overlay */}
      <div className="slide-container">
        <img src={slides[currentIndex].image} alt="Slideshow" className="slide-image" />
        <div className="text-overlay">
          <h2 className="slide-title">{slides[currentIndex].title}</h2>
          <h4 className="slide-motto">{slides[currentIndex].motto}</h4>
          <p className="slide-paragraph">{slides[currentIndex].paragraph}</p>
        </div>
      </div>

      {/* Right Arrow */}
      <button className="arrow right" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default Slideshow;