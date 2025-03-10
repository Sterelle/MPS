import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Header = () => {
  const { user, logout } = useAuthStore();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            E-Boutique
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              Accueil
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
              }
            >
              Boutique
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className="h-6 w-6" />
                </button>
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden group-hover:block">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Mon profil
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin/products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Administration
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-gray-600 hover:text-primary"
              >
                <User className="h-6 w-6" />
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="mt-4 space-y-4 md:hidden">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `block py-2 ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Boutique
            </NavLink>
            {!user && (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block py-2 ${isActive ? 'text-primary font-medium' : 'text-gray-600'}`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </NavLink>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 