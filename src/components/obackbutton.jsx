import { useNavigate } from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="gobackdiv">

            <i onClick={goBack} className="fas fa-arrow-left"></i>
        </div>
);
};

export default GoBackButton;
