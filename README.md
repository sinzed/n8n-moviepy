# n8n-nodes-moviepy

A comprehensive n8n node package for video manipulation using MoviePy. This package provides 12 different video operations that can be integrated into your n8n workflows.

## Features

This package includes the following video operations:

1. **Cut Video** - Cut a video between specified start and end times
2. **Resize Video** - Resize video to new dimensions
3. **Rotate Video** - Rotate video by specified angle
4. **Add Text** - Add text overlay to video with customizable font, color, and position
5. **Add Audio** - Add audio track to video
6. **Concatenate Videos** - Join multiple videos together
7. **Change Speed** - Speed up or slow down video
8. **Extract Audio** - Extract audio from video
9. **Add Fade** - Add fade in/out effects
10. **Crop Video** - Crop video to specific dimensions
11. **Add Watermark** - Add image watermark to video
12. **Create GIF** - Convert video to GIF

## Prerequisites

Before using this node, ensure you have the following installed:

- **Python 3.7 or higher**
- **MoviePy library**: `pip install moviepy`
- **FFmpeg**: Required for video processing
- **Node.js 20+**: For n8n compatibility

### Installing Dependencies

```bash
# Install Python dependencies
pip install -r requirements.txt

# Or install MoviePy directly
pip install moviepy numpy imageio imageio-ffmpeg
```

### FFmpeg Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [FFmpeg official website](https://ffmpeg.org/download.html) or use Chocolatey:
```bash
choco install ffmpeg
```

## Installation

1. Install the package in your n8n instance:
   ```bash
   npm install n8n-nodes-moviepy
   ```

2. Restart your n8n instance

3. The MoviePy node will be available in the node palette under the "Transform" category

## Usage

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

## Supported Formats

- **Input formats**: MP4, AVI, MOV, MKV, and other formats supported by FFmpeg
- **Output format**: MP4 with H.264 codec (except for GIF operation)
- **Audio formats**: MP3, WAV, M4A, and other formats supported by FFmpeg
- **Image formats**: PNG, JPG, and other common image formats for watermarks

## Node Configuration

Each operation has specific parameters:

### Common Parameters
- **Operation**: Select the video operation to perform
- **Input File Path**: Path to the input video file (for single video operations)
- **Input File Paths**: Comma-separated paths for concatenation
- **Output File Path**: Path to save the output file

### Operation-Specific Parameters
- **Cut**: Start Time, End Time
- **Resize**: Width, Height
- **Rotate**: Angle (degrees)
- **Add Text**: Text, Font Size, Color, Position, X/Y coordinates
- **Add Audio**: Audio File Path
- **Speed**: Speed Factor
- **Fade**: Fade Type, Fade Duration
- **Crop**: Crop X, Y, Width, Height
- **Watermark**: Watermark Image Path, Position
- **GIF**: Duration, FPS

## Error Handling

The node returns a JSON response with:
- `success`: Boolean indicating if the operation was successful
- `operation`: The operation that was performed
- `outputFilePath`: Path to the output file (on success)
- `error`: Error message (on failure)

## Examples

### Workflow Examples

1. **Video Processing Pipeline**
   - Cut video → Add text → Add watermark → Export

2. **Batch Video Processing**
   - Process multiple videos with the same operation

3. **Video Enhancement**
   - Resize → Rotate → Add fade effects

4. **Content Creation**
   - Concatenate clips → Add audio → Create GIF

## Development

### Building the Package

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run linter
npm run lint

# Fix linting issues
npm run lintfix
```

### Testing

1. Build the package: `npm run build`
2. Link it to your n8n instance: `npm link`
3. Test the operations with sample videos

## Troubleshooting

### Common Issues

1. **"MoviePy not found"**: Ensure MoviePy is installed: `pip install moviepy`
2. **"FFmpeg not found"**: Install FFmpeg on your system
3. **"Permission denied"**: Check file permissions for input/output paths
4. **"Memory error"**: Large videos may require more system memory

### Performance Tips

- Use appropriate video resolutions for your use case
- For GIF creation, use shorter durations and lower FPS
- Consider video compression for large files
- Ensure sufficient disk space for temporary files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[MIT](LICENSE.md)

## Support

For issues and questions:
- Check the [n8n documentation](https://docs.n8n.io/)
- Visit the [n8n community forum](https://community.n8n.io/)
- Report bugs on the GitHub repository

## Changelog

### v0.1.0
- Initial release with 12 video operations
- Support for basic video manipulation
- Comprehensive error handling
- Full n8n integration
