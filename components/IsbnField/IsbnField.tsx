import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ChangeEvent } from "react";

type ISBNFieldProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  infoOpen: boolean;
  onToggleInfo: () => void;
};

export const ISBNField = ({
  value,
  onChange,
  error,
  infoOpen,
  onToggleInfo,
}: ISBNFieldProps ) => {
  return (
    <>
      <div className="flex items-center mt-4 mb-1">
        <h2>ISBN*</h2>
        <button
          className="relative ml-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleInfo();
          }}
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            className="text-[#3D5E3F] hover:text-[#6fa272] cursor-pointer"
          />
          {infoOpen && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 w-56 sm:w-64 md:w-72 text-left">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                What is an ISBN?
              </h3>
              <p className="text-md text-gray-600 leading-relaxed">
                The ISBN is a 13-digit number usually found on the back of your
                book near the barcode. This helps us find the right book!
              </p>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          )}
        </button>
      </div>

      <div className="flex items-center mb-2">
        <input
          type="number"
          placeholder="ISBN: 9781649379290*"
          className={`w-full p-1 border-2 rounded-md ${
            error ? "border-pink-500" : "border-[#bccdbc]"
          } focus:border-blue-500`}
          value={value}
          onChange={onChange}
          minLength={10}
          maxLength={13}
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    </>
  );
};
