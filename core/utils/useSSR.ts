import { useEffect, useState } from "react"

/**
 * @returns isBrowser and isServer boolean flags, if all client objects were uploaded hydrationProccessCompleted
 */
export const useSSR = () => {
    const [isHydration, setHydration] = useState(false);
    const [isDOM, setDOM] = useState<boolean | null>(null);
    
    useEffect(() => {
        if (typeof window === 'undefined' && (window as Window)?.document && (window as Window)?.document?.documentElement) {
            setDOM(true);
        }

        if (
            typeof window !== 'undefined'
            && window.document
            && typeof document !== 'undefined'
            && Object.keys(document).length
        ) {
            setHydration(true);
        }
    }, []);

    return {
        isBrowser: isDOM,
        isServer: !isDOM,

        hydrationProccessCompleted: isHydration
    }
}