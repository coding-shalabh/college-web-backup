import Image from "next/image";

import img from "@/images/about/contact.jpg";
import { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ContactForm = ({ gap }) => {

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });
  const [formSubmitText, setFromSubmitText] = useState(false);

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  useEffect(()=> {
    if(formSubmitText=== true){

      setTimeout(()=> {
        setFromSubmitText(false);
      }, 5000)
    }
  }, [formSubmitText])

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Construct the email body
    const emailData = {
      to: "abhishek23350@gmail.com",
      subject: "Request Callback Form",
      html: renderToStaticMarkup(
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid black' }}>
        <thead>
            <tr>
                <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2' }}>Field</th>
                <th style={{ border: '1px solid black', padding: '8px', background: '#f2f2f2' }}>Value</th>
            </tr>
        </thead>
        <tbody>
            {Object.entries(formData).map(([key, value]) => (
                <tr key={key}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
                </tr>
            ))}
        </tbody>
    </table>
      )
    };

    // Send the email
    const response = await fetch("https://api.gined.in/api/email/", { // Change this endpoint to your email API endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (response.ok) {
      console.log("Email sent successfully");
      setFormData({
        name: "",
        phoneNumber: "",
      })
      setFromSubmitText(true);
      // Optionally reset form or set success message
    } else {
      console.error("Failed to send email");
      // Optionally set error message
    }
  };


  return (
    <>
      <div className={`rbt-contact-address ${gap}`}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="thumbnail">
                <Image
                  className="w-10 radius-6"
                  src={img}
                  alt="Contact Images"
                  style={{width: '75%'}}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="rbt-contact-form contact-form-style-1 max-width-auto">
                <div className="section-title text-start">
                  <span className="subtitle bg-primary-opacity">
                    EDUCATION FOR EVERYONE
                  </span>
                </div>
                <h3 className="title">
                  Having Doubts ? Need Guidance, Contact us. 
                </h3>
                <form onSubmit={handleSubmit} className="newsletter-form-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Your PhoneNumber"
                  style={{marginTop: 20}}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                  <div className="form-submit-group" style={{marginTop: 20}}>
                  <button
                  style={{marginTop: 20}}
                  type="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse"
                >
                      <span className="icon-reverse-wrapper">
                        <span className="btn-text">Request Callback</span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                        <span className="btn-icon">
                          <i className="feather-arrow-right"></i>
                        </span>
                      </span>
                    </button>
                  </div>
                </form>
                <span className="note-text color-black mt--20" style={{display: formSubmitText ? 'block' : 'none'}}>Your form has been submitted successfully, our team will get back to you shortly.</span>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
