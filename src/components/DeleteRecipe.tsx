import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

export default function DeleteRecipe() {
  const { recipeID } = useParams();
  const navigate = useNavigate();

  function handleDelete() {
    Axios.delete(`http://localhost:3100/delete/${recipeID}`).then(() => {
      navigate("../browse");
    });

    /*fetch(`http://localhost:3004/recipes/${recipeID}`, {
      method: "DELETE",
    }).then(() => {
      navigate("../browse");
    });*/
  }
  return (
    <div className="p-4">
      <h2>Really delete?</h2>
      <Button
        variant="warning"
        onClick={() => navigate("../browse")}
        className="m-2"
      >
        Cancel
      </Button>
      <Button variant="danger" onClick={handleDelete} className="l-2">
        Delete
      </Button>
    </div>
  );
}
