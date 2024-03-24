import React from "react";
import contact from "../components/ContactPage/images/Contact.png";

const ContactPage = () => {
  return (
    <div className="contact-container">
      
      <div className="image-container">
        <img src={contact} alt="pic" />
      </div>
    </div>
  );
};

export default ContactPage;
