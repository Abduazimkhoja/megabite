export type Prettify<T> = {
  [K in keyof T]: T[K];
} & object;

export type LangSuffixFields<T extends string, L extends string> = {
  [K in L as `${T}_${K}`]: string;
};

export type CombineLangSuffixFields<T extends string[], L extends string> = {
  [K in T[number] as `${K}_${L}`]: string;
};

// Утилита для развёртывания типов
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// оставляет только объект
export type ExtractObject<T> = T extends object ? T : never;

// оставляет только типы которые есть у обеих типов
export type SharedProperties<T, U> = {
  [K in keyof T & keyof U]: T[K];
};

export type ReplaceType<T, K extends keyof T, NewType> = Omit<T, K> & { [P in K]: NewType };
