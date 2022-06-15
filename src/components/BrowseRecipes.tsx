import { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RecipeTS } from "../interfaces/RecipeTS";

export default function BrowseRecipes(): JSX.Element {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<RecipeTS[]>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<RecipeTS>();

  function handleModal(data: RecipeTS) {
    setShowModal(true);
    setModalData(data);
  }

  // fetch recipes from json-server
  useEffect(() => {
    fetch("http://localhost:3004/recipes")
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
      });
  }, []);

  function handleDelete(id: string) {
    fetch(`http://localhost:3004/recipes/${id}`, { method: "DELETE" }).then(
      () => {
        window.location.reload();
      }
    );
  }

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
              onClick={() => handleModal(recipe)}
            >
              Open
            </Button>
            <Button
              variant="warning"
              size="sm"
              onClick={() => navigate(`./${recipe.id}`)}
            >
              Modify
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="m-2"
              onClick={() => handleDelete(recipe.id)}
            >
              Delete
            </Button>
          </div>
        </>
      ))}
      {/* show recipe */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalData?.instructions}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
