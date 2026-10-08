import { useProgress } from "@react-three/drei";
import { useLanguage } from "../contexts/language";

const Loader = () => {
  const { active } = useProgress();
  const { language } = useLanguage();
  return active ? <div className="absolute right-5 bottom-5 text-sm text-neutral-300">{language === "pt" ? "Carregando…" : "Loading…"}</div> : null;
};

export default Loader;
