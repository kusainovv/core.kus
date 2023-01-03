import { useCallback, useState } from "react";

interface CopyTextOutputData {
    value: null | string,
    copy: (text: string) => boolean
}

/**
 * @param isAddCopyRight - add copyright text to copy text
 * @param copyRight - text for copy right
 * @returns value text for copy, copy function for copy text
 */
export const useCopyText = (isAddCopyRight: boolean, copyRight: string) : CopyTextOutputData => {
    const [value, setValue] = useState<string | null>(null);
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
            (window.navigator.clipboard as Clipboard).writeText(text);
            setValue(`${text} ${isAddCopyRight ? copyRight : null}`);
            return true;
        } catch(error) {
            console.error('Copy failed', error);
            setValue(null);
            return false;
        }
    }, [ isAddCopyRight, copyRight ])

    return {
        value,
        copy
    }
}