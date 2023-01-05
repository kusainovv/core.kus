import { LanguageCode } from "../../core/components/LanguageProvider";
import { enMessages } from "./enMessages";
import { ruMessages } from "./ruMessages";

export const dictionary = (lang: LanguageCode) => {

    return lang === 'en' ? enMessages : ruMessages;

}