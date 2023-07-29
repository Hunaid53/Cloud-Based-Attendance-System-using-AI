import { Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { AppRoutes } from "./Router/routes";
import { UserAuthContextProvider } from "./Firebase/UserAuthContext";

function App() {
  return (
    <Container style={{ width: "100%" , height: "100%" , }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <>
              <AppRoutes />
            </>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
