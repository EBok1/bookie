"use client";
import { useState, useEffect } from "react";
import { validateBook } from "../../components/BookReview/utils/validateForm";
import { useRouter } from "next/navigation";
import { createBookObject, clearFormFields } from "./utils/formHelpers";
import { useGenres } from "./hooks/useGenres";
import { FormField } from "../../components/FormField/FormField";
import { ISBNField } from "../../components/IsbnField/IsbnField";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { SelectGenre } from "../../components/SelectGenre/SelectGenre";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { useBookForm } from "./hooks/useBookForm";
import ReturnButton from "../../components/ReturnButton/ReturnButton";

const AddBookPage = () => {
  const { bookFormData, setBookFormData } = useBookForm();
  const [errorMessage, setErrorMessage] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [openInfoButton, setOpenInfoButton] = useState(false);
  const router = useRouter();

  async function handleAddBookSubmit(e) {
    e.preventDefault();
    setErrorMessage({});
    setSubmitMessage("");

    const errors = validateBook(bookFormData);
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }

    setIsSubmitting(true);

    console.log({ bookFormData });

    const newBook = createBookObject(bookFormData);

    console.log({ newBook });

    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    const result = await response.json();

    if (result.error) {
      console.error("Database error:", result.error);
      setSubmitMessage("Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    setBookFormData(clearFormFields());
    setSubmitMessage("Book is added successfully!");
    setIsSubmitting(false);
    router.push(`/book/${result.data[0].id}`);
  }

  const { availableGenres, loadingGenres, fetchGenres } = useGenres();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  return (
    <>
     <ReturnButton />
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-gray-100 rounded-md p-6 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Add New Book</h1>

          {submitMessage && (
            <p className="text-green-500 text-sm mt-2">{submitMessage}</p>
          )}

          <form className="mt-4" onSubmit={handleAddBookSubmit} noValidate>
            <h2 className="mb-1">Title*</h2>
            <FormField
              placeholder="Title*"
              value={bookFormData.title}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  title: e.target.value,
                })
              }
              error={errorMessage.title}
              required
              minLength="2"
            />

            <h2 className="mt-4 mb-1">Auteur(s)*</h2>
            <FormField
              placeholder="Auteur(s)*"
              value={bookFormData.author}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  author: e.target.value,
                })
              }
              error={errorMessage.author}
              required
              maxLength="50"
            />

            <ISBNField
              value={bookFormData.isbn}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  isbn: e.target.value,
                })
              }
              error={errorMessage.isbn}
              infoOpen={openInfoButton}
              onToggleInfo={() => setOpenInfoButton(!openInfoButton)}
            />

            <h2 className="mt-4 mb-1">Image</h2>
            <FileUpload
              selectedFile={bookFormData.coverImage}
              onFileChange={(e) =>
                setBookFormData({ ...bookFormData, coverImage: e })
              }
              accept="image/*"
            />

            <h2 className="mt-4 mb-1">Genre*</h2>
            <SelectGenre
              value={bookFormData.genre}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  genre: e.target.value,
                })
              }
              options={availableGenres}
              loading={loadingGenres}
              error={errorMessage.genre}
            />

            <h2 className="mt-4 mb-1">Description</h2>
            <FormField
              placeholder="Description"
              value={bookFormData.description}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  description: e.target.value,
                })
              }
              maxLength="500"
            />

            <h2 className="mt-4 mb-1">Published Year*</h2>
            <FormField
              type="number"
              placeholder="Published Year*"
              value={bookFormData.publishedYear}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  publishedYear: e.target.value,
                })
              }
              error={errorMessage.publishedYear}
              maxLength="4"
            />

            <h2 className="mt-4 mb-1">Language*</h2>
            <FormField
              placeholder="Language*"
              value={bookFormData.language}
              onChange={(e) =>
                setBookFormData({
                  ...bookFormData,
                  language: e.target.value,
                })
              }
              error={errorMessage.language}
              required
            />

            <SubmitButton
              isLoading={isSubmitting}
              onSubmit={handleAddBookSubmit}
              submitText="Add Book"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookPage;
