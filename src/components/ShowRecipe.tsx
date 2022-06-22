import { useEffect, useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import placeholder from "../recipeimg.png";

export default function ShowRecipe() {
  const { recipeID } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeTS>();

  // fetch recipe by id from json-server
  useEffect(() => {
    fetch(`http://localhost:3004/recipes/${recipeID}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
        {recipe.ingredients.map((ingredient: string) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <h5>Instructions</h5>
      <ul>
        {recipe.instructions.map((instruction: string) => (
          <li>{instruction}</li>
        ))}
      </ul>
    </div>
  );
}
