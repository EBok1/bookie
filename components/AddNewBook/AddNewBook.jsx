"use client";
import { useState, useEffect } from "react";
import { validateBook } from "../BookReview/utils/validateForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../app/supabaseClient";
import { useRouter } from 'next/navigation';

export const AddNewBook = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [openInfoButton, setOpenInfoButton] = useState(false);
  const [bookCoverImage, setBookCoverImage] = useState(null);
  const [bookGenre, setBookGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(false);
  const [genresCache, setGenresCache] = useState(null);
  const [bookDescription, setBookDescription] = useState("");
  const [bookPublishedYear, setBookPublishedYear] = useState("");
  const [bookLanguage, setBookLanguage] = useState("");
  const router = useRouter();

  async function handleAddBookSubmit(e) {
    e.preventDefault();
    setErrorMessage({});
    setSubmitMessage("");

    const errors = validateBook({
      bookAuthor,
      bookTitle,
      bookIsbn,
      bookGenre, 
      bookLanguage,
    });
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    let date = new Date().toLocaleDateString("nl-NL");

    setIsSubmitting(true);
    const newBook = {
      title: bookTitle,
      author: bookAuthor,
      genre: bookGenre,
      isbn: bookIsbn,
      coverImageUrl: "/logo.png",
      language: bookLanguage,
      publishedYear: bookPublishedYear,
      format: "paperback",
      pages: 0,
      publisher: "Unknown",
      tags: "",
      rating: null,
      status: "read",
      dateAdded: date,
      id: Date.now(),
    };

    const { error } = await supabase
    .from("books")
    .insert(newBook);

    if (error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setSubmitMessage("Book is added successfully!");
    setBookTitle("");
    setBookAuthor("");
    setBookGenre("");
    setBookIsbn("");
    setBookCoverImage(null);
    setBookLanguage("");
    setBookPublishedYear("");
    setBookDescription("");
    setErrorMessage({});
    setIsSubmitting(false);
    setModalIsOpen(false);
    router.refresh();
    setTimeout(() => setSubmitMessage(""), 5000);
  }

  async function fetchGenres() {
    try {
      setLoadingGenres(true);

      if (genresCache) {
        setAvailableGenres(genresCache);
        setLoadingGenres(false);
        return;
      }

      const { data: booksData, error } = await supabase
        .from("books")
        .select("genre");

      if (error) throw error;

      const uniqueGenres = [...new Set(booksData.map((book) => book.genre))]
        .filter((genre) => genre)
        .sort();

      setAvailableGenres(uniqueGenres);
      setGenresCache(uniqueGenres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      setAvailableGenres([]);
    } finally {
      setLoadingGenres(false);
    }
  }

  useEffect(() => {
    if (modalIsOpen) {
      fetchGenres();
    }
  }, [modalIsOpen]);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase.from("books").select("*");
      console.log(data);
      return { data };
    } catch (err) {
      console.error("❌ Get comments error:", err);
      return { data: [] };
    }
  };

  return (
    <>
      {submitMessage && (
        <p className="text-green-500 text-sm mt-2">{submitMessage}</p>
      )}

      <button
        onClick={() => setModalIsOpen(true)}
        className="fixed bottom-4 right-6 bg-[#3D5E3F] px-3 py-3 rounded-full text-md font-medium text-white shadow-xl border-2 border-white cursor-pointer"
      >
        +Add Book
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-10">
          <dialog
            open={modalIsOpen}
            className="border border-gray-300 w-auto h-auto mx-8 flex justify-center text-center bg-gray-100 rounded-md p-4 shadow-md bg-opacity-90"
          >
            <div>
              <h2>Add New Book</h2>
              <form className="mt-4" onSubmit={handleAddBookSubmit} noValidate>
                <input
                  type="text"
                  placeholder="Title*"
                  className={`w-full mb-2 p-1 border-2 rounded-md ${
                    errorMessage.bookTitle
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500`}
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  required
                />

                {errorMessage.bookTitle && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessage.bookTitle}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Auteur(s)*"
                  className={`w-full mb-2 p-1 border-2 rounded-md ${
                    errorMessage.bookAuthor
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500`}
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  required
                  maxLength="50"
                />

                {errorMessage.bookAuthor && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessage.bookAuthor}
                  </p>
                )}

                <div className="flex items-center mb-2">
                  <input
                    type="number"
                    placeholder="ISBN: 9781649379290"
                    className={`w-full p-1 border-2 rounded-md ${
                      errorMessage.bookIsbn
                        ? "border-pink-500"
                        : "border-[#bccdbc]"
                    } focus:border-blue-500`}
                    value={bookIsbn}
                    onChange={(e) => setBookIsbn(e.target.value)}
                    minLength="10"
                    maxLength="13"
                  />
                  <button
                    className="relative group"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenInfoButton(!openInfoButton);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="text-[#3D5E3F]"
                    />

                    {openInfoButton && (
                      <div className="absolute bottom-full mb-2 transform -translate-x-3/4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 w-56 sm:w-64 md:w-72 max-w-sm text-left">
                        <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                          What is an ISBN?
                        </h3>
                        <p className="text-md text-gray-600 leading-relaxed">
                          The ISBN is a 13-digit number usually found on the
                          back of your book near the barcode. This helps us find
                          the right book!
                        </p>
                        <div className="absolute top-full right-6 md:right-10 transform -translate-x-3/4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                      </div>
                    )}
                  </button>
                </div>
                {errorMessage.bookIsbn && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessage.bookIsbn}
                  </p>
                )}

                <div>
                  <input
                    type="file"
                    // placeholder={src="/logo.png"}
                    className={`w-full mb-2 p-1 border-2 rounded-md bg-[#FFFFFF] border-[#bccdbc] text-[#9CA2AF] ${
                      errorMessage.bookCoverImage
                        ? "border-pink-500"
                        : "border-[#bccdbc]"
                    } focus:border-blue-500`}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setBookCoverImage(file);
                    }}
                    accept="image/*"
                  />
                  {bookCoverImage && (
                    <p className="text-sm text-gray-600 mt-1">
                      Selected: {bookCoverImage.name}
                    </p>
                  )}
                </div>

                <select
                  value={bookGenre}
                  onChange={(e) => setBookGenre(e.target.value)}
                  disabled={loadingGenres}
                  className={`w-full mb-2 p-1 border-2 rounded-md bg-[#FFFFFF] text-[#9CA2AF]"${
                    errorMessage.bookGenre
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500 text-gray-700`}
                >
                  <option value="" disabled>
                    {loadingGenres ? "Loading genres..." : "Select a genre..."}
                  </option>
                  {availableGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                  <option>
                    Other
                  </option>
                </select>

                {errorMessage.bookGenre && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessage.bookGenre}
                  </p>
                )}

                <input
                  type="text"
                  placeholder="Description"
                  className={`w-full mb-2 p-1 border-2 rounded-md ${
                    errorMessage.bookDescription
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500`}
                  value={bookDescription}
                  onChange={(e) => setBookDescription(e.target.value)}
                  maxLength="500"
                />

                <input
                  type="number"
                  placeholder="Published Year*"
                  className={`w-full mb-2 p-1 border-2 rounded-md ${
                    errorMessage.bookPublishedYear
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500`}
                  value={bookPublishedYear}
                  onChange={(e) => setBookPublishedYear(e.target.value)}
                  maxLength="4"
                />

                <input
                  type="text"
                  placeholder="Language*"
                  className={`w-full mb-2 p-1 border-2 rounded-md ${
                    errorMessage.bookLanguage
                      ? "border-pink-500"
                      : "border-[#bccdbc]"
                  } focus:border-blue-500`}
                  value={bookLanguage}
                  onChange={(e) => setBookLanguage(e.target.value)}
                  required
                />
                {errorMessage.bookLanguage && (
                  <p className="text-red-500 text-sm mb-2">
                    {errorMessage.bookLanguage}
                  </p>
                )}

                <div className="gap-2 flex justify-center mt-4">
                  <button
                    className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    onClick={() => setModalIsOpen(false)}
                    className="bg-[#f1a9ae] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};
