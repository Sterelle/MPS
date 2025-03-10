import { useState } from 'react';

const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'vetements', name: 'Vêtements' },
  { id: 'accessoires', name: 'Accessoires' },
  { id: 'art', name: 'Art & Décoration' },
  { id: 'bijoux', name: 'Bijoux' }
];

const CategoryFilter = ({ currentCategory, onChange }) => {
  return (
    <div className="mb-8">
      <h3 className="mb-4 text-lg font-semibold">Catégories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChange(category.id)}
            className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
              currentCategory === category.id
                ? 'bg-primary text-white'
                : 'hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 