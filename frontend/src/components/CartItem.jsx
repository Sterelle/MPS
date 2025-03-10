import { Minus, Plus, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';

const CartItem = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCartStore();

  return (
    <div className="flex items-center py-6 border-b">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="ml-6 flex-1">
        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{item.price} €</p>
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center border rounded-lg">
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-4 py-2 text-sm">{item.quantity}</span>
            <button
              onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="ml-6">
        <p className="text-sm font-medium text-gray-900">
          {(item.price * item.quantity).toFixed(2)} €
        </p>
      </div>
    </div>
  );
};

export default CartItem; 