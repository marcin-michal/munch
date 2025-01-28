import { RouterProvider } from "react-router-dom";
import "@patternfly/react-core/dist/styles/base.css";
import router from "./router";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
