
type IGenericActionType<T, Name extends string> = {
    [K in keyof T]: {
        type: `${Name}_${Extract<K, string>}`,
        payload: T[K]
    }
}[keyof T];

export default IGenericActionType;