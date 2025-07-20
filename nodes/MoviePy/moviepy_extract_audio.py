import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python moviepy_extract_audio.py <input_video> <output_audio>')
        sys.exit(1)
    
    input_video = sys.argv[1]
    output_audio = sys.argv[2]

    video_clip = VideoFileClip(input_video)
    audio_clip = video_clip.audio
    
    if audio_clip is not None:
        audio_clip.write_audiofile(output_audio)
        audio_clip.close()
    else:
        print("No audio found in the video file")
    
    video_clip.close() 