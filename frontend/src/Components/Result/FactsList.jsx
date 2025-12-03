import React, { useState } from "react";

function FactsList({ facts }) {
  const [open, setOpen] = useState({}); // { [index]: true | false }

  const toggle = (idx) => setOpen((s) => ({ ...s, [idx]: !s[idx] }));

  const getStatusStyles = (status) => {
    switch ((status || "").toLowerCase()) {
      case "correct":
        return "border-green-500/50 text-green-400 bg-green-500/10";
      case "incorrect":
        return "border-red-500/50 text-red-400 bg-red-500/10";
      case "unverified":
        return "border-yellow-500/50 text-yellow-400 bg-yellow-500/10";
      default:
        return "border-gray-500/50 text-gray-400 bg-gray-500/10";
    }
  };

  return (
    <div className="mt-4 w-full space-y-4">
      {facts.map((fact, index) => {
        const statusStyle = getStatusStyles(fact.status);
        const isOpen = !!open[index];

        return (
          <div
            key={index}
            className={`w-full border rounded-lg p-4 transition-all hover:bg-opacity-20 ${
              statusStyle.split(" ")[0]
            } bg-[#1e293b]`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-gray-200 text-sm md:text-base font-medium leading-relaxed">
                  {fact.text}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto shrink-0">
                <div
                  className={`w-32 py-1.5 flex justify-center items-center rounded border text-xs font-bold tracking-wide uppercase ${statusStyle}`}
                >
                  {fact.status}
                </div>

                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  className="w-32 py-1.5 rounded border border-cyan-500/30 text-cyan-400 text-xs font-semibold hover:bg-cyan-500/10 hover:border-cyan-400 transition-colors text-center"
                >
                  {isOpen ? "Hide reason" : "View reason"}
                </button>
              </div>
            </div>

            {/* Collapsible reasoning panel */}
            <div
              className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {fact.reasoning && (
                <div className="mt-3 border border-cyan-500/20 rounded-lg p-3 text-sm text-slate-300 bg-slate-800/40">
                  {fact.reasoning}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FactsList;
