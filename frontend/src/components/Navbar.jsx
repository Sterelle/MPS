import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import useCartStore from '../store/cartStore';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const { totalItems } = useCartStore();
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-accent-DEFAULT">
              Maison Panafricaine
            </span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-primary-dark transition-colors">
              Accueil
            </Link>
            <Link to="/shop" className="font-medium hover:text-primary-dark transition-colors">
              Boutique
            </Link>
            <Link to="/about" className="font-medium hover:text-primary-dark transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="font-medium hover:text-primary-dark transition-colors">
              Contact
            </Link>
          </nav>
          
          {/* Search, Cart, User - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} />
              </button>
            </form>
            
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User size={24} />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Mon profil
                  </Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                    Mes commandes
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100">
                      Administration
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Connexion
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium" onClick={toggleMenu}>
                Accueil
              </Link>
              <Link to="/shop" className="font-medium" onClick={toggleMenu}>
                Boutique
              </Link>
              <Link to="/about" className="font-medium" onClick={toggleMenu}>
                À propos
              </Link>
              <Link to="/contact" className="font-medium" onClick={toggleMenu}>
                Contact
              </Link>
              
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search size={18} />
                </button>
              </form>
              
              <div className="flex justify-between">
                <Link to="/cart" className="flex items-center space-x-2" onClick={toggleMenu}>
                  <ShoppingCart size={20} />
                  <span>Panier ({totalItems})</span>
                </Link>
                
                {isAuthenticated ? (
                  <div className="flex flex-col space-y-2">
                    <Link to="/profile" className="font-medium" onClick={toggleMenu}>
                      Mon profil
                    </Link>
                    <Link to="/orders" className="font-medium" onClick={toggleMenu}>
                      Mes commandes
                    </Link>
                    {user?.role === 'admin' && (
                      <Link to="/admin" className="font-medium" onClick={toggleMenu}>
                        Administration
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        toggleMenu();
                      }}
                      className="font-medium text-left"
                    >
                      Déconnexion
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="btn btn-primary" onClick={toggleMenu}>
                    Connexion
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar; 