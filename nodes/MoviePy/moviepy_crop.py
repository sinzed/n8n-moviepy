import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 7:
        print('Usage: python moviepy_crop.py <input_file> <x> <y> <width> <height> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    x = int(sys.argv[2])
    y = int(sys.argv[3])
    width = int(sys.argv[4])
    height = int(sys.argv[5])
    output_file = sys.argv[6]

    clip = VideoFileClip(input_file)
    cropped_clip = clip.crop(x1=x, y1=y, x2=x+width, y2=y+height)
    cropped_clip.write_videofile(output_file, codec='libx264')
    
    clip.close()
    cropped_clip.close() 