export function generateActionTypeIds<T extends object>(actionTypes: T, prefix: string): Record<keyof T, string> {
    return Object.keys(actionTypes).reduce((acc, key) => {
        acc[key as keyof T] = `${prefix}_${key}`;
        return acc;
    }, {} as Record<keyof T, string>);
}