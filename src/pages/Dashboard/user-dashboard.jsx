import NewNavbar from "../../components/newNavbar";
import SideNavbarD from "./dashboard-side-bar";
import "../Dashboard/dashboardmain.css";
import UserSettigns from "./usersettings";
import Footer from "../../components/footer";

export default function DashboarMain() {
  return (
    <div className="main-dashboard">
      <NewNavbar />
      <div className="main-dashboard-body">
        <SideNavbarD />
        <UserSettigns />
      </div>
      <Footer />
    </div>
  );
}
