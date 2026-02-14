import { useContext, createContext, useState, ReactNode } from 'react';

interface Store {
    username: string;
    uuid: string;
    [key: string]: any;
}

interface StoreContextType {
    state: Store;
    setState: (newState: Partial<Store>) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider = ({ children, initialState = {} }: { children: ReactNode; initialState?: Partial<Store> }) => {
    const [state, setState] = useState<Store>({
        username: '',
        uuid: '',
        ...initialState,
    });

    const handleSetState = (newState: Partial<Store>) => {
        setState(prev => ({ ...prev, ...newState }));
    };

    return (
        <StoreContext.Provider value={{ state, setState: handleSetState }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = (): [Store, (newState: Partial<Store>) => void] => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return [context.state, context.setState];
};
