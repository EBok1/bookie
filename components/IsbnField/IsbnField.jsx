import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export const ISBNField = ({
  value,
  onChange,
  error,
  infoOpen,
  onToggleInfo,
}) => {
  return (
    <>
      <div className="flex items-center mb-2">
        <input
          type="number"
          placeholder="ISBN: 9781649379290"
          className={`w-full p-1 border-2 rounded-md ${
            error ? "border-pink-500" : "border-[#bccdbc]"
          } focus:border-blue-500`}
          value={value}
          onChange={onChange}
          minLength="10"
          maxLength="13"
        />
        <button
          className="relative group"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleInfo();
          }}
        >
          <FontAwesomeIcon icon={faCircleInfo} className="text-[#3D5E3F] hover:text-[#6fa272] mx-2" />

          {infoOpen && (
            <div className="absolute bottom-full mb-2 transform -translate-x-3/4 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3 w-56 sm:w-64 md:w-72 max-w-sm text-left">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                What is an ISBN?
              </h3>
              <p className="text-md text-gray-600 leading-relaxed">
                The ISBN is a 13-digit number usually found on the back of your
                book near the barcode. This helps us find the right book!
              </p>
              <div className="absolute top-full right-6 md:right-10 transform -translate-x-3/4 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
            </div>
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
    </>
  );
};
