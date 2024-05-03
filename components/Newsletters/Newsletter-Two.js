import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import NewsletterData from "../../data/elements/newsletter.json";
import { renderToStaticMarkup } from "react-dom/server";

const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <p>Loading...</p>, // Display loading text instead of 0
});

const NewsletterTwo = () => {
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
    <div className="container">
      <div className="row row--15 align-items-center">
        <div className="col-lg-12">
          {NewsletterData && NewsletterData.newsletterTwo.map((data, index) => (
            <div className="inner text-center" key={index}>
              <div className="section-title text-center">
                <span className="subtitle bg-white-opacity">{data.subTitle}</span>
                <h2 className="title color-white"><strong>{data.strong}</strong> {data.title}</h2>
                <p className="description color-white mt--20">{data.desc}</p>
              </div>
              <form onSubmit={handleSubmit} className="newsletter-form-2 mt--40">
                <input style={{background: 'white'}}
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                style={{background: 'white', marginTop: 20}}
                  type="tel"
                  name="phoneNumber"
                  placeholder="Enter Your PhoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                />
                <button
                  style={{marginTop: 20}}
                  type="submit"
                  className="rbt-btn btn-md btn-gradient hover-icon-reverse"
                >
                  <span className="icon-reverse-wrapper">
                    <span className="btn-text">Request Callback</span>
                    <span className="btn-icon"><i className="feather-arrow-right"></i></span>
                    <span className="btn-icon"><i className="feather-arrow-right"></i></span>
                  </span>
                </button>
              </form>
              <span className="note-text color-white mt--20">{data.text}</span>
              <span className="note-text color-white mt--20" style={{display: formSubmitText ? 'block' : 'none'}}>Your form has been submitted successfully, our team will get back to you shortly.</span>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsletterTwo;
