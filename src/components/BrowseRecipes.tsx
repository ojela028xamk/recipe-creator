import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { ImFileEmpty } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import "./BrowseRecipes.scss";
import recipeImg from "../tacos.svg";

export default function BrowseRecipes(): JSX.Element {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeTS[]>();

  // fetch recipes from localStorage
  useEffect(() => {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i]) || "null"));
    }

    setRecipes(values);
  }, []);

  if (!recipes) {
    return <Spinner animation={"border"} className="m-4" />;
  }

  return (
    <div className="browse-recipes">
      <Button variant="dark" onClick={() => navigate("../create")}>
        Create a recipe &gt;&gt;
      </Button>
      <h1>Browse Recipes</h1>
      {recipes.length === 0 && (
        <Alert variant="danger" className="browse-recipes-alert">
          <span>
            There are no recipes here
            <ImFileEmpty className="empty-icon" />
          </span>
        </Alert>
      )}
      <Container>
        <Row className="w-80 justify-content-center">
          {recipes.map((recipe: RecipeTS) => (
            <>
              <Col xs={5} className="browse-recipes-card">
                <div key={recipe.id} className="d-flex flex-row">
                  <Image
                    src={recipeImg}
                    className="browse-recipes-card-image"
                  />
                  <div className="browse-recipes-card-text">
                    <h3>{recipe.title}</h3>
                    <span>Servings: {recipe.servingSize}</span>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      onClick={() => navigate(`../browse/${recipe.id}`)}
                    >
                      Open
                    </Button>
                    <Button
                      variant="outline-dark"
                      size="sm"
                      className="m-2"
                      onClick={() => navigate(`../modify/${recipe.id}`)}
                    >
                      Modify
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => navigate(`../delete/${recipe.id}`)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Col>
            </>
          ))}
        </Row>
      </Container>
    </div>
  );
}
