import create from 'zustand'

const useStore = create((set) => ({
    people: ['john doe', 'jane doe'],
    addPerson: (person) =>
        set((state) => ({ people: [...state.people, person] }))
}))

export default useStore;