import React from 'react';
import './Hero.css'; // Optional CSS

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-text">
        <p className="promo-text">Get 30% off on first enroll</p>
        <h1>Advance your engineering skills with us.</h1>
        <p>Build skills with our courses and mentor from world-class companies.</p>
        <div className="search-bar">
          <input type="text" placeholder="Search courses..." />
          <button className="search-btn">🔍</button>
        </div>
        <div className="features">
          <span>Flexible</span>
          <span>Learning path</span>
          <span>Community</span>
        </div>
      </div>
      <div className="hero-image">
        <img src="hero-image.png" alt="Mentor" />
      </div>
    </section>
  );
};

export default Hero;
