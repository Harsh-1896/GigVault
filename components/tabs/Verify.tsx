"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, Scan, Printer, Search, AlertCircle, ChevronDown, Terminal } from "lucide-react";

export function Verify() {
  const [method, setMethod] = useState<"qr" | "id">("qr");
  const [passportInput, setPassportInput] = useState("0x8F3A21C4");
  const [scanning, setScanning] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const chainChecks = [
    "AA-signed consent artefact validated against expiry",
    "Figures arrived directly via AA rail, not from applicant",
    "Commitment hash verified against claimed thresholds",
    "Nullifier checked against every issued passport",
    "Identity binding matched in-circuit to bank record",
  ];

  const handleVerify = () => {
    if (method === "id" && !passportInput.trim()) {
      setError("Please provide a valid Passport ID");
      return;
    }
    setError("");
    setScanning(true);
    setVerified(false);
    setCheckedSteps([]);

    chainChecks.forEach((_, idx) => {
      setTimeout(() => {
        setCheckedSteps((prev) => [...prev, idx]);
      }, 350 * (idx + 1));
    });

    setTimeout(() => {
      setScanning(false);
      setVerified(true);
    }, 350 * chainChecks.length + 300);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-2">
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-bold font-heading text-white">Verifier Terminal</h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Query the registry using ephemeral QR presentation or direct on-chain Passport ID.
        </p>
      </div>

      {/* Toggle between QR Scan and ID Input */}
      {!verified && !scanning && (
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-lg text-xs font-mono">
            <button
              onClick={() => setMethod("qr")}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                method === "qr" ? "bg-zinc-800 text-white font-medium shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Scan className="w-3.5 h-3.5" />
              Scan QR
            </button>
            <button
              onClick={() => setMethod("id")}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all ${
                method === "id" ? "bg-zinc-800 text-white font-medium shadow-sm" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Passport ID Lookup
            </button>
          </div>
        </div>
      )}

      {/* Input / Scanner Terminal UI */}
      {!verified && !scanning && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 text-center space-y-5">
          {method === "qr" ? (
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto text-violet-400">
                <Scan className="w-7 h-7" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-300">
                Point reader at rider&apos;s phone or simulate presentation scan[cite: 7].
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-w-md mx-auto text-left">
              <label className="text-xs font-mono text-zinc-400">Enter On-Chain Passport ID</label>
              <input
                type="text"
                value={passportInput}
                onChange={(e) => setPassportInput(e.target.value)}
                placeholder="e.g. 0x8F3A21C4"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3.5 py-2 text-sm font-mono text-white focus:outline-none focus:border-violet-500"
              />
              {error && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {error}
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleVerify}
            className="px-6 py-2.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs sm:text-sm transition-colors shadow-lg"
          >
            {method === "qr" ? "Scan Passport QR" : "Query Registry ID"}
          </button>
        </div>
      )}

      {/* Evaluating Checks Sequence */}
      {scanning && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3 text-violet-400">
            <div className="w-4 h-4 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            <span className="font-mono text-xs sm:text-sm">Querying state assertions...</span>
          </div>

          <div className="space-y-2.5">
            {chainChecks.map((check, idx) => {
              const done = checkedSteps.includes(idx);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs font-mono transition-opacity duration-300 ${
                    done ? "text-emerald-400" : "text-zinc-600"
                  }`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${done ? "text-emerald-400" : "text-zinc-700"}`} />
                  <span>{check}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Verified Admitted State */}
      {verified && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900/80 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl shadow-emerald-950/20"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-mono text-xs text-emerald-400 tracking-wider">VERIFICATION PASSED</div>
                  <div className="text-lg font-bold text-white font-heading">STATUS: ADMITTED[cite: 7]</div>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-mono transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Receipt
              </button>
            </div>

            <div className="space-y-2 bg-zinc-950/60 p-4 rounded-lg border border-zinc-800/80">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Validated Assertions</span>
              {chainChecks.map((check, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Underwriting Thresholds</span>
              <div className="grid sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div className="text-zinc-500">Tenure Proved</div>
                  <div className="text-white font-bold mt-1">&ge; 24 Months[cite: 7]</div>
                  <div className="text-emerald-400 text-[11px] mt-0.5">✓ 36 Months on Rail[cite: 7]</div>
                </div>
                <div className="bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div className="text-zinc-500">Monthly Income Floor</div>
                  <div className="text-white font-bold mt-1">&ge; ₹18,000[cite: 7]</div>
                  <div className="text-emerald-400 text-[11px] mt-0.5">✓ Threshold Satisfied</div>
                </div>
                <div className="bg-zinc-950/40 border border-zinc-800 p-3 rounded-lg">
                  <div className="text-zinc-500">Weeks Paid</div>
                  <div className="text-white font-bold mt-1">&ge; 100 Weeks[cite: 7]</div>
                  <div className="text-emerald-400 text-[11px] mt-0.5">✓ 156 / 156 Weeks[cite: 7]</div>
                </div>
              </div>
            </div>

            {/* Cryptographic Payload Inspector */}
            <div className="pt-3 border-t border-zinc-800/80">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer text-xs font-mono text-zinc-400 hover:text-zinc-200 select-none py-1">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-violet-400" />
                    Inspect Verifiable Payload (JSON)
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-500 group-open:rotate-180 transition-transform duration-200" />
                </summary>
                <div className="mt-2.5 rounded-lg bg-zinc-950/90 border border-zinc-800 p-3.5 text-[11px] font-mono text-emerald-400 overflow-x-auto shadow-inner">
                  <pre>
{JSON.stringify(
  {
    credentialSubject: {
      holder: "RAMESH KUMAR",
      passportId: method === "id" ? passportInput : "0x8F3A21C4",
      nullifierHash: "0x7c9a1e0b5f8841c3de82194a009fb627d3112a",
      tenureAssertion: {
        condition: "GTE_MONTHS",
        threshold: 24,
        proven: 36,
        status: "SATISFIED"
      },
      consistencyAssertion: {
        totalPaidWeeks: 156,
        missedWeeks: 0,
        status: "SATISFIED"
      },
      incomeFloorAssertion: {
        floorINR: 18000,
        condition: "GTE",
        status: "SATISFIED"
      }
    },
    railAttestation: {
      framework: "RBI-AA-CONSENT-2026",
      sourceRail: "Consented Banking FIP",
      proofType: "ZK-SNARK-Circom",
      status: "ADMITTED"
    }
  },
  null,
  2
)}
                  </pre>
                </div>
              </details>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs font-mono text-zinc-500">
              <span>Passport: {method === "id" ? passportInput : "0x8F3A...C214"}[cite: 7]</span>
              <button
                onClick={() => setVerified(false)}
                className="text-violet-400 hover:underline"
              >
                Scan Another
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default Verify;