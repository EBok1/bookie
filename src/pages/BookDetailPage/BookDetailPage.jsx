import { useParams } from "react-router";
import fetchBookById from "../../mocks/helpers";
import { useEffect, useState } from "react";

function BookDetailPage() {
  const params = useParams();
  const [bookData, setBookData] = useState({});

  useEffect(() => {
    const data = fetchBookById({ id: params.id });
    setBookData(data);
  }, [params.id]);

  return (
    <>
      <p>Titleee {bookData.title}</p>
    </>
  );
}

export default BookDetailPage;
