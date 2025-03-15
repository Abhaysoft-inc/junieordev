import { create } from 'zustand'

interface SearchState {
    errorText: string
    codeText: string
    setSearchData: (error: string, code: string) => void
    clearSearchData: () => void
}

export const useSearchStore = create<SearchState>((set) => ({
    errorText: '',
    codeText: '',
    setSearchData: (error, code) => set({ errorText: error, codeText: code }),
    clearSearchData: () => set({ errorText: '', codeText: '' })
}))