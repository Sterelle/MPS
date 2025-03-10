import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/supabase';
import useCartStore from '../store/cartStore';
import { toast } from 'react-hot-toast';
import { ArrowLeft, ShoppingCart } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data, error } = await productService.getProductById(id);
        
        if (error) throw error;
        if (!data) throw new Error('Produit non trouvé');
        
        setProduct(data);
      } catch (err) {
        console.error('Erreur lors du chargement du produit:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        quantity
      });
      toast.success('Produit ajouté au panier');
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500">Erreur</h2>
          <p className="mt-2 text-gray-600">{error || 'Produit non trouvé'}</p>
          <Link to="/shop" className="mt-6 inline-block btn btn-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link to="/shop" className="mb-8 inline-flex items-center text-gray-600 hover:text-primary">
        <ArrowLeft size={20} className="mr-2" />
        Retour à la boutique
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.image_url || 'https://via.placeholder.com/600'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-primary">{product.price} €</p>
          
          <div className="mt-6">
            <p className="text-gray-600">{product.description}</p>
          </div>
          
          <div className="mt-8">
            <div className="mb-4">
              <label htmlFor="quantity" className="label">
                Quantité
              </label>
              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="input w-24"
              />
            </div>
            
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full"
            >
              <ShoppingCart size={20} className="mr-2" />
              Ajouter au panier
            </button>
          </div>
          
          <div className="mt-8 rounded-lg bg-gray-50 p-4">
            <h3 className="font-semibold">Détails du produit</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-600">
              <li>Catégorie: {product.category}</li>
              {product.stock > 0 ? (
                <li className="text-green-600">En stock: {product.stock} disponibles</li>
              ) : (
                <li className="text-red-600">Rupture de stock</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage; 