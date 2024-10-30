import Modal from "./edtForms";
import { useState } from "react";

export default function UserSettigns() {
    const [activeModal, setActiveModal] = useState(null);

    const openModal = (modalType) => {
        setActiveModal(modalType);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    const handleFormSubmit = (e, modalType) => {
        e.preventDefault();
        // Handle form submission based on the modal type (e.g., profile update, password change)
        console.log(`Submitting form for ${modalType}`);

        // Close the modal after submission
        closeModal();
    };
    return (
        <>
            <div className="user-image-and-info">
                <div className="image-casingus">
                    <div className="img-img">
                        <div className="baby-plus-div" onClick={() => openModal("profile")}>
                            <p>EDIT</p>
                            <i className="fas fa-pencil"></i>
                        </div>
                        <span className="main-img-css">
                            <img src="assets/images/banner3.jpg" alt="" />

                            <div className="camera-div">EDIT PHOTO</div>
                        </span>

                        <div className="user-details-main-main">
                            <h1>Okoro Chukuemeka Alozie</h1>
                            <p>
                                Emekaokoro281@gmail.com <i className="fas fa-copy"></i>
                            </p>
                            <span className="online-statuse">
                                <i></i>
                                <h4>Online</h4>
                            </span>
                        </div>
                    </div>
                    <div className="user-same-dis">
                        <div className="text-prct no-p">
                            <h1>
                                Premium Member
                                <img src="assets/images/Group134.png" alt="" />
                            </h1>
                            <h4>
                                Skin Care Specialist | Medical Dermatology | Cosmetic
                                Dermatology | Expert in Acne, Eczema, and Psoriasis Treatment
                            </h4>
                            <p>Nigeria</p>
                        </div>
                        <div className="star-rating">
                            <p>4.5</p>
                            <span>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </span>
                            <p>(222,000)</p>
                            <button className="pp-btn">Global Practitioner </button>
                        </div>
                        <div className="sumarry-prct">
                            <p>
                                I am a skilled and experienced dermatologist currently working
                                in a reputable company, specializing in diagnosing and treating
                                a wide range of skin conditions. With a deep understanding of
                                skin health, I offer expert care for medical, surgical, and
                                cosmetic dermatology needs. Throughout my career, I have honed
                                my
                            </p>
                        </div>
                        <div className="folowers-and-post">
                            <a href="#">
                                <strong>33</strong>
                                posts
                            </a>
                            <a href="#">
                                <strong>3k+</strong>
                                followers
                            </a>
                            <a href="#">
                                <strong>Clients</strong>
                                100+
                            </a>
                        </div>
                        <div className="association-set">
                            <div className="asos-div">
                                <img src="assets/images/Google-lens.png" alt="" />
                                <span>
                                    <h4>Asociated With</h4>

                                    <a href="#">Google</a>
                                </span>
                            </div>

                            <button>Explore</button>
                        </div>
                    </div>
                </div>
                <div className="testimonials-div">
                    <div className="plus-div" onClick={() => openModal("experiences")}>
                        <i className="fas fa-plus"></i>
                    </div>
                    <div className="block-header">
                        <h1>Experiences</h1>
                    </div>

                    <div className="empty-no-file">
                        <img src="assets/images/nodata.jpeg" alt="" />
                    </div>

                    <Modal
                        isOpen={activeModal === "profile"}
                        onClose={closeModal}
                        onSubmit={(e) => handleFormSubmit(e, "profile")}
                    >
                        <h2>Edit Profile</h2>
                        <div className="change-inps-set">
                            <div className="inps-innn">
                                <span>
                                    <label htmlFor="FirstName">First Name</label>
                                    <input type="text" id="nameInp" />
                                </span>
                                <span>
                                    <label htmlFor="LastName">Last Name</label>

                                    <input type="text" name="" id="LastName" />
                                </span>
                            </div>
                            <span>
                                <label htmlFor="Email">Email</label>

                                <input
                                    type="text"
                                    name=""
                                    id="Email"
                                    value="emekaokoro281@gmail.com"
                                    disabled
                                />
                            </span>
                            <div className="image-update">
                                <div className="box-span">
                                    <i className="fas fa-image"></i>
                                    <p>Upload Image</p>
                                </div>
                            </div>
                            <div className="disclaimer-div">
                                <i className="fas fa-info"></i>
                                <p>
                                    All changes to your personal cridentials must mactch the one
                                    on your government ID and cant be modified after this changes
                                </p>
                            </div>
                        </div>
                    </Modal>

                    {/* Password Change Modal */}
                    <Modal
                        isOpen={activeModal === "experiences"}
                        onClose={closeModal}
                        onSubmit={(e) => handleFormSubmit(e, "ecperiences")}
                    >
                        <h2>Experiences</h2>
                        <div className="change-inps-set">
                            <div className="inps-innn ">
                                <span>
                                    <label htmlFor="">Organization Name</label>

                                    <input type="text" placeholder="Select Organization" />
                                </span>

                            </div>
                            <div className="image-update">
                                <div className="box-span">
                                    <i className="fas fa-image"></i>
                                    <p>Upload Image</p>
                                </div>
                            </div>
                            <h2>Details About Your Experiences</h2>
                            <textarea name="" id="" className="aboout-ur-experience">

                            </textarea>

                        </div>

                    </Modal>

                    {/* Preferences Modal */}
                    <Modal
                        isOpen={activeModal === "preferences"}
                        onClose={closeModal}
                        onSubmit={(e) => handleFormSubmit(e, "preferences")}
                    >
                        <h2>Update Preferences</h2>
                        <label>
                            Notifications:
                            <input type="checkbox" name="notifications" />
                        </label>
                        <label>
                            Dark Mode:
                            <input type="checkbox" name="darkMode" />
                        </label>
                    </Modal>
                </div>
            </div>
        </>
    );
}
