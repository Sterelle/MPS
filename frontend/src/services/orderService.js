import { supabase } from './supabase';

export const createOrder = async(orderData) => {
    try {
        // Créer la commande
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert([{
                user_id: orderData.userId,
                total: orderData.total,
                status: 'pending',
                shipping_address: orderData.shippingAddress
            }])
            .select()
            .single();

        if (orderError) throw orderError;

        // Créer les items de la commande
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems);

        if (itemsError) throw itemsError;

        return order;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getOrders = async(userId) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    product:products (*)
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const getAllOrders = async() => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                user:profiles (*),
                order_items (
                    *,
                    product:products (*)
                )
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
        throw error;
    }
};

export const updateOrderStatus = async(orderId, status) => {
    try {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};