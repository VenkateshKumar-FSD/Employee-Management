import { useEffect, useState } from "react";
export default function useLocalStorage(key, defaultValue){
  const [value, setValue] = useState(()=> {
    try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : defaultValue; } catch { return defaultValue; }
  });
  useEffect(()=>{ try{ localStorage.setItem(key, JSON.stringify(value)); } catch{} }, [key, value]);
  return [value, setValue];
}
