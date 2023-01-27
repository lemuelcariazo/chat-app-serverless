function useLocalStorage(store: any) {
  localStorage.setItem("log", store);
  return { store };
}

export default useLocalStorage;
