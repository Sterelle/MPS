import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/supabase';
import ProductCard from '../components/ProductCard';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 'vetements', name: 'Vêtements', image: '/src/assets/category-clothing.jpg' },
    { id: 'accessoires', name: 'Accessoires', image: '/src/assets/category-accessories.jpg' },
    { id: 'art', name: 'Art & Décoration', image: '/src/assets/category-art.jpg' },
    { id: 'bijoux', name: 'Bijoux', image: '/src/assets/category-jewelry.jpg' },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoading(true);
        // Dans un environnement réel, vous auriez une colonne "featured" dans votre table products
        const { data, error } = await productService.getProducts(1, 8);
        
        if (error) throw error;
        
        setFeaturedProducts(data || []);
      } catch (error) {
        console.error('Erreur lors du chargement des produits vedettes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeaturedProducts();
  }, []);
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-accent-DEFAULT py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Découvrez notre collection unique
            </h1>
            <p className="text-lg mb-8 text-accent-dark">
              Des produits de qualité sélectionnés avec soin pour vous.
            </p>
            <Link to="/shop" className="btn bg-accent-DEFAULT text-primary hover:bg-accent-dark">
              <ShoppingBag className="mr-2" size={20} />
              Voir la boutique
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Nos catégories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.id}`}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Produits Vedettes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
