import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { productService } from '../services/supabase';
import ProductGrid from '../components/ProductGrid';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import Loading from '../components/ui/Loading';

const categories = [
  { id: 'all', name: 'Tous les produits' },
  { id: 'vetements', name: 'Vêtements' },
  { id: 'accessoires', name: 'Accessoires' },
  { id: 'art', name: 'Art & Décoration' },
  { id: 'bijoux', name: 'Bijoux' }
];

const sortOptions = [
  { value: 'newest', label: 'Plus récents' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'name-asc', label: 'Nom A-Z' },
  { value: 'name-desc', label: 'Nom Z-A' }
];

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const category = searchParams.get('category') || 'all';
  const sort = searchParams.get('sort') || 'newest';
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await productService.getProducts({
          category: category !== 'all' ? category : null,
          search: search || null
        });
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, search]);

  const handleCategoryChange = (categoryId) => {
    setSearchParams(prev => {
      if (categoryId === 'all') {
        prev.delete('category');
      } else {
        prev.set('category', categoryId);
      }
      return prev;
    });
  };

  const handleSortChange = (e) => {
    setSearchParams(prev => {
      prev.set('sort', e.target.value);
      return prev;
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    
    setSearchParams(prev => {
      if (query) {
        prev.set('search', query);
      } else {
        prev.delete('search');
      }
      return prev;
    });
  };

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64">
          <CategoryFilter 
            currentCategory={category}
            onChange={(cat) => setSearchParams({ category: cat })}
          />
        </aside>
        
        <main className="flex-1">
          <SearchBar 
            value={search}
            onChange={(e) => setSearchParams({ search: e.target.value })}
          />
          <ProductGrid 
            products={products}
            loading={loading}
            error={error}
          />
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
