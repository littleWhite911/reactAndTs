import { useEffect, useState } from "react";
export const isFalsy = (value: any) => (value === 0 ? true : !!value);
export const cleanObject = (object: object) => {
  console.log(object, "-------object");
  const result = { ...object };
  Object.keys(object).forEach((item) => {
    // @ts-ignore
    const value = object[item];
    if (!isFalsy(value)) {
      // @ts-ignore
      delete result[item];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 此处用泛型来规范类型
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value变化以后设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 存在定时器后清除,重新设置定时器
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    },
  };
};
