import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-16 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Page non trouvée</h2>
      <p className="mt-2 text-gray-600">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/" className="btn btn-primary mt-8 inline-block">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage; 