import type { BookData } from "@/app/types/bookData";

type BookDetailsProps = {
  bookData: BookData;
}

const BookDetails = ({ bookData }: BookDetailsProps) => {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-800 mb-2 font-playfair">
        Book Details
      </h3>
      <dl className="grid grid-cols-2 gap-4">
        <div>
          <dt className="text-sm font-medium text-gray-500">Published Year</dt>
          <dd className="text-gray-900">{bookData.publishedYear}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Pages</dt>
          <dd className="text-gray-900">{bookData.pages}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Publisher</dt>
          <dd className="text-gray-900">{bookData.publisher}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Language</dt>
          <dd className="text-gray-900">{bookData.language}</dd>
        </div>
        <div>
          <dt className="text-sm font-medium text-gray-500">Format</dt>
          <dd className="text-gray-900">{bookData.format}</dd>
        </div>
      </dl>
    </div>
  );
};

export default BookDetails;
