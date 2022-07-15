import { useEffect, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import placeholder from "../recipeimg.png";

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
    <div className="p-4">
      <Button
        variant="primary"
        className="mb-2"
        onClick={() => navigate("../browse")}
      >
        Return
      </Button>
      <h1>{recipe.title}</h1>
      <h5>Servings: {recipe.servingSize}</h5>
      <Image src={placeholder} width="200px" />
      <h5>Ingredients</h5>
      <ul>
        {recipe.ingredients.map(
          (ingredient: { amount: string; ingredient: string }) => (
            <li>
              {ingredient.amount} {ingredient.ingredient}
            </li>
          )
        )}
      </ul>
      <h5>Instructions</h5>
      <ol type="1">
        {recipe.instructions.map((instruction: string) => (
          <li>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
