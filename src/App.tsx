import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BrowseRecipes from "./components/BrowseRecipes";
import CreateRecipe from "./components/CreateRecipe";
import DeleteRecipe from "./components/DeleteRecipe";
import ModifyRecipe from "./components/ModifyRecipe";
import ShowRecipe from "./components/ShowRecipe";

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Recipe Creator</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/create" className="m-2 text-light text-decoration-none">
              Create Recipe
            </Link>
            <Link to="/browse" className="m-2 text-light text-decoration-none">
              Browse Recipes
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="Content">
        <Routes>
          <Route path="create" element={<CreateRecipe />} />
          <Route path="browse" element={<BrowseRecipes />} />
          <Route path="browse/:recipeID" element={<ShowRecipe />} />
          <Route path="modify/:recipeID" element={<ModifyRecipe />} />
          <Route path="delete/:recipeID" element={<DeleteRecipe />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
