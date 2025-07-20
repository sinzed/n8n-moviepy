import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('Usage: python moviepy_fade.py <input_file> <fade_type> <fade_duration> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    fade_type = sys.argv[2]
    fade_duration = float(sys.argv[3])
    output_file = sys.argv[4]

    clip = VideoFileClip(input_file)
    
    if fade_type == 'fadeIn':
        faded_clip = clip.fadein(fade_duration)
    elif fade_type == 'fadeOut':
        faded_clip = clip.fadeout(fade_duration)
    elif fade_type == 'fadeInOut':
        faded_clip = clip.fadein(fade_duration).fadeout(fade_duration)
    else:
        print(f"Unknown fade type: {fade_type}")
        sys.exit(1)
    
    faded_clip.write_videofile(output_file, codec='libx264')
    
    clip.close()
    faded_clip.close() 