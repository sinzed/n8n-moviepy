import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('Usage: python moviepy_resize.py <input_file> <width> <height> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    width = int(sys.argv[2])
    height = int(sys.argv[3])
    output_file = sys.argv[4]

    clip = VideoFileClip(input_file)
    resized_clip = clip.resize((width, height))
    resized_clip.write_videofile(output_file, codec='libx264')
    clip.close()
    resized_clip.close() 