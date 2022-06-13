import { Button, Form } from "react-bootstrap";
import { RecipeTS } from "../interfaces/RecipeTS";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useState } from "react";

export default function CreateRecipe(): JSX.Element {
  const [newRecipe, setNewRecipe] = useState<RecipeTS>({
    id: uuidv4(),
    title: "",
    instructions: "",
  });

  // one function handles all input changes
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setNewRecipe({
      ...newRecipe,
      [event.target.name]: value,
    });
  }

  function handleSubmit() {
    fetch("http://localhost:3004/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRecipe),
    }).then(() => {
      console.log("Success");
    });
  }

  return (
    <div className="p-4">
      <h1>Create Recipe</h1>
      <Form className="w-50">
        <Form.Group controlId="formRecipe">
          <Form.Label>
            <b>Title</b>
          </Form.Label>
          <Form.Control
            name="title"
            value={newRecipe.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <Form.Label>
            <b>Instructions</b>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleChange}
            placeholder="Instructions"
          />
        </Form.Group>
        <Button type="submit" onClick={handleSubmit} className="mt-3">
          Submit
        </Button>
      </Form>
    </div>
  );
}
