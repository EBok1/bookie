"use client";
import { useState, useEffect } from "react";
import { validateBook } from "../../components/BookReview/utils/validateForm";
import { supabase } from "../../app/supabaseClient";
import { useRouter } from "next/navigation";
import { createBookObject, clearFormFields } from "./utils/formHelpers";
import { useGenres } from "./hooks/useGenres";
import { FormField } from "../../components/FormField/FormField";
import { ISBNField } from "../../components/IsbnField/IsbnField";
import { FileUpload } from "../../components/FileUpload/FileUpload";
import { SelectGenre } from "../../components/SelectGenre/SelectGenre";
import { SubmitButton } from "../../components/SubmitButton/SubmitButton";
import { useBookForm } from "./hooks/useBookForm";

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

    setTimeout(() => router.push("/"), 2000);
  }

  const { availableGenres, loadingGenres, fetchGenres } = useGenres();

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-gray-100 rounded-md p-6 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Add New Book</h1>

          {submitMessage && (
            <p className="text-green-500 text-sm mt-2">{submitMessage}</p>
          )}

          <form className="mt-4" onSubmit={handleAddBookSubmit} noValidate>
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
            />

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

            <FileUpload
              selectedFile={bookFormData.coverImage}
              onFileChange={(e) =>
                setBookFormData({ ...bookFormData, coverImage: e })
              }
              accept="image/*"
            />

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
              onCancel={() => router.push("/")}
              onSubmit={handleAddBookSubmit}
              submitText="Add Book"
              cancelText="Back to Home"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBookPage;
