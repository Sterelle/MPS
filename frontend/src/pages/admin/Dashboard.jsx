import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Users, 
  CreditCard, 
  TrendingUp,
  Package,
  Clock
} from 'lucide-react';
import { orderService, productService } from '../../services/supabase';

const StatCard = ({ title, value, icon: Icon, trend }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '+' : ''}{trend}% vs mois dernier
          </p>
        )}
      </div>
      <div className="p-3 bg-primary rounded-lg">
        <Icon size={24} className="text-accent-DEFAULT" />
      </div>
    </div>
  </div>
);

const RecentOrder = ({ order }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Package size={20} className="text-gray-600" />
      </div>
      <div>
        <p className="font-medium">Commande #{order.id}</p>
        <p className="text-sm text-gray-500">{order.customer}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium">{order.total} €</p>
      <p className="text-sm text-gray-500">{order.date}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    revenueGrowth: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Ici, vous feriez vos appels API pour récupérer les vraies données
        // Pour l'exemple, on utilise des données statiques
        setStats({
          totalOrders: 156,
          totalCustomers: 89,
          totalRevenue: 12450,
          revenueGrowth: 12.5,
        });

        setRecentOrders([
          {
            id: '1234',
            customer: 'John Doe',
            total: '239.99',
            date: '2024-02-20',
            status: 'completed',
          },
          // ... autres commandes
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <button className="btn btn-primary">
          Télécharger le rapport
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Commandes totales"
          value={stats.totalOrders}
          icon={ShoppingBag}
          trend={8.2}
        />
        <StatCard
          title="Clients"
          value={stats.totalCustomers}
          icon={Users}
          trend={12.1}
        />
        <StatCard
          title="Revenu total"
          value={`${stats.totalRevenue} €`}
          icon={CreditCard}
          trend={stats.revenueGrowth}
        />
        <StatCard
          title="Croissance"
          value="+12.5%"
          icon={TrendingUp}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graphique des ventes (à implémenter) */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">Aperçu des ventes</h2>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            Graphique à venir
          </div>
        </div>

        {/* Commandes récentes */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Commandes récentes</h2>
            <Clock size={20} className="text-gray-500" />
          </div>
          <div className="divide-y">
            {recentOrders.map((order) => (
              <RecentOrder key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 