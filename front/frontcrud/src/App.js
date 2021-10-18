import { Crud } from "./components/Crud";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { User } from "./components/User";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Crud} />
      <Route path="/userid/:id" exact component={User} />
    </Router>

  );
}

export default App;
