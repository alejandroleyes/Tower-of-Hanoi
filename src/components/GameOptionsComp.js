import { Row, Col, Button, Container } from "react-bootstrap"

const GameOptionsComp = ({
  disks,
  handleSolve,
  reset,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <Container className="container p-2 my-2 border mb-3 ">
      <Row>
        <Col>
          <span>Disks: {disks}</span>
          <Button
            variant=" mx-2 btn btn-secondary"
            onClick={() => handleIncrement()}
          >
            +
          </Button>
          <Button
            variant=" mx-2 btn btn-secondary "
            onClick={() => handleDecrement()}
          >
            -
          </Button>
        </Col>
        <Col className="d-flex flex-row justify-content-end ">
          <Button variant=" mx-2 btn btn-dark" onClick={() => reset()}>
            Restart
          </Button>
          <Button
            variant="o mx-2 btn btn-success"
            onClick={() => handleSolve()}
          >
            Solve!
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default GameOptionsComp
