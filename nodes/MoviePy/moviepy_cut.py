import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('Usage: python moviepy_cut.py <input_file> <start_time> <end_time> <output_file>')
        sys.exit(1)
    input_file = sys.argv[1]
    start_time = float(sys.argv[2])
    end_time = float(sys.argv[3])
    output_file = sys.argv[4]

    clip = VideoFileClip(input_file).subclip(start_time, end_time)
    clip.write_videofile(output_file, codec='libx264') 