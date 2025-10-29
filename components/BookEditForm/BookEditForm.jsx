"use client";

export function BookEditForm({ editValues, onEditValuesChange }) {
  const fields = [
    {
      name: "title",
      label: "Title",
      className: "w-full rounded-md my-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "author",
      label: "Author",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "isbn",
      label: "ISBN",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "genre",
      label: "Genre",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "description",
      label: "Description",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "publishedYear",
      label: "Published Year",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
    {
      name: "language",
      label: "Language",
      className: "w-full rounded-md mb-2 p-1 border-[#bccdbc] border-2",
    },
  ];

  return (
    <>
      {fields.map((field) => (
        <input
          key={field.name}
          type="text"
          value={editValues[field.name] || ""}
          onChange={(e) =>
            onEditValuesChange({
              ...editValues,
              [field.name]: e.target.value,
            })
          }
          placeholder={field.label}
          className={field.className}
        />
      ))}
    </>
  );
}
