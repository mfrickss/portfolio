import { useState } from "react";
import { ConfettiButton } from "./confetti";

const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);
  const email = "ricardocamargodev@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      console.log("Email copied! State set to true.");
      setTimeout(() => {
        setCopied(false);
        console.log("State set to false after timeout.");
      }, 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <ConfettiButton
      onClick={handleCopy}
      options={{
        spread: 360,
        startVelocity: 20,
        elementCount: 70,
        decay: 0.95,
      }}
      className="relative px-1 py-4 text-sm font-light rounded-full w-[12rem] bg-primary hover:bg-primary/90"
    >
      <span className="flex items-center justify-center gap-2">
        <img
          src={copied ? "assets/copy-done.svg" : "assets/copy.svg"}
          className="w-5"
          alt={copied ? "copied icon" : "copy icon"}
        />
        {copied ? "Email Copied!" : "Copy Email Address"}
      </span>
    </ConfettiButton>
  );
};

export default CopyEmailButton;
