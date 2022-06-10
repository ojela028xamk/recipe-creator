import { Form } from "react-bootstrap";

export default function CreateRecipe(): JSX.Element {
  return (
    <div className="p-4">
      <h1>Create Recipe</h1>
      <Form className="w-50">
        <Form.Group controlId="formRecipe">
          <Form.Label>
            <b>Title</b>
          </Form.Label>
          <Form.Control placeholder="Title" />
          <Form.Label>
            <b>Instructions</b>
          </Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Instructions" />
        </Form.Group>
      </Form>
    </div>
  );
}
