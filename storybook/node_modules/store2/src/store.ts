/**
 * Copyright (c) 2021, ESHA Research
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
export interface StoredData {
  [key: string]: any
}
export type Storage = globalThis.Storage
export type ReplaceFn = (key: string, value: any) => string
export type ReviveFn = (key: string, value: string) => any

const _ = {
  version: "<%= pkg.version %>",
  areas: {},
  apis: {},
  replace: undefined,
  revive: undefined,

  // utilities
  inherit: function(api: any, o: object|Function) {
    for (let p in api) {
      let descriptor = Object.getOwnPropertyDescriptor(api, p)
      if (descriptor !== undefined) {
        Object.defineProperty(o, p, descriptor);
      }
    }
    return o;
  },
  stringify: (d: any, fn: ReplaceFn): string => {
    return d === undefined || typeof d === "function" ? d+'' : JSON.stringify(d,fn||_.replace);
  },
  parse: (s: string, fn: ReviveFn): any => {
    // if it doesn't parse, return as is
    try{ return JSON.parse(s,fn||_.revive); }catch(e){ return s; }
  },

  // extension hooks
  fn: function(name: string, fn: Function) {
    _.storeAPI[name] = fn;
    for (let api in _.apis) {
      _.apis[api][name] = fn;
    }
  },
  get: (area: Storage, key: any) => area.getItem(key),
  set: (area: Storage, key: any, string: string) => area.setItem(key, string),
  remove: (area: Storage, key: any) => area.removeItem(key),
  key: (area: Storage, i: number) => area.key(i),
  length: (area: Storage) => area.length,
  clear: (area: Storage) => area.clear(),

  // core functions
  Store: function(id: string, area: Storage, namespace: string) {
    const store = _.inherit(_.storeAPI, (key: any, data: any, overwrite: any) => {
      return arguments.length === 0 ? store.getAll() :
        typeof data === "function" ? store.transact(key, data, overwrite) :// fn=data, alt=overwrite
        data !== undefined ? store.set(key, data, overwrite) :
        (typeof key === "string" || typeof key === "number") ? store.get(key) :
        typeof key === "function" ? store.each(key) :
        !key ? store.clear() :
          store.setAll(key, data)// overwrite=data, data=key
    }) as StoreAPI;
    store._id = id;
    try {
      const testKey = '__store2_test';
      area.setItem(testKey, 'ok');
      store._area = area;
      area.removeItem(testKey);
    } catch (e) {
      store._area = _.storage('fake');
    }
    store._ns = namespace || '';
    if (!_.areas[id]) {
      _.areas[id] = store._area;
    }
    if (!_.apis[store._ns+store._id]) {
      _.apis[store._ns+store._id] = store;
    }
    return store;
  },
        storeAPI: {
            // admin functions
            area: function(id, area) {
                const store = this[id];
                if (!store || !store.area) {
                    store = _.Store(id, area, this._ns);//new area-specific api in this namespace
                    if (!this[id]){ this[id] = store; }
                }
                return store;
            },
            namespace: function(namespace, singleArea) {
                if (!namespace){
                    return this._ns ? this._ns.substring(0,this._ns.length-1) : '';
                }
                const ns = namespace, store = this[ns];
                if (!store || !store.namespace) {
                    store = _.Store(this._id, this._area, this._ns+ns+'.');//new namespaced api
                    if (!this[ns]){ this[ns] = store; }
                    if (!singleArea) {
                        for (let name in _.areas) {
                            store.area(name, _.areas[name]);
                        }
                    }
                }
                return store;
            },
            isFake: function(){ return this._area.name === 'fake'; },
            toString: function() {
                return 'store'+(this._ns?'.'+this.namespace():'')+'['+this._id+']';
            },

            // storage functions
            has: function(key) {
                if (this._area.has) {
                    return this._area.has(this._in(key));//extension hook
                }
                return !!(this._in(key) in this._area);
            },
            size: function(){ return this.keys().length; },
            each: function(fn, fill) {// fill is used by keys(fillList) and getAll(fillList))
                for (let i=0, m=_.length(this._area); i<m; i++) {
                    const key = this._out(_.key(this._area, i));
                    if (key !== undefined) {
                        if (fn.call(this, key, this.get(key), fill) === false) {
                            break;
                        }
                    }
                    if (m > _.length(this._area)) { m--; i--; }// in case of removeItem
                }
                return fill || this;
            },
            keys: function(fillList) {
                return this.each(function(k, v, list){ list.push(k); }, fillList || []);
            },
            get: function(key, alt) {
                const s = _.get(this._area, this._in(key)),
                    fn;
                if (typeof alt === "function") {
                    fn = alt;
                    alt = null;
                }
                return s !== null ? _.parse(s, fn) :
                    alt != null ? alt : s;
            },
            getAll: function(fillObj) {
                return this.each(function(k, v, all){ all[k] = v; }, fillObj || {});
            },
            transact: function(key, fn, alt) {
                const val = this.get(key, alt),
                    ret = fn(val);
                this.set(key, ret === undefined ? val : ret);
                return this;
            },
            set: function(key, data, overwrite) {
                const d = this.get(key),
                    fn;
                if (d != null && overwrite === false) {
                    return data;
                }
                if (typeof overwrite === "function") {
                    fn = overwrite;
                    overwrite = null;
                }
                return _.set(this._area, this._in(key), _.stringify(data, fn), overwrite) || d;
            },
            setAll: function(data, overwrite) {
                const changed, val;
                for (let key in data) {
                    val = data[key];
                    if (this.set(key, val, overwrite) !== val) {
                        changed = true;
                    }
                }
                return changed;
            },
            add: function(key, data) {
                const d = this.get(key);
                if (d instanceof Array) {
                    data = d.concat(data);
                } else if (d !== null) {
                    const type = typeof d;
                    if (type === typeof data && type === 'object') {
                        for (let k in data) {
                            d[k] = data[k];
                        }
                        data = d;
                    } else {
                        data = d + data;
                    }
                }
                _.set(this._area, this._in(key), _.stringify(data));
                return data;
            },
            remove: function(key, alt) {
                const d = this.get(key, alt);
                _.remove(this._area, this._in(key));
                return d;
            },
            clear: function() {
                if (!this._ns) {
                    _.clear(this._area);
                } else {
                    this.each(function(k){ _.remove(this._area, this._in(k)); }, 1);
                }
                return this;
            },
            clearAll: function() {
                const area = this._area;
                for (let id in _.areas) {
                    if (_.areas.hasOwnProperty(id)) {
                        this._area = _.areas[id];
                        this.clear();
                    }
                }
                this._area = area;
                return this;
            },

            // internal use functions
            _in: function(k) {
                if (typeof k !== "string"){ k = _.stringify(k); }
                return this._ns ? this._ns + k : k;
            },
            _out: function(k) {
                return this._ns ?
                    k && k.indexOf(this._ns) === 0 ?
                        k.substring(this._ns.length) :
                        undefined : // so each() knows to skip it
                    k;
            }
        },// end _.storeAPI
        storage: function(name) {
            return _.inherit(_.storageAPI, { items: {}, name: name });
        },
        storageAPI: {
            length: 0,
            has: function(k){ return this.items.hasOwnProperty(k); },
            key: function(i) {
                const c = 0;
                for (let k in this.items){
                    if (this.has(k) && i === c++) {
                        return k;
                    }
                }
            },
            setItem: function(k, v) {
                if (!this.has(k)) {
                    this.length++;
                }
                this.items[k] = v;
            },
            removeItem: function(k) {
                if (this.has(k)) {
                    delete this.items[k];
                    this.length--;
                }
            },
            getItem: function(k){ return this.has(k) ? this.items[k] : null; },
            clear: function(){ for (let k in this.items){ this.removeItem(k); } }
        }// end _.storageAPI
    };

    const store =
        // safely set this up (throws error in IE10/32bit mode for local files)
        _.Store("local", (function(){try{ return localStorage; }catch(e){}})());
    store.local = store;// for completeness
    store._ = _;// for extenders and debuggers...
    // safely setup store.session (throws exception in FF for file:/// urls)
    store.area("session", (function(){try{ return sessionStorage; }catch(e){}})());
    store.area("page", _.storage("page"));

    if (typeof define === 'function' && define.amd !== undefined) {
        define('store2', [], function () {
            return store;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = store;
    } else {
        // expose the primary store fn to the global object and save conflicts
        if (window.store){ _.conflict = window.store; }
        window.store = store;
    }

})(this, this && this.define);
