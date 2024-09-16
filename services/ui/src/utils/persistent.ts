import { computed, ref } from 'vue';

export const refPersistent = <T>(key: string, value: T) => {
  const storage = window.localStorage;
  const storedValue = storage.getItem(key);
  const a = ref<T>(storedValue !== null ? JSON.parse(storedValue) : value);
  return computed({
    get: () => a.value,
    set: (v) => {
      a.value = v;
      storage.setItem(key, JSON.stringify(v));
    },
  });
};
