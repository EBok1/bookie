import Nav from "./screens/landing/Navbar.jsx";
import Books from "./screens/landing/Books.jsx";
import BookDetail from "./screens/details/BookDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <>
      <h1 className="text-center text-5xl leading-tight font-serif">
        Welcome to Bookie
      </h1>
      <div className="text-center max-w-2xl mx-auto p-8">
        <p className="text-xl mb-4 font-semibold text-green-600">
          Your personal reading companion awaits!
        </p>
        <p className="text-base">
          Rate your favorites, discover new adventures, and keep track of all
          those books you swear you'll get to... someday. Because let's be
          honest, we all have that one shelf that's practically bursting!
        </p>
        <p className="text-lg mb-6 italic text-gray-700">
          "A room without books is like a body without a soul" - Cicero
        </p>
        <img
          src="/front-page.png"
          alt="Image of drawn books"
          className="h-auto w-screen"
        />
      </div>
      <Books />
    </>
  );
}

function About() {
  return (
    <div className="p-8">
      <h1 className="text-3xl">About Page</h1>
      <p>About content here...</p>
    </div>
  );
}

function Contact() {
  return(
    <div>
      <h1>Contact page</h1>
    </div>
  )
}

function Login() {
  return (
    <div>
      <h1>Login page</h1>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
