import React from "react";

interface IPaginationProps {
  className?: string;
  style?: React.CSSProperties;
  total: number;
  current: number;
  hasNext: boolean;
  hasPrev: boolean;
  onChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = (props) => {
  const { className, style, total, current, hasNext, hasPrev, onChange } =
    props;

  const handlePrev = () => {
    if (hasPrev) {
      onChange(current - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onChange(parseInt(current.toString()) + 1);
    }
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={style}
    >
      <button
        className={`px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-in-out ${
          hasPrev ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={handlePrev}
      >
        Prev
      </button>
      <div className="px-4 py-2">{current}</div>
      <button
        className={`px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 ease-in-out ${
          hasNext ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
