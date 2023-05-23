/* eslint-disable react/display-name */
import react, { ReactElement, useMemo } from 'react';
import { cx } from "@chakra-ui/shared-utils"
import root from 'react-shadow';

type ModifierObj = Record<string, any>

export const ModifierContext = react.createContext<ModifierObj>({});

export const useModifiers = () => {
    const ctx = react.useContext(ModifierContext);

    if (!ctx) {
        throw new Error('useModifiers must be used within a ModifierProvider');
    }

    return ctx;

}

const useRootCtx = (): ModifierObj => {
    const ctx = react.useContext(ModifierContext);

    if (!ctx) {
        return {} as ModifierObj;
    }

    return ctx;

}


export const ModifierProvider = ({ modifiers, children }) => {
    const ctx = useRootCtx();
    const mergedModifiers = useMemo(() => {
        return {
            ...ctx?.modifiers,
            ...modifiers
        }
    }, [ctx?.modifiers, modifiers]);

    return <ModifierContext.Provider value={{ modifiers: mergedModifiers, rawModifiers: modifiers }}>
        {children}
    </ModifierContext.Provider>
}


export const ComponentContext = react.createContext({
    name: '',
    map: {}
});


export const useComponentCtx = () => {
    return react.useContext(ComponentContext);
}

export const ComponentProvider = ({ name, children }) => {
    const modifiers = useModifiers();

    const { type, color } = modifiers.modifiers;

    const [styleSheets, setStyleSheets] = react.useState<CSSStyleSheet[]>([]);
    let cssSync = null
    const css = useMemo(async () => {

        if (process.browser) {
            const { default: sheet } = await import(
                `../${name}/${name}.tokens`,
                {
                    assert: { type: "css" },
                }
            );

            const { default: sheet2 } = await import(
                `../${name}/tokens/${name}-${type}-${color}.tokens`,
                {
                    assert: { type: "css" },
                }
            );

            const stylesheet = new CSSStyleSheet(); -

                console.log(sheet2)
            // Add some CSS
            stylesheet.replaceSync(sheet2 + sheet)

            console.log(stylesheet
            )

            setStyleSheets([stylesheet])


            // setStyleSheets([sheet]);
            return sheet;
        }
    }, [type, color]);


    return <ComponentContext.Provider value={{ name, map: cssSync || css }}>
        <root.div styleSheets={styleSheets}>
            {children}
        </root.div>
    </ComponentContext.Provider>
}

export const wrapTokens = (Element: React.ReactElement, selector?: string) => ({ className, children }) => {

    const { name, map } = useComponentCtx();
    const selectorClass = map[`${name}__${selector}`];

    const klass = cx(selectorClass, `${name}__${selector}`, className);


    //@ts-ignore
    return <Element className={klass}>
        {children}
    </Element>
} 