import { useContext, createContext } from 'react';

interface Store {
    username: string;
    uuid: string 
}


const StoreContext = createContext<Store | null>(null);

export const StoreProvider = StoreContext.Provider;
 
export const useStore = (): Store => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
}
