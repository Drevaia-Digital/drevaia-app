import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "@/hooks/useAuth";
import { AppRoutes } from "./app/router/routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;