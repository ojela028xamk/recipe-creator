import { Field, FieldArray, Formik } from "formik";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { TiDelete } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";
import "./CreateRecipeForm.scss";

export default function ModifyRecipe(): JSX.Element {
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
    <div className="create-form">
      <Button variant="dark" onClick={() => navigate("../browse")}>
        Cancel
      </Button>
      <Formik
        initialValues={recipe}
        onSubmit={(values) => {
          localStorage.setItem(values.id, JSON.stringify(values));
          navigate("../browse");
        }}
      >
        {({ submitForm, values }) => (
          <Form>
            <div className="m-2">
              <h1>Modifying: {recipe.title}</h1>
              <label htmlFor="title" className="d-block">
                Title
              </label>
              <Field id="title" name="title" />
              <label htmlFor="servingSize" className="d-block">
                Serving size
              </label>
              <Field id="servingSize" name="servingSize" />
            </div>
            <div>
              <h2>Ingredients</h2>
              <FieldArray name="ingredients">
                {({ insert, remove, push }) => (
                  <div>
                    {values.ingredients.length > 0 &&
                      values.ingredients.map((ingredient, index) => (
                        <div key={index} className="create-ingredients">
                          <label htmlFor={`ingredients.${index}.amount`}>
                            Amount
                          </label>
                          <Field
                            name={`ingredients.${index}.amount`}
                            placeholder="ex. 1 tsp"
                            type="text"
                          />
                          <label htmlFor={`ingredients.${index}.ingredient`}>
                            Ingredient
                          </label>
                          <Field
                            name={`ingredients.${index}.ingredient`}
                            placeholder="ex. Salt"
                            type="text"
                          />
                          <span
                            className="create-form-button"
                            onClick={() => remove(index)}
                          >
                            <TiDelete />
                          </span>
                        </div>
                      ))}
                    <Button
                      variant="outline-dark"
                      className="m-2"
                      onClick={() => push({ amount: "", ingredient: "" })}
                    >
                      Add an ingredient
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div>
              <h2>Instructions</h2>
              <FieldArray name="instructions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.instructions.length > 0 &&
                      values.instructions.map((instruction, index) => (
                        <div key={index} className="create-instructions">
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
                          <span
                            className="create-form-button"
                            onClick={() => remove(index)}
                          >
                            <TiDelete />
                          </span>
                        </div>
                      ))}
                    <Button
                      variant="outline-dark"
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
              variant="dark"
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
