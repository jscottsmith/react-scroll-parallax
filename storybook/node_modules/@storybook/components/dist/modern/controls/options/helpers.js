export const selectedKey = (value, options) => {
  const entry = options && Object.entries(options).find(([_key, val]) => val === value);
  return entry ? entry[0] : undefined;
};
export const selectedKeys = (value, options) => value && options ? Object.entries(options).filter(entry => value.includes(entry[1])).map(entry => entry[0]) : [];
export const selectedValues = (keys, options) => keys && options && keys.map(key => options[key]);