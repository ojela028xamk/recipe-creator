import { Field, FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";

export default function ModifyRecipe(): JSX.Element {
  const { recipeID } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<RecipeTS>();

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
        Return
      </Button>
      <Formik
        initialValues={recipe}
        onSubmit={(values) => {
          fetch(`http://localhost:3004/recipes/${recipeID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          navigate("../browse");
        }}
      >
        {({ submitForm, values }) => (
          <Form>
            <div className="m-2">
              <h2>Modifying: {recipe.title}</h2>
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
              onClick={submitForm}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
