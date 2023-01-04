import { useCallback, useEffect, useState } from "react";
import { prepare } from "./prepare";
import { useSSR } from "./useSSR"


class CookieCore {
    public cookie = document.cookie;

    public Add(cookie: string) {
        this.cookie = cookie;
    }

    public Delete(field: string) {
        this.cookie = field;
    }

    public Change(cookie: string) {
        this.cookie = cookie;
    }

    public Clear() {
        this.cookie = '';
    }

    public Get() {
        return this.cookie;
    }
}


class Cookie extends CookieCore {
    public get = () => this.Get();
    public delete = (field: string) => this.Delete(field);
    public change = (field: string, value: string) => this.Change(`${field}=${value}`);
    public clear = () => this.Clear();
    public add = (cookie_attribute: string, cookie_value: string) => this.Add(`${cookie_attribute}=${cookie_value}`);
} 




export const useCookie = () => {
    const { hydrationProccessCompleted } = useSSR();

    const [errors, setErrors] = useState<string>('');

    useEffect(() => {
        if (hydrationProccessCompleted && !window.navigator.cookieEnabled) {
            setErrors('Cookie was disabled');
        }
    }, [hydrationProccessCompleted]);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const cookies = hydrationProccessCompleted ? new Cookie() : null;
    const addCookie = (cookie_attribute: string, cookie_value: string) => prepare(() => cookies?.add(cookie_attribute, cookie_value), 'add');
    const getCookies = () => prepare(cookies?.get, 'get');
    const clearCookie = () => prepare(cookies?.clear, 'clear');
    const changeCookieValue = (cookie_attribute: string, cookie_value: string) => prepare(() => cookies?.change(cookie_attribute, cookie_value), 'change');
    const deleteCookieField = (cookie_attribute: string) => prepare(() => cookies?.delete(cookie_attribute), 'delete');

    return {
        addCookie,
        getCookies,
        clearCookie,
        changeCookieValue,
        deleteCookieField,
        errors
    }
}
