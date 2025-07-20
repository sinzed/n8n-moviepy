import sys
from moviepy.editor import VideoFileClip, TextClip, CompositeVideoClip

if __name__ == '__main__':
    if len(sys.argv) != 9:
        print('Usage: python moviepy_add_text.py <input_file> <text> <font_size> <color> <position> <x_pos> <y_pos> <output_file>')
        sys.exit(1)
    
    input_file = sys.argv[1]
    text = sys.argv[2]
    font_size = int(sys.argv[3])
    color = sys.argv[4]
    position = sys.argv[5]
    x_pos = int(sys.argv[6])
    y_pos = int(sys.argv[7])
    output_file = sys.argv[8]

    clip = VideoFileClip(input_file)
    
    # Create text clip
    txt_clip = TextClip(text, fontsize=font_size, color=color)
    txt_clip = txt_clip.set_duration(clip.duration)
    
    # Position the text
    if position == 'center':
        txt_clip = txt_clip.set_position('center')
    elif position == 'top':
        txt_clip = txt_clip.set_position(('center', 50))
    elif position == 'bottom':
        txt_clip = txt_clip.set_position(('center', clip.h - 100))
    elif position == 'custom':
        txt_clip = txt_clip.set_position((x_pos, y_pos))
    
    # Composite the clips
    final_clip = CompositeVideoClip([clip, txt_clip])
    final_clip.write_videofile(output_file, codec='libx264')
    
    clip.close()
    txt_clip.close()
    final_clip.close() 