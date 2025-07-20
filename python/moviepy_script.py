import sys
from moviepy.editor import VideoFileClip

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python moviepy_script.py <input_path> <output_path>')
        sys.exit(1)
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    try:
        clip = VideoFileClip(input_path).subclip(0, 10)
        clip.write_videofile(output_path)
        print('Success')
    except Exception as e:
        print(f'Error: {e}')
        sys.exit(1) 