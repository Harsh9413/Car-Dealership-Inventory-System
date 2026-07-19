interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by make, model or category..."
      className="w-full rounded-lg border border-slate-300 px-4 py-3"
    />
  );
}

export default SearchBar;