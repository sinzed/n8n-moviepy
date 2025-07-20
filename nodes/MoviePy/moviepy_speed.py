import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print('Usage: python moviepy_speed.py <input_file> <speed_factor> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    speed_factor = float(sys.argv[2])
    output_file = sys.argv[3]

    clip = VideoFileClip(input_file)
    speeded_clip = clip.speedx(speed_factor)
    speeded_clip.write_videofile(output_file, codec='libx264')
    
    clip.close()
    speeded_clip.close() 