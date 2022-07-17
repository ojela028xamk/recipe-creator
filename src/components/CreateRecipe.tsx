import { v4 as uuidv4 } from "uuid";
import { Field, Formik, Form, FieldArray } from "formik";
import { TiDelete } from "react-icons/ti";
import { RecipeTS } from "../interfaces/RecipeTS";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./CreateRecipeForm.scss";

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
    <div className="create-form">
      <Button variant="dark" onClick={() => navigate("../browse")}>
        Browse recipes &gt;&gt;
      </Button>
      <h1>Create a recipe</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          localStorage.setItem(values.id, JSON.stringify(values));
          navigate("../browse");
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
            <div className="m-2">
              <h2>Instructions</h2>
              <FieldArray name="instructions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.instructions.length > 0 &&
                      values.instructions.map((instruction, index) => (
                        <div key={index} className="create-instructions">
                          <label htmlFor={`instructions.${index}.instrunction`}>
                            Step {`${index + 1}`}
                          </label>
                          <Field
                            as="textarea"
                            cols="50"
                            rows="4"
                            name={`instructions.${index}`}
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
            <Button type="submit" variant="dark" size="lg" className="m-2">
              Add recipe
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
