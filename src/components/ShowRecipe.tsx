import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import "./ShowRecipe.scss";

export default function ShowRecipe() {
  const { recipeID } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeTS>();

  // fetch recipe by id from localStorage
  useEffect(() => {
    const getRecipe = JSON.parse(localStorage.getItem(`${recipeID}`) || "null");
    setRecipe(getRecipe);
  }, [recipeID]);

  if (!recipe) {
    return <Spinner animation={"border"} className="m-4" />;
  }

  return (
    <div className="show-recipe">
      <Button
        variant="dark"
        className="mb-2"
        onClick={() => navigate("../browse")}
      >
        Return
      </Button>
      <Container className="mt-3">
        <h1>{recipe.title}</h1>
        <h4>Servings: {recipe.servingSize}</h4>
        <Row>
          <Col xs={7} className="show-recipe-info">
            <h4>Instructions</h4>
            <ol type="1">
              {recipe.instructions.map((instruction: string) => (
                <li>{instruction}</li>
              ))}
            </ol>
          </Col>
          <Col xs={4} className="show-recipe-info">
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map(
                (ingredient: { amount: string; ingredient: string }) => (
                  <li>
                    {ingredient.amount} {ingredient.ingredient}
                  </li>
                )
              )}
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
