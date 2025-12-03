import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, CartesianGrid, Bar, ResponsiveContainer, } from "recharts";

function GraphVisual({ totalFacts, correct, incorrect, unverified }) {
    const accuracy = totalFacts > 0 ? ((correct / totalFacts) * 100).toFixed(1) : 0;
    const errorRate = totalFacts > 0 ? ((incorrect / totalFacts) * 100).toFixed(1) : 0;
    const verificationRate =
        totalFacts > 0 ? (((correct + incorrect) / totalFacts) * 100).toFixed(1) : 0;
    const pieData = [
        { name: "Correct", value: correct },
        { name: "Incorrect", value: incorrect },
        { name: "Unverified", value: unverified },
    ];
    const barData = [
        { name: "Correct", value: correct },
        { name: "Incorrect", value: incorrect },
        { name: "Unverified", value: unverified },
    ];
    const COLORS = ["#22c55e", "#ef4444", "#facc15"]; 
    return (
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-green-600/40 p-6 text-white">
            <h2 className="text-2xl font-semibold mb-6 text-cyan-400 text-center">
                Graph Visualization
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-900/60 rounded-lg p-4 text-center border border-green-600/30">
                    <p className="text-gray-400 text-sm">Accuracy</p>
                    <h3 className="text-2xl font-bold text-green-400">{accuracy}%</h3>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 text-center border border-green-600/30">
                    <p className="text-gray-400 text-sm">Error Rate</p>
                    <h3 className="text-2xl font-bold text-red-400">{errorRate}%</h3>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 text-center border border-green-600/30">
                    <p className="text-gray-400 text-sm">Verification Rate</p>
                    <h3 className="text-2xl font-bold text-cyan-400">{verificationRate}%</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                labelLine={false}
                                dataKey="value"
                                nameKey="name"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
                            />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px" }}
                            />
                            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                {barData.map((entry, index) => (
                                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
export default GraphVisual;
