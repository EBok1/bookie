const BookTag = ({ tag, variant, hashtag, ...props }) => {
  const variants = {
    orange:
      "inline-block bg-orange-100 text-orange-800 px-3 py-1 mb-8 rounded-full text-sm font-medium",
    grey: "bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm",
    green: "bg-[#bccdbc] px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap",
  };
  return (
    <>
      <span className={variants[variant]} {...props}>
        {hashtag ? "#" : ""}
        {tag}
      </span>
    </>
  );
};

export default BookTag;
