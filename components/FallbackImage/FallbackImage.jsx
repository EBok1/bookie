"use client";
import { useState } from "react";

const FallbackImage = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div className="rounded justify-center flex pb-4">
        {book.coverImageUrl && !imageError ? (
          <img
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            loading="lazy"
            className="h-96"
            onError={handleImageError}
          />
        ) : (
          <div className="h-96 flex items-center justify-center">
            <img
              src="/logo.png"
              alt="Book placeholder"
              className="h-60 w-auto opacity-60"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FallbackImage;
