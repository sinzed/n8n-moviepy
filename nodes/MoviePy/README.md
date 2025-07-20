# MoviePy Node for n8n

This node provides comprehensive video manipulation capabilities using MoviePy, a Python library for video editing.

## Prerequisites

- Python 3.7 or higher
- MoviePy library installed: `pip install moviepy`
- FFmpeg installed on your system

## Operations

### 1. Cut Video
Cuts a video between specified start and end times.

**Parameters:**
- Input File Path: Path to the input video file
- Start Time (seconds): Start time in seconds
- End Time (seconds): End time in seconds
- Output File Path: Path to save the output video file

### 2. Resize Video
Resizes video to new dimensions.

**Parameters:**
- Input File Path: Path to the input video file
- Width: New width in pixels
- Height: New height in pixels
- Output File Path: Path to save the output video file

### 3. Rotate Video
Rotates video by specified angle.

**Parameters:**
- Input File Path: Path to the input video file
- Angle (degrees): Rotation angle in degrees
- Output File Path: Path to save the output video file

### 4. Add Text
Adds text overlay to video.

**Parameters:**
- Input File Path: Path to the input video file
- Text: Text to add to video
- Font Size: Font size
- Color: Text color (e.g., 'white', 'red', '#FF0000')
- Position: Text position (center, top, bottom, custom)
- X Position: X coordinate for custom position
- Y Position: Y coordinate for custom position
- Output File Path: Path to save the output video file

### 5. Add Audio
Adds audio track to video.

**Parameters:**
- Input File Path: Path to the input video file
- Audio File Path: Path to the audio file
- Output File Path: Path to save the output video file

### 6. Concatenate Videos
Joins multiple videos together.

**Parameters:**
- Input File Paths: Comma-separated paths to input video files
- Output File Path: Path to save the output video file

### 7. Change Speed
Speeds up or slows down video.

**Parameters:**
- Input File Path: Path to the input video file
- Speed Factor: Speed factor (1.0 = normal, 2.0 = 2x faster, 0.5 = 2x slower)
- Output File Path: Path to save the output video file

### 8. Extract Audio
Extracts audio from video.

**Parameters:**
- Input File Path: Path to the input video file
- Output File Path: Path to save the output audio file

### 9. Add Fade
Adds fade in/out effects.

**Parameters:**
- Input File Path: Path to the input video file
- Fade Type: Type of fade effect (fadeIn, fadeOut, fadeInOut)
- Fade Duration (seconds): Duration of fade effect in seconds
- Output File Path: Path to save the output video file

### 10. Crop Video
Crops video to specific dimensions.

**Parameters:**
- Input File Path: Path to the input video file
- Crop X: X coordinate to start crop
- Crop Y: Y coordinate to start crop
- Crop Width: Width of crop area
- Crop Height: Height of crop area
- Output File Path: Path to save the output video file

### 11. Add Watermark
Adds image watermark to video.

**Parameters:**
- Input File Path: Path to the input video file
- Watermark Image Path: Path to watermark image
- Watermark Position: Position of watermark (topLeft, topRight, bottomLeft, bottomRight, center)
- Output File Path: Path to save the output video file

### 12. Create GIF
Converts video to GIF.

**Parameters:**
- Input File Path: Path to the input video file
- GIF Duration (seconds): Duration of GIF in seconds
- GIF FPS: Frames per second for GIF
- Output File Path: Path to save the output GIF file

## Usage Examples

### Basic Video Cut
```json
{
  "operation": "cut",
  "inputFilePath": "/path/to/input.mp4",
  "startTime": 10,
  "endTime": 30,
  "outputFilePath": "/path/to/output.mp4"
}
```

### Add Text Overlay
```json
{
  "operation": "addText",
  "inputFilePath": "/path/to/input.mp4",
  "text": "Hello World",
  "fontSize": 70,
  "color": "white",
  "position": "center",
  "outputFilePath": "/path/to/output.mp4"
}
```

### Concatenate Multiple Videos
```json
{
  "operation": "concatenate",
  "inputFilePaths": "/path/to/video1.mp4,/path/to/video2.mp4,/path/to/video3.mp4",
  "outputFilePath": "/path/to/combined.mp4"
}
```

## Notes

- All operations preserve the original video quality
- Supported input formats: MP4, AVI, MOV, MKV, and other formats supported by FFmpeg
- Output is typically in MP4 format with H.264 codec
- For GIF creation, consider using shorter durations and lower FPS for smaller file sizes
- Watermark images should be in common formats (PNG, JPG, etc.)

## Error Handling

The node returns a JSON response with:
- `success`: Boolean indicating if the operation was successful
- `operation`: The operation that was performed
- `outputFilePath`: Path to the output file (on success)
- `error`: Error message (on failure)

## Dependencies

- moviepy
- numpy
- imageio
- FFmpeg (system dependency) 