import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('Usage: python moviepy_gif.py <input_video> <duration> <fps> <output_gif>')
        sys.exit(1)
    
    input_video = sys.argv[1]
    duration = float(sys.argv[2])
    fps = int(sys.argv[3])
    output_gif = sys.argv[4]

    video_clip = VideoFileClip(input_video)
    
    # If duration is longer than video, use full video
    if duration > video_clip.duration:
        duration = video_clip.duration
    
    # Take a subclip of the specified duration
    gif_clip = video_clip.subclip(0, duration)
    
    # Write as GIF
    gif_clip.write_gif(output_gif, fps=fps)
    
    video_clip.close()
    gif_clip.close() 