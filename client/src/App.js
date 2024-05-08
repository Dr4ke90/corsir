import "../src/App.css";
import MainPage from "./pages/MainPage/MainPage";
import LoginForm from "./pages/LoginPage/LogIn";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.users.loggedUser);

  if (!token) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <MainPage />
    </div>
  );
}

export default App;
