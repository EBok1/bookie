type ValidateFormProps = {
rating?: number; 
reviewerName: string; 
reviewerComment: string; 
}

export function validateForm({ rating, reviewerName, reviewerComment }: ValidateFormProps) {
  const newErrors: Record<string, string> = {};

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

type ValidateBookProps = {
  title: string;
  author: string;
  isbn: string;
  genre: string; 
  language: string; 
  publishedYear: string; 
}

export function validateBook({
  title,
  author,
  isbn,
  genre,
  language,
  publishedYear,
}: ValidateBookProps) {

  const newErrors: Record<string, string> = {};

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
