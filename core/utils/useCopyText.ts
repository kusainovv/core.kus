import { useCallback, useEffect, useState } from "react";

interface CopyTextOutputData {
    value: null | string,
    copy: (text: string) => boolean
}


/**
 * @param isAddCopyRight - add copyright text to copy text
 * @param copyRight - text for copy right
 * @param isGlobalCopy - is copy text without control handler
 * @returns value text for copy, copy function for copy text
 */
export const useCopyText = (isAddCopyRight: boolean, copyRight: string, globalCopy?: true | undefined) : CopyTextOutputData => {
    const [value, setValue] = useState<string | null>(null);

    const TextCopyWithoutHandler = (event: KeyboardEvent) => {
        /**
          * The madness about the key events in JS is very popular
          * in this case, we need to check does user pressed @KeyC and @Ctrl
          * but in other browsers their keys code aren't the equivalent
          * instead of, try to use metaKey, ctrlKey, keyCode. 
        */
        if (event.code === 'KeyC' && event.metaKey === false && event.ctrlKey) {
            setValue(`${window.navigator.clipboard.readText()}`);
        }
    }

    // write text in clipboard
    // and add copyright if this's neccessary
    const writeTextInClipboard = (text: string) => {
        (window.navigator.clipboard as Clipboard).writeText(text);
        setValue(`${text} ${isAddCopyRight ? copyRight : null}`);
    }

    useEffect(() => {
        if (globalCopy && typeof window !== 'undefined') {
            window?.addEventListener('keydown', TextCopyWithoutHandler)
        }
        
        return () => window.removeEventListener('keydown', TextCopyWithoutHandler);
    }, [ isAddCopyRight, copyRight, globalCopy ]);


    /**
     * 
     * @param text - tet for copy
     * @returns boolean if navigator exists
    */
    const copy = useCallback((text: string) => {
        if (!window.navigator.clipboard) {
            console.error('Clipboard not supported');
            return false;
        }

        try {
            writeTextInClipboard(text);
            return true;
        } catch(error) {
            console.error('Copy failed', error);
            setValue(null);
            return false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isAddCopyRight, copyRight, globalCopy ])

    return {
        value,
        copy
    }
}