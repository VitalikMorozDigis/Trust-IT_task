import { Provider } from "react-redux";
import store from "./redux/store";
import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import PRTablePage from "./components/PRTablePage";

function App() {
    return (
        <Provider store={store}>
            <Container>
                <PRTablePage />
            </Container>
        </Provider>
    );
}

export default App;
