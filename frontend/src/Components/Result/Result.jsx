import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import DisplayMedia from "./DisplayMedia";
import Count from "./Count";
import FactsList from "./FactsList";
import GraphVisual from "./GraphVisual";
import ResultLoader from '../Loader/ResultLoader';

function Result() {
    const { mediaId } = useParams();
    const [data, setData] = useState(null);
    const [activeTab, setActiveTab] = useState("facts");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let interval;

        const fetchResult = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/dashboard/result/${mediaId}`);
                const media = res.data.data;

                setData(media);

                if (media.status === "completed" || media.status === "failed") {
                    setLoading(false);
                    clearInterval(interval);
                } else {
                    setLoading(true);
                }
            } catch (err) {
                console.error("Error fetching result:", err);
            }
        };

        fetchResult();
        interval = setInterval(fetchResult, 5000);

        return () => clearInterval(interval);
    }, [mediaId]);

    if (loading || !data || data.status === "pending" || data.status === "processing") {
        return <ResultLoader />;
    }

    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center text-red-400 text-xl">
                No data found for this ID.
            </div>
        );
    }

    const totalFacts = data.claims.length;
    const correct = data.claims.filter((c) => c.verification_result === "True").length;
    const incorrect = data.claims.filter((c) => c.verification_result === "False").length;
    const unverified = data.claims.filter((c) => c.verification_result === "Unverified").length;
    const mediaType = data.mediaType;

    return (
        <div className="bg-gradient-to-br from-[#0f1729] via-[#1a2332] to-[#293b68] min-h-screen text-white pb-10">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div className="w-full h-full">
                        <DisplayMedia mediaType={mediaType} mediaLink={data.mediaType === 'youtube' ? data.youtubeUrl : data.imageUrl} />
                    </div>
                    <div className="w-full h-full">
                        <Count
                            totalFacts={totalFacts}
                            correct={correct}
                            incorrect={incorrect}
                            unverified={unverified}
                        />
                    </div>
                </div>

                <div className="mt-10 border-b border-gray-700/50 flex gap-8">
                    <button
                        onClick={() => setActiveTab("facts")}
                        className={`pb-3 text-lg font-medium transition-colors border-b-2 ${activeTab === "facts"
                            ? "text-cyan-400 border-cyan-400"
                            : "text-gray-400 border-transparent hover:text-gray-200"
                            }`}
                    >
                        Facts List
                    </button>
                    <button
                        onClick={() => setActiveTab("graph")}
                        className={`pb-3 text-lg font-medium transition-colors border-b-2 ${activeTab === "graph"
                            ? "text-cyan-400 border-cyan-400"
                            : "text-gray-400 border-transparent hover:text-gray-200"
                            }`}
                    >
                        Graph Visual
                    </button>
                </div>

                <div className="mt-6">
                    {data.status === "processing" ? (
                        <p className="text-yellow-400 text-lg text-center mt-10">
                            ⏳ Processing your media... Please wait.
                        </p>
                    ) : activeTab === "facts" ? (
                        <FactsList
                            facts={data.claims.map((c) => ({
                                text: c.text,
                                status:
                                    c.verification_result === "True"
                                        ? "correct"
                                        : c.verification_result === "False"
                                            ? "incorrect"
                                            : "unverified",
                                reasoning:c.reasoning
                            }))}
                        />
                    ) : (
                        <GraphVisual
                            totalFacts={totalFacts}
                            correct={correct}
                            incorrect={incorrect}
                            unverified={unverified}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Result;
