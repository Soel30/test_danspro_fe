import LocationDotIcon from "../../../assets/icons/Mark";
import SearchIcon from "../../../assets/icons/Search";
import React from "react";

interface IFilterProps {
  className?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const Filter: React.FC<IFilterProps> = ({ className, onChange, value }) => {
  const [region, setRegion] = React.useState<string>("");
  const [keyword, setKeyword] = React.useState<string>("");
  const [query, setQuery] = React.useState<string>("");

  const onSubmitdata = () => {
    onChange && onChange(query);
  };

  React.useEffect(() => {
    setQuery(`${region}&${keyword}`);
  }, [region, keyword]);

  return (
    <div className={`grid grid-cols-12 items-center gap-3 ${className}`}>
      <div className="bg-white col-span-12 md:col-span-5 rounded-lg px-5 py-4   flex items-center gap-2">
        <LocationDotIcon width="15" height="15" />
        <input
          className="w-full focus:outline-none text-sm"
          type="text"
          placeholder="Filter By city, state, zip code or country"
          value={value}
          onChange={(e) => setRegion(e.target.value)}
        />
      </div>
      <div className="bg-white  col-span-12 md:col-span-5 rounded-lg px-5 py-4   flex items-center gap-2">
        <SearchIcon width="15" height="15" fill="" />
        <input
          className="w-full  focus:outline-none text-sm"
          type="text"
          placeholder="Filter By Title, Companies, Expertise..."
          value={value}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div className="col-span-12 md:col-span-2">
        <button
          className="bg-cyan-800 hover:bg-cyan-600 transition-all duration-300 ease-in-out text-white px-5 py-2 rounded-lg w-full  text-sm"
          onClick={onSubmitdata}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Filter;
