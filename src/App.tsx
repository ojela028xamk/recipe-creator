import { Nav } from "react-bootstrap";
import { BiFoodMenu } from "react-icons/bi";
import { Link, Route, Routes } from "react-router-dom";
import "./App.scss";
import BrowseRecipes from "./components/BrowseRecipes";
import CreateRecipe from "./components/CreateRecipe";
import DeleteRecipe from "./components/DeleteRecipe";
import Home from "./components/Home";
import ModifyRecipe from "./components/ModifyRecipe";
import ShowRecipe from "./components/ShowRecipe";

function App() {
  document.body.style.background = "#f6f6f6";
  return (
    <div className="App">
      <Nav className="navbar">
        <Link to="/" className="text-light text-decoration-none display-6">
          Recipe Creator <BiFoodMenu className="navbar-brand" />
        </Link>
      </Nav>
      <div className="Content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="create" element={<CreateRecipe />} />
          <Route path="browse" element={<BrowseRecipes />} />
          <Route path="browse/:recipeID" element={<ShowRecipe />} />
          <Route path="modify/:recipeID" element={<ModifyRecipe />} />
          <Route path="delete/:recipeID" element={<DeleteRecipe />} />
        </Routes>
      </div>
      <footer className="Footer">
        Copyright <span>&copy;</span> Jere Länsipii | All rights reserved
      </footer>
    </div>
  );
}

export default App;
