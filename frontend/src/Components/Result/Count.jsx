function Count({ totalFacts = 12, correct = 8, incorrect = 3, unverified = 1 }) {
    const accuracyScore =
        totalFacts > 0 ? Math.round((correct / totalFacts) * 100) : 0;

    const stats = [
        { label: "Total Facts:", value: totalFacts, color: "text-white" },
        { label: "Correct:", value: correct, color: "text-green-400" },
        { label: "Incorrect:", value: incorrect, color: "text-red-400" },
        { label: "Unverified:", value: unverified, color: "text-yellow-400" },
        { label: "Accuracy Score:", value: `${accuracyScore}%`, color: "text-cyan-400" },
    ];

    return (
        <div className="w-full h-full">
            <div className="bg-slate-800 rounded-lg overflow-hidden border border-green-600 shadow-lg flex flex-col justify-center w-full h-full p-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between border-b border-slate-700/50 pb-2 last:border-b-0"
                    >
                        <span className="text-gray-300 text-sm sm:text-base font-medium">
                            {stat.label}
                        </span>
                        <span className={`${stat.color} text-xl sm:text-2xl font-bold`}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Count;
