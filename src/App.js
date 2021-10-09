import { Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Gear from "./pages/Gear";

function App() {
    return (
        <div className="App">
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/gear-i-use" component={Gear}></Route>
        </div>
    );
}

export default App;
