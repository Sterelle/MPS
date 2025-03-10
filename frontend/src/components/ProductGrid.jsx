import ProductCard from './ProductCard';
import { ShoppingBagIcon } from 'lucide-react';

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <span className="text-red-500">Une erreur est survenue</span>
        <p className="mt-2 text-sm text-gray-500">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center">
        <ShoppingBagIcon className="h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-lg font-medium">Aucun produit trouvé</h3>
        <p className="mt-1 text-sm text-gray-500">
          Essayez de modifier vos filtres ou votre recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 