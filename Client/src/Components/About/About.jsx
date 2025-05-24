import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Me</h2>
        <p>
          Hi, I'm Ritesh, a passionate web developer with a keen interest in creating
          intuitive and efficient user experiences. I love exploring new technologies,
          solving problems, and contributing to meaningful projects.
        </p>

        <div className="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        <footer className="about-footer">
          Made with ❤️ by Ritesh
        </footer>
      </div>
    </section>
  );
};

export default About;
