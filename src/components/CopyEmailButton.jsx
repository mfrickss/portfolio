import { useEffect, useRef, useState } from "react";
import { ConfettiButton } from "./confetti";
import { useLanguage } from "../contexts/language";
import { translations } from "../translations/translations";
import { assetUrl } from "../lib/assets";

export default function CopyEmailButton() {
  const { language } = useLanguage();
  const t = translations[language].buttons;
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);
  const email = "ricardocamargodev@gmail.com";
  useEffect(() => () => window.clearTimeout(timer.current), []);
  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      timer.current = window.setTimeout(() => setStatus("idle"), 2000);
      return true;
    } catch {
      setStatus("error");
      return false;
    }
  }
  return (
    <div className="text-center">
      <ConfettiButton onClick={copy} options={{ spread: 360, startVelocity: 20, particleCount: 70, decay: 0.95 }} className="relative px-1 py-4 text-sm font-light rounded-full w-[12rem] bg-primary hover:bg-primary/90">
        <span className="flex items-center justify-center gap-2"><img src={assetUrl(status === "copied" ? "assets/copy-done.svg" : "assets/copy.svg")} className="w-5" alt="" />{status === "copied" ? t.copied : t.copy}</span>
      </ConfettiButton>
      <span className="sr-only" role="status" aria-live="polite">{status === "copied" ? t.copied : status === "error" ? t.copyError : ""}</span>
      {status === "error" ? <p className="mt-3 text-sm text-white">{t.copyError}<br /><a className="underline break-all" href={`mailto:${email}`}>{email}</a></p> : null}
    </div>
  );
}
