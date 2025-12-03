import React, { useEffect, useState } from "react";
import { VideoDataFun } from "./ResultCallApi";

function DisplayMedia({ mediaType, mediaLink }) {
    const [videoData, setVideoData] = useState({
        title: "",
        channel: "",
        views: "",
        date: "",
        loading: true,
    });

    const getYouTubeId = (url) => {
        if (!url) return null;
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const videoId = mediaType === "youtube" ? getYouTubeId(mediaLink) : null;
    const thumbnailUrl = videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : null;

    useEffect(() => {
        const fetchVideoData = async () => {
            if (mediaType === "youtube" && videoId) {
                setVideoData((prev) => ({ ...prev, loading: true }));
                const data = await VideoDataFun(videoId);
                if (data) setVideoData(data);
                else setVideoData((prev) => ({ ...prev, loading: false }));
            }
        };
        fetchVideoData();
    }, [mediaType, videoId]);

    if (!mediaLink) return null;

    return (
        <div className="w-full h-full flex">
            {mediaType === "youtube" && videoId ? (
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-green-600 shadow-lg flex flex-col sm:flex-row w-full h-full">
                    <img
                        src={thumbnailUrl}
                        alt={videoData.title}
                        className="w-full sm:w-[250px] h-[200px] object-cover"
                    />
                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-white text-sm sm:text-base font-semibold line-clamp-2 leading-tight mb-1 sm:mb-2">
                                {videoData.loading
                                    ? "Loading Title..."
                                    : videoData.title || "No Title"}
                            </h3>
                            <div className="flex items-center gap-2 text-cyan-400 text-xs sm:text-sm">
                                <span className="font-medium">
                                    {videoData.channel || "Unknown Channel"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                            <span>{videoData.views || "N/A"}</span>
                            <span>{videoData.date || ""}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-800 rounded-lg overflow-hidden border border-cyan-500/30 flex flex-col sm:flex-row shadow-lg w-full h-full">
                    <img
                        src={mediaLink}
                        alt="Uploaded Media"
                        className="w-full sm:w-[250px] h-[200px] object-cover"
                    />
                    <div className="flex-1 p-3 sm:p-4 flex flex-col justify-between">
                        <div>
                            <h3 className="text-white text-sm sm:text-base font-semibold mb-2">
                                Uploaded Image
                            </h3>
                            <div className="text-cyan-400 text-xs sm:text-sm">
                                <span className="font-medium">No metadata available</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                            <span>
                                Uploaded on{" "}
                                {new Date().toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </span>
                            <span>Type: {mediaType}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DisplayMedia;
