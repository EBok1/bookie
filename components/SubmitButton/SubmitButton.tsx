type SubmitButtonProps = {
  isLoading: boolean;
  submitText?: string;
};

export const SubmitButton = ({
  isLoading,
  submitText = "Submit",
}: SubmitButtonProps) => {
  return (
    <>
      <div className="gap-2 flex justify-center mt-4">
        <button
          className="bg-[#bccdbc] text-black disabled:opacity-50 rounded-full text-sm font-medium px-3 py-1"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : submitText}
        </button>
      </div>
    </>
  );
};
