import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL
const supabaseKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase credentials missing. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Services d'authentification
export const authService = {
    // Inscription
    signUp: async(email, password, userData) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: userData,
            },
        });
        return { data, error };
    },

    // Connexion
    signIn: async(email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        return { data, error };
    },

    // Déconnexion
    signOut: async() => {
        const { error } = await supabase.auth.signOut();
        return { error };
    },

    // Récupérer l'utilisateur actuel
    getCurrentUser: async() => {
        const { data, error } = await supabase.auth.getUser();
        return { data, error };
    },
};

// Services pour les produits
export const productService = {
    // Récupérer tous les produits
    getProducts: async(page = 1, limit = 10, filters = {}) => {
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

        return { data, error, count, page, limit };
    },

    // Récupérer un produit par son ID
    getProductById: async(id) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        return { data, error };
    },

    // Ajouter un produit (admin)
    addProduct: async(product) => {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        return { data, error };
    },

    // Mettre à jour un produit (admin)
    updateProduct: async(id, updates) => {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select();

        return { data, error };
    },

    // Supprimer un produit (admin)
    deleteProduct: async(id) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        return { error };
    },
};

// Services pour les commandes
export const orderService = {
    // Créer une commande
    createOrder: async(orderData) => {
        const { data, error } = await supabase
            .from('orders')
            .insert([orderData])
            .select();

        return { data, error };
    },

    // Récupérer les commandes d'un utilisateur
    getUserOrders: async(userId) => {
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

        return { data, error };
    },

    // Récupérer toutes les commandes (admin)
    getAllOrders: async() => {
        const { data, error } = await supabase
            .from('orders')
            .select(`
        *,
        user:users (*),
        order_items (
          *,
          product:products (*)
        )
      `)
            .order('created_at', { ascending: false });

        return { data, error };
    },

    // Mettre à jour le statut d'une commande (admin)
    updateOrderStatus: async(orderId, status) => {
        const { data, error } = await supabase
            .from('orders')
            .update({ status })
            .eq('id', orderId)
            .select();

        return { data, error };
    },
};