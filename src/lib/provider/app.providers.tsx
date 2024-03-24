"use client"

import React from "react";
import type { ReactNode } from "react";

import { useServerInsertedHTML } from "next/navigation";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

import ThemeProvider from "@/lib/provider/theme.provider";
import { TelegramProvider } from "@/lib/provider/telegram.provider";
import AuthProvider from "@/lib/provider/auth.provider";
import { BackendConfig } from "@/openapi/client";
import TransactionProgressProvider from "./txProgress.provider";

export type AppContextType = {
    toggleDrawer: (value: boolean) => void
    toggleFilter: (value: boolean) => void
    isDrawerOpen: boolean
    isFilterOpen: boolean
    config: BackendConfig | null;
}

type Props = {
    children: ReactNode;
    options: { key: string };
    config: BackendConfig | null;
};

const AppContext = React.createContext<AppContextType>({
    isFilterOpen: false,
    toggleDrawer: (value: boolean) => undefined,
    toggleFilter: (value: boolean) => undefined,
    isDrawerOpen: false,
    config: null,
})

// this manifest is used temporarily for development purposes
const manifestUrl =
    "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

const AppProviders = (props: Props) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [isFilterOpen, setIsFilterOpen] = React.useState(false)

    const [{ cache, flush }] = React.useState(() => {
        const cache = createCache(props.options);
        cache.compat = true;
        const prevInsert = cache.insert;
        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };
        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = '';
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(' ')}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    const toggleDrawer = (value: boolean) => {
        setIsDrawerOpen(value)
    }
    const toggleFilter = (value: boolean) => {
        setIsFilterOpen(value)
    }

    const memoValue = React.useMemo(
        () => ({
            isFilterOpen,
            isDrawerOpen,
            toggleDrawer,
            toggleFilter,
            config: props.config,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isDrawerOpen, isFilterOpen]
    )

    return (
        <TelegramProvider>
            <AppContext.Provider value={memoValue}>
                <TonConnectUIProvider manifestUrl={manifestUrl}>
                    <AuthProvider>
                        <TransactionProgressProvider>
                            <CacheProvider value={cache}>
                                <ThemeProvider>
                                    {props.children}
                                </ThemeProvider>
                            </CacheProvider>
                        </TransactionProgressProvider>
                    </AuthProvider>
                </TonConnectUIProvider>
            </AppContext.Provider>
        </TelegramProvider>
    );
};


export const useAppContext = (): AppContextType => {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProviders')
    }
    return context
}


export default AppProviders;
