export function validateForm(rating, reviewerName, reviewerComment) {
    const newErrors = {};

    if (!rating) {
      newErrors.rating = "Please select a rating";
    }
    if (!reviewerName.trim()) {
      newErrors.reviewerName = "Please enter your name";
    }

    if (!reviewerComment.trim()) {
      newErrors.reviewerComment = "Please enter a comment";
    }

    return newErrors;
  }