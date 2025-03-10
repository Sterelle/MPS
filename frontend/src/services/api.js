import { supabase } from './supabase';

// Produits
export const getProducts = async(page = 1, limit = 10, filters = {}) => {
    let query = supabase
        .from('products')
        .select('*', { count: 'exact' });

    // Appliquer les filtres
    if (filters.category) {
        query = query.eq('category', filters.category);
    }

    if (filters.minPrice) {
        query = query.gte('price', filters.minPrice);
    }

    if (filters.maxPrice) {
        query = query.lte('price', filters.maxPrice);
    }

    if (filters.search) {
        query = query.ilike('name', `%${filters.search}%`);
    }

    // Pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await query
        .range(from, to)
        .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, count, totalPages: Math.ceil(count / limit) };
};

export const getProductById = async(id) => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;

    return data;
};

// Commandes
export const createOrder = async(orderData) => {
    const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

    if (error) throw error;

    return data[0];
};

export const getOrdersByUser = async(userId) => {
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
};

// Authentification
export const signUp = async(email, password, userData) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: userData
        }
    });

    if (error) throw error;

    return data;
};

export const signIn = async(email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;

    return data;
};

export const signOut = async() => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
};

// Admin
export const getAdminProducts = async() => {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return data;
};

export const createProduct = async(productData) => {
    const { data, error } = await supabase
        .from('products')
        .insert([productData])
        .select();

    if (error) throw error;

    return data[0];
};

export const updateProduct = async(id, productData) => {
    const { data, error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', id)
        .select();

    if (error) throw error;

    return data[0];
};

export const deleteProduct = async(id) => {
    const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

    if (error) throw error;

    return true;
};

export const uploadProductImage = async(file, path) => {
    const { data, error } = await supabase.storage
        .from('product-images')
        .upload(path, file);

    if (error) throw error;

    return data;
};