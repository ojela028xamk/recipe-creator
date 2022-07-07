import "./Home.scss";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Home() {
  const placeholderimg = require("../recipe-placeholder.png");
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
                <Card.Img variant="top" src={placeholderimg} />
                <Card.Body>
                  <Card.Title>Create Recipe</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="home-links-card">
                <Card.Img variant="top" src={placeholderimg} />
                <Card.Body>
                  <Card.Title>Browse Recipes</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
