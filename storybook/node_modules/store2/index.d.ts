export interface StoredData {
  [key: string]: any;
}
export type Replacer = (key: any, value: any) => string | String[] | number[];
export type Reviver = (key: string, value: any) => any;
export type EachFn = (key: any, data: any) => false | any;
export type TransactFn = (data: any) => any | undefined;

type BaseSet = (key: any, data: any) => any;
type BaseGet = (key: any) => any;
type BaseSetAll = (obj: Object) => StoredData;
type BaseGetAll = () => StoredData;
type BaseTransact = (fn: EachFn, value?: any) => StoredData;
type BaseClear = (clear: false) => StoreBase;
export type Base = BaseSet & BaseGet & BaseSetAll & BaseGetAll & BaseTransact & BaseClear;

export interface StoreAPI {
  clear(): StoreBase;
  clearAll(): StoreBase;
  each(callback: EachFn): StoreBase;
  get(key: any, alt?: any|Reviver): any;
  getAll(fillObj?: StoredData): StoredData;
  has(key: any): boolean;
  isFake(force?: boolean): boolean;
  keys(fillList?: string[]): string[];
  namespace(namespace: string, noSession?: true): StoreType;
  remove(key: any, alt?: any|Reviver): any;
  set(key: any, data: any, overwrite?: boolean|Replacer): any;
  setAll(data: Object, overwrite?: boolean|Replacer): StoredData;
  add(key: any, data: any): any;
  size(): number;
  transact(key: any, fn: TransactFn, alt?: any|Reviver): StoreBase;
}

export type StoreBase = StoreAPI & Base;

export type StoreType = StoreBase & {
  local: StoreBase;
  session: StoreBase;
  page: StoreBase;
};

declare const store: StoreType
export default store
