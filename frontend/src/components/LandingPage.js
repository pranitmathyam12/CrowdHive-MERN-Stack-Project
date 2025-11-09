import React, { useState } from "react";
import "./LandingPage.css"; // Import the CSS file for styling
//import bgiamge from "./assets/aboutusbg.jpg";
import logo from "./assets/logo.png";

const LandingPage = () => {
  // State for toggling FAQ answers
  const [faqOpen, setFaqOpen] = useState([false, false, false]);

  // Function to toggle specific FAQ
  const toggleFAQ = (index) => {
    const newFaqState = faqOpen.map((item, i) => (i === index ? !item : item));
    setFaqOpen(newFaqState);
  };

  return (
    <div className="landing-page">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="CrowdHive Logo" />
        </div>
        <div className="navbarbuttons">
          <a href="/login">
            <button className="navbarbutton loginbutton">Login</button>
          </a>
          <a href="/register">
            <button className="navbarbutton registerbutton">Register</button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <div>
        <section className="hero-section">
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Event Experience"
            />
          </div>
          <div className="hero-content">
            <h1 className="white">
              Welcome to the Ultimate College Event Experience
            </h1>
            <p>
              Unleash your creativity, connect with like-minded individuals, and
              make memories that will last a lifetime.
            </p>
            <a className="none" href="/login">
              <button className="cta-button">Get Started</button>
            </a>
          </div>
        </section>
      </div>

      <div className="bg">
        <div className="about-us-container">
          <h1 className="about-us-title">About Us</h1>
          <p className="about-us-description">
            Welcome to our College Event Management website! We are a dedicated
            team of students passionate about creating unforgettable experiences
            for our fellow classmates. Our mission is to organize, promote, and
            execute events that foster community engagement, learning, and fun.
            From academic conferences and workshops to social gatherings and
            cultural celebrations, we strive to make every event unique and
            enjoyable.
            <br />
            <br />
            Our team is composed of individuals with diverse skills and
            backgrounds, working collaboratively to ensure each event runs
            smoothly from start to finish. We believe in the power of teamwork,
            creativity, and organization to bring our ideas to life and cater to
            the interests of our college community. Thank you for being a part
            of our journey, and we look forward to seeing you at our next event!
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>FAQ</h2>

        {/* FAQ Item 1 */}
        <div className="faq-item" onClick={() => toggleFAQ(0)}>
          <div className="faq-question">
            <h3>How do I register for the event?</h3>
            <span>{faqOpen[0] ? "-" : "+"}</span>
          </div>
          {faqOpen[0] && (
            <div className="faq-answer">
              <p>
                To register for the event, simply visit our website and click on
                the 'Register Now' button. Fill out the registration form with
                your personal details and select the events you wish to
                participate in. Once you have completed the form, proceed to the
                payment page to complete your registration.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 2 */}
        <div className="faq-item" onClick={() => toggleFAQ(1)}>
          <div className="faq-question">
            <h3>Can I transfer my registration to someone else?</h3>
            <span>{faqOpen[1] ? "-" : "+"}</span>
          </div>
          {faqOpen[1] && (
            <div className="faq-answer">
              <p>
                Yes, you can transfer your registration to someone else. Please
                contact our support team with the details of the person you wish
                to transfer your registration to. A transfer fee of $20 will
                apply.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Item 3 */}
        <div className="faq-item" onClick={() => toggleFAQ(2)}>
          <div className="faq-question">
            <h3>Will there be on-site registration?</h3>
            <span>{faqOpen[2] ? "-" : "+"}</span>
          </div>
          {faqOpen[2] && (
            <div className="faq-answer">
              <p>
                No, we do not offer on-site registration. All participants must
                register online before the event. This allows us to better
                manage the event logistics and ensure a smooth registration
                process for all attendees.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
