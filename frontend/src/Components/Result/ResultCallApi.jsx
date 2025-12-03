export async function VideoDataFun(videoId) {
    if (!videoId) return null;
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${API_KEY}`;

    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (!data.items || data.items.length === 0) {
            console.error("No video data found:", data);
            return null;
        }
        const item = data.items[0];
        const snippet = item.snippet;
        const stats = item.statistics;
        const formatViews = (num) =>
            new Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "short",
            }).format(num);

        const formatDate = (isoString) =>
            new Date(isoString).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
            });

        return {
            title: snippet.title,
            channel: snippet.channelTitle,
            views: `${formatViews(stats.viewCount)} views`,
            date: formatDate(snippet.publishedAt),
            loading: false,
        };
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
}
