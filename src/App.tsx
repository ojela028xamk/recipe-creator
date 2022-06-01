import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./App.css";
import BrowseRecipes from "./components/BrowseRecipes";
import CreateRecipe from "./components/CreateRecipe";

function App() {
  const [page, setPage] = useState("createrecipe");

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Recipe Creator</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => setPage("createrecipe")}>
              Create Recipe
            </Nav.Link>
            <Nav.Link onClick={() => setPage("browserecipes")}>
              Browse Recipes
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="Content">
        {page === "createrecipe" && <CreateRecipe />}
        {page === "browserecipes" && <BrowseRecipes />}
      </div>
    </div>
  );
}

export default App;
