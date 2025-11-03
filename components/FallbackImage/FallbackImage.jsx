"use client";
import { useState } from "react";
import Image from "next/image";

const FallbackImage = ({ book }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="rounded justify-center flex pb-4">
      {book.coverImageUrl && !imageError ? (
        <Image
          src={book.coverImageUrl}
          alt={`Cover of ${book.title}`}
          width={384}
          height={384}
          className="h-96 w-auto"
          onError={handleImageError}
        />
      ) : (
        <div className="h-96 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Book placeholder"
            width={240}
            height={240}
            className="h-60 w-auto opacity-60"
          />
        </div>
      )}
    </div>
  );
};

export default FallbackImage;
