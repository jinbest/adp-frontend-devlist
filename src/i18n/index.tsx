import React, { useCallback, useMemo, useState } from "react";
import LanguageKeysFr from "./fr";
import LanguageKeys, { LangProps } from "./en";

const fr = new LanguageKeysFr();
const en = new LanguageKeys();

type State = { lang: string; keys: LanguageKeys };

const LangStateContext = React.createContext<State | undefined>(undefined);
const LangUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<"en" | "fr">> | undefined
>(undefined);

const LangProvider: React.FunctionComponent<Record<string, unknown>> = ({ children }:any) => {
  const cntLang = window.localStorage.getItem('cntLang') || 'en';  
  const [lang, setLang] = useState<"en" | "fr">(cntLang === 'en' ? "en" : "fr");
  const value = useMemo(() => {
    return {
      lang,
      keys: lang === "fr" ? fr : en
    };
  }, [lang]);
  return (
    <LangStateContext.Provider value={value}>
      <LangUpdaterContext.Provider value={setLang}>
        {children}
      </LangUpdaterContext.Provider>
    </LangStateContext.Provider>
  );
};

function useLangState() {
  const langState = React.useContext(LangStateContext);
  if (langState === undefined) {
    throw new Error("useLangState must be used within a LangProvider");
  }
  return langState;
}

function useT() {
  const langState = useLangState();
  const t = useCallback(
    (id: LangProps, data?: any): string => {
      const textItem: any = (langState.keys as any)[id];
      const str: string = textItem || id;
      return textItem instanceof Function ? textItem(data) : str;
    },
    [langState]
  );
  return t;
}

function useLang() {
  const langState = useLangState();
  return langState.lang;
}

function useSetLang() {
  const setLang = React.useContext(LangUpdaterContext);
  if (setLang === undefined) {
    throw new Error("useSetLang must be used within a LangProvider");
  }
  return setLang;
}

type Props = { id: LangProps; data?: any };

const T = React.memo(({ id, data }: Props) => {
  const t = useT();
  return <>{t(id, data)}</>;
});

T.displayName = 'Translated Component'

export { LangProvider, useSetLang, useT, useLang, T };
