import { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";

export default function ModifyRecipe(): JSX.Element {
  const { recipeID } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeTS>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!recipe) {
      return;
    }
    const value = event.target.value;
    setRecipe({
      ...recipe,
      [event.target.name]: value,
    });
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    fetch(`http://localhost:3004/recipes/${recipeID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    }).then(() => {
      navigate("../browse");
    });
  }

  // fetch recipes from json-server
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
        Cancel
      </Button>
      <Form className="w-50">
        <Form.Group controlId="modifyRecipe">
          <Form.Label>
            <b>Title</b>
          </Form.Label>
          <Form.Control
            name="title"
            value={recipe.title}
            onChange={handleChange}
          />
          <Form.Label>
            <b>Instructions</b>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          type="submit"
          className="mt-3"
          onClick={(event) => handleSubmit(event)}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
