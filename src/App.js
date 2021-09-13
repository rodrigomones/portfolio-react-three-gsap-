import "./App.scss";
import { Opportunities } from "./components/Opportunities";
import { Solutions } from "./components/Solutions";
import { Contact } from "./components/Contact";
import Header from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Hero from "./components/Hero";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container">
          <div className="wrapper">
            <div className="home">
              <Switch>
                <Route exact path="/">
                  <Hero />
                </Route>
                <Route exact path="/opportunities">
                  <Opportunities />
                </Route>
                <Route exact path="/solutions">
                  <Solutions />
                </Route>
                <Route exact path="/contact-us">
                  <Contact />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
