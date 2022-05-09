import create from 'zustand'
import useMainStore from './MainStore';

const useStore = () => {
    return { useMainStore }
}

export default useStore;