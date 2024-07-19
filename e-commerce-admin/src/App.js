import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin";
// import User from "./Components/User/user";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Admin />
        <Footer />
        {/* <User /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
