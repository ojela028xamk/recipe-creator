import "./Home.scss";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const recipeAdd = require("../recipe-add-01.png");
  const recipeBrowse = require("../recipe-browse-01.png");
  return (
    <>
      <div className="home-image">
        <header className="home-image-header">
          Store Your Recipes <GiForkKnifeSpoon />
        </header>
        <p className="home-image-pr">
          In this site you can store your own recipes. You can also modify and
          delete recipes.
        </p>
      </div>
      <div className="home-links">
        <Container>
          <Row>
            <Col>
              <Card className="home-links-card">
                <Card.Img variant="top" src={recipeAdd} />
                <Card.Body>
                  <Card.Title>Create a recipe</Card.Title>
                  <Card.Text>
                    Add a recipe to your database with title, serving size,
                    instructions and ingredients.
                  </Card.Text>
                  <Button variant="dark" onClick={() => navigate("/create")}>
                    Create
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="home-links-card">
                <Card.Img variant="top" src={recipeBrowse} />
                <Card.Body>
                  <Card.Title>Browse recipes</Card.Title>
                  <Card.Text>
                    Browse all of your recipes in your database. You can also
                    modify and delete recipes.
                  </Card.Text>
                  <Button variant="dark" onClick={() => navigate("/browse")}>
                    Browse
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
