import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="row">
      <div className="row choose-mode">
        <div className="col-md-4 offset-md-2">
          <button
            className="btn btn-primary home-select-button"
            onClick={() => {
              navigate("/player");
            }}
          >
            Player
          </button>
        </div>
        <div className="col-md-4">
          <button
            className="btn btn-primary home-select-button"
            onClick={() => {
              navigate("/controller/login");
            }}
          >
            Controller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
