import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookDetailPage from "./pages/BookDetailPage/BookDetailPage.jsx";
import BookOverviewPage from "./pages/BookOverviewPage/BookOverviewPage.jsx";
import Navigation from "./components/Navigation/Navigation.jsx";
import FavoritesList from "./pages/FavoriteListPage/FavoriteListPage.jsx";
import Logo from "./components/Logo/Logo.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<BookOverviewPage />} />
        <Route path="/" element={<Logo />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> */}
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/book/:id" element={<BookDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
