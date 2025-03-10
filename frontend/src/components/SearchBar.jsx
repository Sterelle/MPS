import { Search } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange({ target: { value: searchTerm } });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          type="search"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border-gray-300 pl-10 pr-4 py-2 focus:border-primary focus:ring-primary"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary px-2 py-1 text-xs text-white"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 