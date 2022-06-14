import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import BrowseRecipes from "./components/BrowseRecipes";
import CreateRecipe from "./components/CreateRecipe";

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
