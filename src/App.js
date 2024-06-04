import "./App.css";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import RenderRoutes from "./components/RenderRoutes";
import AuthProvider from "./context/AuthProvider";
import TaskProvider from "./context/TaskProvider";

function App() {
  return (
    <div className="App">
      <TaskProvider>
        <AuthProvider>
          <Header className="header" />
          <div className="center">
            <Navigation className="navigation" />
            <RenderRoutes className="main" />
          </div>
        </AuthProvider>
      </TaskProvider>
    </div>
  );
}

export default App;
