import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authService } from '../services/supabase'

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            session: null,
            loading: true,
            error: null,

            setUser: (user) => set({ user }),
            setSession: (session) => set({ session }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            initialize: async() => {
                try {
                    set({ loading: true })
                    const { data, error } = await authService.getCurrentUser()

                    if (error) throw error

                    if (data.user) {
                        set({
                            user: data.user,
                            session: data.session,
                            loading: false
                        })
                    } else {
                        set({ user: null, session: null, loading: false })
                    }
                } catch (error) {
                    console.error('Erreur d\'initialisation de l\'authentification:', error)
                    set({ user: null, session: null, loading: false })
                }
            },

            login: async(email, password) => {
                const { data, error } = await authService.signIn(email, password)

                if (error) throw error

                set({
                    user: data.user,
                    session: data.session
                })

                return data
            },

            register: async(email, password, firstName, lastName) => {
                const userData = {
                    first_name: firstName,
                    last_name: lastName,
                }

                const { data, error } = await authService.signUp(email, password, userData)

                if (error) throw error

                set({
                    user: data.user,
                    session: data.session
                })

                return data
            },

            logout: async() => {
                const { error } = await authService.signOut()

                if (error) throw error

                set({ user: null, session: null })
            },

            isAuthenticated: () => {
                return !!get().user
            },

            isAdmin: () => {
                const user = get().user
                return user && user.role === 'admin'
            },
        }), {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, session: state.session }),
        }
    )
)

export default useAuthStore