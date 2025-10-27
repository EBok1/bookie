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
  title,
  author,
  isbn,
  genre,
  language,
  publishedYear,
}) {

  const newErrors = {};

  if (!title?.trim()) {
    newErrors.title = "Please enter a title.";
  }

  if (!author?.trim()) {
    newErrors.author = "Please enter a Author.";
  }

  if (!isbn?.trim()) {
    newErrors.isbn =
      "Please enter ISBN. If you don't have a ISBN please enter a -.";
  }

  if (!genre) {
    newErrors.genre = "Select a genre.";
  }

  if (!language) {
    newErrors.language = "Fill in a language.";
  }

  if (!publishedYear) {
    newErrors.publishedYear = "Fill in a year.";
  }

  return newErrors;
}
