import Robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
  return (
    <div className="welcomeContainer">
      <img src={Robot} alt="Robot image" />
      <h1>
        Welcome, <span>{currentUser.name}!</span>
      </h1>
      <h3>Please select a chat to start Messaging</h3>
    </div>
  );
}
