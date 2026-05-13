import { ArrowLeft } from "lucide-react";

export default function Breadcrumb({ label, navigate }) {
  return (
    <div className="bcrumb">
      <div className="bcrumb-in">
        <button className="bcrumb-home" onClick={() => navigate("home")}>
          <ArrowLeft size={12}/> Startsidan
        </button>
        <span className="bcrumb-sep">/</span>
        <span className="bcrumb-current">{label}</span>
      </div>
    </div>
  );
}
