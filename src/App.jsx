import HomePage from "./pages/Home/HomePage";
import ErrorPage from "./pages/ErrorPage";
import SelectedRecipePage from "./pages/SelectedRecipePage/SelectedRecipePage";

import { Route, Routes } from "react-router-dom";

// import BeerCard from "./UI/BeerCard";
import "./App.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/selectedRecipe/:id" element={<SelectedRecipePage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
