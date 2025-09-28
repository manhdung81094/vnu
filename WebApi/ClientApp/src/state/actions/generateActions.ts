import { baseAction } from "./IActionBase";

type ExtractPayloadType<T> = T extends Array<infer U> ? U[] : T;

// dùng để generateActions cả 1 object
export function generateActions<T extends Record<string, any>>(
  actionTypes: T,
  prefix: string
): {
  [K in keyof T]: (payload: ExtractPayloadType<T[K]>) => any;
} {
  const actions: any = {};

  (Object.keys(actionTypes) as Array<keyof T>).forEach((key: any) => {
    actions[key] = (payload: ExtractPayloadType<T[typeof key]>) =>
      baseAction(`${prefix}_${key}`, payload);
  });

  return actions;
}
// dùng để generateActions 1 field trong 1 object, có thể chạy preProcessFunc trước khi return
// ví dụ chạy thông báo NotifyHelper.Error("xxx") trước khi return baseAction
// export function generateActionForKey<T extends Record<string, any>>(
//     actionTypes: T,
//     prefix: string,
//     key: keyof T,
//     preProcessFunc: (payload?: ExtractPayloadType<T[typeof key]>) => any
// ) {
//     const action = {
//         [key]: (payload: ExtractPayloadType<T[typeof key]>) => {
//             if (preProcessFunc) preProcessFunc(payload);
//             return baseAction(`${prefix}_${key.toString().toUpperCase()}`, payload);
//         }
//     } as Record<keyof T, (payload: ExtractPayloadType<T[keyof T]>) => any>;

//     return action[key];
// }
// dùng để generateActions 1 field trong 1 object, có thể chạy preProcessFunc trước khi return
// ví dụ chạy thông báo NotifyHelper.Error("xxx") trước khi return baseAction
type ActionFunction<Payload> = (payload: Payload) => any;
type ActionObject<T> = {
  [K in keyof T]: ActionFunction<ExtractPayloadType<T[K]>>;
};
export function generateActionForKey<
  T extends Record<string, any>,
  K extends keyof T
>(
  actionTypes: T,
  prefix: string,
  key: K,
  preProcessFunc?: (payload: ExtractPayloadType<T[K]>) => any
): { [P in K]: ActionFunction<ExtractPayloadType<T[P]>> } {
  const action = {
    [key]: (payload: ExtractPayloadType<T[typeof key]>) => {
      if (preProcessFunc) preProcessFunc(payload);
      return baseAction(`${prefix}_${key.toString().toUpperCase()}`, payload);
    },
  } as unknown as { [P in K]: ActionFunction<ExtractPayloadType<T[P]>> };

  // Return only the desired key action
  return action;
}
