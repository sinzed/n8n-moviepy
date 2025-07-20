import sys
from moviepy.editor import VideoFileClip, concatenate_videoclips

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print('Usage: python moviepy_concatenate.py <input_files_comma_separated> <output_file>')
        sys.exit(1)
    
    input_files_str = sys.argv[1]
    output_file = sys.argv[2]
    
    # Split comma-separated file paths
    input_files = [f.strip() for f in input_files_str.split(',')]
    
    clips = []
    for file_path in input_files:
        clip = VideoFileClip(file_path)
        clips.append(clip)
    
    # Concatenate all clips
    final_clip = concatenate_videoclips(clips)
    final_clip.write_videofile(output_file, codec='libx264')
    
    # Close all clips
    for clip in clips:
        clip.close()
    final_clip.close() 