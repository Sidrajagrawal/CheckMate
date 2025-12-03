import os
import re
from youtube_transcript_api import YouTubeTranscriptApi

try:
    from youtube_transcript_api._errors import (
        TranscriptsDisabled, 
        VideoUnavailable, 
        NoTranscriptFound
    )
except ImportError:
    TranscriptsDisabled = Exception
    VideoUnavailable = Exception
    NoTranscriptFound = Exception

def get_video_id(youtube_url: str) -> str:
    regex_patterns = [
        r'(?:v=|\/videos\/|embed\/|\.be\/|shorts\/)([a-zA-Z0-9_-]{11})',
        r'youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})',
        r'youtu\.be\/([a-zA-Z0-9_-]{11})'
    ]
    
    for pattern in regex_patterns:
        match = re.search(pattern, youtube_url)
        if match:
            return match.group(1)
    
    raise ValueError(f"Invalid YouTube URL format: {youtube_url}")


def validate_video_id(video_id: str) -> bool:
    return bool(re.match(r'^[a-zA-Z0-9_-]{11}$', video_id))



def fetch_youtube_transcript(youtube_url: str) -> str:
    try:
        video_id = get_video_id(youtube_url)

        api = YouTubeTranscriptApi()
        
        transcript_list = api.list(video_id)

        transcript = transcript_list.find_transcript([
            'en-US',
            'en-CA',
            'en-UK',
            'en',
            'hi',
        ])

        fetched_data = transcript.fetch()

        if hasattr(fetched_data, 'snippets'):
            snippets = fetched_data.snippets
        else:
            snippets = fetched_data

        transcript_text = " ".join([snippet.text for snippet in snippets])
        
        segment_count = len(list(snippets))
        word_count = len(transcript_text.split())
                
        return transcript_text
    except TranscriptsDisabled:
        error_msg = "ERROR: This video does not have captions/subtitles enabled."
        print(f"{error_msg}")
        return error_msg
        
    except VideoUnavailable:
        error_msg = "ERROR: Video is unavailable, private, or doesn't exist."
        print(f"{error_msg}")
        return error_msg
        
    except NoTranscriptFound:
        error_msg = "ERROR: No transcript found in the requested languages (English)."
        print(f"{error_msg}")
        return error_msg
        
    except Exception as e:
        error_msg = f"ERROR: {str(e)}"
        print(f"{error_msg}")
        return error_msg