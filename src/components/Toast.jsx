import { useEffect } from "react";
import { Check, AlertTriangle } from "lucide-react";

export default function Toast({ msg, type, onHide }) {
  useEffect(() => {
    const t = setTimeout(onHide, 3000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={`toast ${type}`}>
      {type === "success" ? <Check size={15}/> : <AlertTriangle size={15}/>}
      {msg}
    </div>
  );
}
