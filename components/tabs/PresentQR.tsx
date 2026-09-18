"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, RefreshCw, Copy, Check, QrCode } from "lucide-react";

export function PresentQR() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [copied, setCopied] = useState(false);
  const passportId = "0x8F3A21C4";

  // Regenerate countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const qrPayload = JSON.stringify({
    passport: passportId,
    holder: "RAMESH KUMAR",
    tenure: "36m",
    weeks: "156/156",
    incomeProof: ">=18000",
    exp: Math.floor(Date.now() / 1000) + timeLeft,
  });

  // Generates real scannable QR matrix via quickchart standard URL for real phone scanning
  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
    qrPayload
  )}&size=240&dark=09090b&light=ffffff&ecLevel=M&margin=1`;

  const handleCopyId = () => {
    navigator.clipboard.writeText(passportId);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-white font-heading">
          Present Work Passport
        </h2>
        <p className="text-xs text-zinc-400">
          Show this ephemeral QR to a verifier, or provide your Passport ID.
        </p>
      </div>

      <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 text-center space-y-5 backdrop-blur">
        {/* Real Scannable QR Container */}
        <div className="relative mx-auto w-60 h-60 bg-white p-3 rounded-xl shadow-xl flex items-center justify-center">
          <img
            src={qrUrl}
            alt="Scannable Passport QR"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Expiry Progress Bar & Timer */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <RefreshCw className="w-3 h-3 text-violet-400 animate-spin" />
              Regenerating
            </span>
            <span>{timeLeft}s remaining</span>
          </div>
          <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
            <div
              className="bg-violet-500 h-full transition-all duration-1000"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Passport ID Copy Box */}
        <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between bg-zinc-950/60 px-3.5 py-2.5 rounded-lg border border-zinc-800">
          <div className="text-left">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Passport ID</div>
            <div className="text-xs font-mono font-bold text-zinc-200">{passportId}</div>
          </div>
          <button
            onClick={handleCopyId}
            className="p-2 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Copy Passport ID"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PresentQR;