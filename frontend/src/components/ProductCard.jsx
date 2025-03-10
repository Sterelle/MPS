import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      ...product,
      quantity: 1
    });
    
    toast.success('Produit ajouté au panier');
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image_url || 'https://via.placeholder.com/300'}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 rounded-full bg-white p-2 shadow-md transition-transform hover:scale-110"
            aria-label="Ajouter au panier"
          >
            <ShoppingCart size={20} className="text-primary" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{product.name}</h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-semibold">{product.price} €</span>
            <span className="text-sm text-gray-500">{product.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 