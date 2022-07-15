import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import Axios from "axios";

export default function BrowseRecipes(): JSX.Element {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeTS[]>();

  // fetch recipes from SQL-server
  useEffect(() => {
    Axios.get("http://localhost:3100/browse").then((response) => {
      setRecipes(response.data);
    });

    /*fetch("http://localhost:3004/recipes")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.log(error);
      });*/
  }, []);

  if (!recipes) {
    return <Spinner animation={"border"} className="m-4" />;
  }

  return (
    <div className="p-4">
      <h1>Browse Recipes</h1>
      {recipes.map((recipe: RecipeTS) => (
        <>
          <div key={recipe.id} className="m-3 p-3 border w-50">
            <h3>{recipe.title}</h3>
            <Button
              size="sm"
              className="m-2"
              onClick={() => navigate(`../browse/${recipe.id}`)}
            >
              Open
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={() => navigate(`../modify/${recipe.id}`)}
            >
              Modify
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="m-2"
              onClick={() => navigate(`../delete/${recipe.id}`)}
            >
              Delete
            </Button>
          </div>
        </>
      ))}
    </div>
  );
}
