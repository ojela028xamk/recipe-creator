import { v4 as uuidv4 } from "uuid";
import { Field, Formik, Form, FieldArray } from "formik";
import { RecipeTS } from "../interfaces/RecipeTS";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";

export default function CreateRecipe(): JSX.Element {
  const navigate = useNavigate();

  const initialValues: RecipeTS = {
    id: uuidv4(),
    title: "",
    servingSize: "",
    ingredients: [
      {
        amount: "",
        ingredient: "",
      },
    ],
    instructions: [""],
  };

  return (
    <div className="p-4">
      <h1>Create Recipe</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          Axios.post("http://localhost:3100/create", {
            title: values.title,
            servingSize: values.servingSize,
            ingredients: values.ingredients,
            instructions: values.instructions,
          }).then(() => {
            navigate("../browse");
          });

          /*fetch("http://localhost:3004/recipes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          navigate("../browse");*/
        }}
      >
        {({ values }) => (
          <Form>
            <div className="m-2">
              <label htmlFor="title" className="d-block">
                Title
              </label>
              <Field id="title" name="title" />
              <label htmlFor="servingSize" className="d-block">
                Serving size
              </label>
              <Field id="servingSize" name="servingSize" />
            </div>
            <div className="m-2">
              <h5>Ingredients</h5>
              <FieldArray name="ingredients">
                {({ insert, remove, push }) => (
                  <div>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <div key={index}>
                          <label
                            htmlFor={`ingredients.${index}.amount`}
                            className="p-1"
                          >
                            Amount
                          </label>
                          <Field
                            name={`ingredients.${index}.amount`}
                            placeholder="ex. 1 tsp"
                            type="text"
                          />
                          <label
                            htmlFor={`ingredients.${index}.ingredient`}
                            className="p-1"
                          >
                            Ingredient
                          </label>
                          <Field
                            name={`ingredients.${index}.ingredient`}
                            placeholder="ex. Salt"
                            type="text"
                          />
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    <Button
                      variant="info"
                      className="m-2"
                      onClick={() => push({ amount: "", ingredient: "" })}
                    >
                      Add an ingredient
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="m-2">
              <h5>Instructions</h5>
              <FieldArray name="instructions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.instructions.length > 0 &&
                      values.instructions.map((instruction, index) => (
                        <div key={index}>
                          <label
                            htmlFor={`instructions.${index}.instrunction`}
                            className="p-1"
                          >
                            Step {`${index + 1}`}
                          </label>
                          <Field
                            as="textarea"
                            cols="50"
                            rows="4"
                            name={`instructions.${index}`}
                            placeholder="Add water to a pot..."
                            type="text"
                          />
                          <button type="button" onClick={() => remove(index)}>
                            X
                          </button>
                        </div>
                      ))}
                    <Button
                      variant="info"
                      className="m-2"
                      onClick={() => push("")}
                    >
                      Add an instruction
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
            <Button
              type="submit"
              variant="outline-info"
              size="lg"
              className="m-2"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
