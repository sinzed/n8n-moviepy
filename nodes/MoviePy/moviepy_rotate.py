import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 4:
        print('Usage: python moviepy_rotate.py <input_file> <angle> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    angle = float(sys.argv[2])
    output_file = sys.argv[3]

    clip = VideoFileClip(input_file)
    rotated_clip = clip.rotate(angle)
    rotated_clip.write_videofile(output_file, codec='libx264')
    clip.close()
    rotated_clip.close() 