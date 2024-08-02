import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, faClinicMedical, faHeartbeat, faAmbulance, faUserMd, faShieldVirus } from '@fortawesome/free-solid-svg-icons';

const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const items = [
    {
      title: "Medical Outreach",
      content: "Medical outreach programs play a crucial role in extending healthcare services to underserved and remote communities. These initiatives aim to bridge the healthcare gap by providing essential medical care, education, and resources to populations that may not have regular access to health facilities. Through mobile clinics, health camps, and community health worker engagements, medical outreach efforts address pressing health needs, promote disease prevention, and foster healthier communities.",
      icon: faStethoscope
    },
    {
      title: "Community Health",
      content: "Community health programs are designed to improve the health and well-being of local populations. These programs often involve health education, screenings, vaccinations, and initiatives to promote healthy living. Community health workers play a vital role in these programs by providing personalized care and health education within their communities.",
      icon: faClinicMedical
    },
    {
      title: "Health Camps",
      content: "Health camps provide temporary medical facilities in underserved areas, offering free health check-ups, treatments, and health education to the local population. These camps are often organized by healthcare professionals and volunteers, and they help in early detection of diseases and provide immediate medical assistance.",
      icon: faHeartbeat
    },
    {
      title: "Mobile Clinics",
      content: "Mobile clinics are vehicles equipped with medical equipment and staffed by healthcare professionals that travel to remote and underserved areas to provide medical services. These clinics bring essential healthcare services to populations that lack access to permanent medical facilities, including primary care, dental care, and preventive services.",
      icon: faAmbulance
    },
    {
      title: "Health Education",
      content: "Health education programs aim to inform and educate individuals and communities about health issues, preventive measures, and healthy practices. These programs often cover topics such as nutrition, physical activity, disease prevention, and mental health. Health education empowers people to take control of their health and make informed decisions.",
      icon: faUserMd
    }
  ];

  return (
    <div className="arcodionx">
      {items.map((item, index) => (
        <div key={index} className="paragraphs">
          <div className="accordion-header" onClick={() => handleToggle(index)}>
            <div className="paragraphs-vision">
              <span>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <h3>{item.title}</h3>
            </div>
          </div>
          {activeIndex === index && (
            <div className="accordion-content">
              <div className="media-div-full">
                <i className="far fa-lightbulb"></i>
                <p>{item.content}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
