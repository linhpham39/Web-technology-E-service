import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />

      <div className="homeContainer">
      <Navbar />
      <div className="abctest">
        Welcome to Admin Dashboard
      </div>
        {/* Welcome to Admin Dashboard */}
      </div>
    </div>
  );
};

export default Home;
