import { useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import { ShoppingBag, Trash2 } from 'lucide-react'
import Button from '../components/ui/Button'

const CartPage = () => {
    const { items, updateItemQuantity, removeItem, totalPrice } = useCartStore()

    if (items.length === 0) {
        return (
            <div className="container-custom py-16 text-center">
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400" />
                <h2 className="mt-4 text-2xl font-semibold">Votre panier est vide</h2>
                <p className="mt-2 text-gray-500">
                    Découvrez nos produits et commencez vos achats
                </p>
                <Link to="/shop" className="btn btn-primary mt-8">
                    Voir la boutique
                </Link>
            </div>
        )
    }

    return (
        <div className="container-custom py-8">
            <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border-b">
                            <img 
                                src={item.image_url} 
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-gray-600">{item.price} €</p>
                                <div className="flex items-center gap-4 mt-2">
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))}
                                        className="w-20 input"
                                    />
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold mb-4">Résumé</h3>
                        <div className="flex justify-between mb-4">
                            <span>Total</span>
                            <span className="font-semibold">{totalPrice} €</span>
                        </div>
                        <Button variant="primary" className="w-full">
                            Procéder au paiement
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
