import React, { createContext, useContext } from "react";
import { Toaster } from 'react-hot-toast';
import { useSelector } from "react-redux";
import { RootState } from "../state/reducers/rootReducer";

type CommonContextType = {
    children: React.ReactNode
}

type CommonStoreType = {
   
}

const CommonContext = createContext({} as CommonStoreType);
const useCommonContext = () => useContext(CommonContext)
const CommonProvider = ({ children }: CommonContextType) => {
    const user = useSelector((state: RootState) => state.auth.user)
    

    const store: CommonStoreType = {
       

    }
    return (
        <CommonContext.Provider value={store}>
            {children}

            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: '#1B7F36',
                            color: "#fff"
                        },
                    },
                    error: {
                        style: {
                            background: '#A30F26',
                            color: "#fff"

                        },
                    },
                    position: "bottom-right"
                }}
            />
        </CommonContext.Provider>
    );
}
export {
    CommonProvider,
    useCommonContext
};

