import { ChangeEvent } from "react";

type SelectGenreProps = {
  value: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  loading: boolean;
  error: string | undefined;
};

export const SelectGenre = ({ 
    value, 
    onChange, 
    options, 
    loading, 
    error 
  }: SelectGenreProps) => {
    return (
      <>
        <select
          value={value}
          onChange={onChange}
          disabled={loading}
          className={`w-full mb-2 p-1 border-2 rounded-md bg-[#FFFFFF] text-[#9CA2AF] ${
            error ? "border-pink-500" : "border-[#bccdbc]"
          } focus:border-blue-500 text-gray-700`}
        >
          <option value="" disabled>
            {loading ? "Loading genres..." : "Select a genre...*"}
          </option>
          {options.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        
        {error && (
          <p className="text-red-500 text-sm mb-2">
            {error}
          </p>
        )}
      </>
    );
  };