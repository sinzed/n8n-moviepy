import sys
from moviepy.editor import VideoFileClip, ImageClip, CompositeVideoClip

if __name__ == '__main__':
    if len(sys.argv) != 5:
        print('Usage: python moviepy_watermark.py <input_video> <watermark_image> <position> <output_file>')
        sys.exit(1)
    
    input_video = sys.argv[1]
    watermark_image = sys.argv[2]
    position = sys.argv[3]
    output_file = sys.argv[4]

    video_clip = VideoFileClip(input_video)
    watermark_clip = ImageClip(watermark_image)
    
    # Set watermark duration to match video
    watermark_clip = watermark_clip.set_duration(video_clip.duration)
    
    # Position the watermark
    if position == 'topLeft':
        watermark_clip = watermark_clip.set_position((10, 10))
    elif position == 'topRight':
        watermark_clip = watermark_clip.set_position((video_clip.w - watermark_clip.w - 10, 10))
    elif position == 'bottomLeft':
        watermark_clip = watermark_clip.set_position((10, video_clip.h - watermark_clip.h - 10))
    elif position == 'bottomRight':
        watermark_clip = watermark_clip.set_position((video_clip.w - watermark_clip.w - 10, video_clip.h - watermark_clip.h - 10))
    elif position == 'center':
        watermark_clip = watermark_clip.set_position('center')
    
    # Composite the clips
    final_clip = CompositeVideoClip([video_clip, watermark_clip])
    final_clip.write_videofile(output_file, codec='libx264')
    
    video_clip.close()
    watermark_clip.close()
    final_clip.close() 