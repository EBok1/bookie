export function validateForm({ rating, reviewerName, reviewerComment }) {
  const newErrors = {};

  if (!rating) {
    newErrors.rating = "Please select a rating";
  }
  if (!reviewerName?.trim()) {
    newErrors.reviewerName = "Please enter your name";
  }

  if (!reviewerComment?.trim()) {
    newErrors.reviewerComment = "Please enter a comment.";
  }

  return newErrors;
}

export function validateBook({
  bookTitle,
  bookAuthor,
  bookIsbn,
  bookGenre,
  bookLanguage,
}) {

  const newErrors = {};
  
  if (!bookTitle?.trim()) {
    newErrors.bookTitle = "Please enter a title.";
  }

  if (!bookAuthor?.trim()) {
    newErrors.bookAuthor = "Please enter a Author.";
  }

  if (!bookIsbn?.trim()) {
    newErrors.bookIsbn =
      "Please enter ISBN. If you don't have a ISBN please enter a -.";
  }

  if (!bookGenre) {
    newErrors.bookGenre = "Select a genre.";
  }

  if (!bookLanguage) {
    newErrors.bookLanguage = "Fill in a language.";
  }

  return newErrors;
}
