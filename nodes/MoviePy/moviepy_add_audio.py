import sys
from moviepy.editor import VideoFileClip, AudioFileClip

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print('Usage: python moviepy_add_audio.py <input_video> <audio_file> <output_file>')
        sys.exit(1)
    
    input_video = sys.argv[1]
    audio_file = sys.argv[2]
    output_file = sys.argv[3]

    video_clip = VideoFileClip(input_video)
    audio_clip = AudioFileClip(audio_file)
    
    # Set audio duration to match video duration
    if audio_clip.duration > video_clip.duration:
        audio_clip = audio_clip.subclip(0, video_clip.duration)
    elif audio_clip.duration < video_clip.duration:
        # Loop audio if it's shorter than video
        audio_clip = audio_clip.loop(duration=video_clip.duration)
    
    # Set the audio of the video clip
    final_clip = video_clip.set_audio(audio_clip)
    final_clip.write_videofile(output_file, codec='libx264')
    
    video_clip.close()
    audio_clip.close()
    final_clip.close() 