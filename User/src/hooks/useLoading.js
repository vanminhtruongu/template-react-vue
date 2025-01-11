import { create } from 'zustand'

const useLoading = create((set) => ({
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    showLoading: () => set({ isLoading: true }),
    hideLoading: () => set({ isLoading: false })
}))

export default useLoading 