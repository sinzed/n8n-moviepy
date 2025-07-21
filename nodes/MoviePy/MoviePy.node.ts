import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType, NodeOperationError } from 'n8n-workflow';
import { exec } from "child_process";
import { join } from 'path';

export class MoviePy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoviePy',
		name: 'moviePy',
		icon: 'file:NASA_logo.svg',
		group: ['transform'],
		version: 1,
		description: 'Manipulate videos using MoviePy',
		defaults: {
			name: 'MoviePy',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Add Audio',
						value: 'addAudio',
						description: 'Add audio track to video',
						action: 'Add audio track to video',
					},
					{
						name: 'Add Fade',
						value: 'fade',
						description: 'Add fade in/out effects',
						action: 'Add fade in out effects',
					},
					{
						name: 'Add Text',
						value: 'addText',
						description: 'Add text overlay to video',
						action: 'Add text overlay to video',
					},
					{
						name: 'Add Watermark',
						value: 'watermark',
						description: 'Add image watermark to video',
						action: 'Add image watermark to video',
					},
					{
						name: 'Change Speed',
						value: 'speed',
						description: 'Speed up or slow down video',
						action: 'Speed up or slow down video',
					},
					{
						name: 'Concatenate Videos',
						value: 'concatenate',
						description: 'Join multiple videos together',
						action: 'Join multiple videos together',
					},
					{
						name: 'Create GIF',
						value: 'gif',
						description: 'Convert video to GIF',
						action: 'Convert video to GIF',
					},
					{
						name: 'Crop Video',
						value: 'crop',
						description: 'Crop video to specific dimensions',
						action: 'Crop video to specific dimensions',
					},
					{
						name: 'Cut Video',
						value: 'cut',
						description: 'Cut a video between start and end times',
						action: 'Cut a video between start and end times',
					},
					{
						name: 'Extract Audio',
						value: 'extractAudio',
						description: 'Extract audio from video',
						action: 'Extract audio from video',
					},
					{
						name: 'Resize Video',
						value: 'resize',
						description: 'Resize video to new dimensions',
						action: 'Resize video to new dimensions',
					},
					{
						name: 'Rotate Video',
						value: 'rotate',
						description: 'Rotate video by specified angle',
						action: 'Rotate video by specified angle',
					},
				],
				default: 'cut',
			},
			{
				displayName: 'Input File Path',
				name: 'inputFilePath',
				type: 'string',
				default: '',
				description: 'Path to the input video file',
				displayOptions: {
					show: {
						operation: ['cut', 'resize', 'rotate', 'addText', 'addAudio', 'speed', 'extractAudio', 'fade', 'crop', 'watermark', 'gif'],
					},
				},
			},
			{
				displayName: 'Input File Paths',
				name: 'inputFilePaths',
				type: 'string',
				default: '',
				description: 'Comma-separated paths to input video files',
				displayOptions: {
					show: {
						operation: ['concatenate'],
					},
				},
			},
			{
				displayName: 'Output File Path',
				name: 'outputFilePath',
				type: 'string',
				default: '',
				description: 'Path to save the output file',
			},
			// Cut operation parameters
			{
				displayName: 'Start Time (Seconds)',
				name: 'startTime',
				type: 'number',
				default: 0,
				description: 'Start time in seconds',
				displayOptions: {
					show: {
						operation: ['cut'],
					},
				},
			},
			{
				displayName: 'End Time (Seconds)',
				name: 'endTime',
				type: 'number',
				default: 10,
				description: 'End time in seconds',
				displayOptions: {
					show: {
						operation: ['cut'],
					},
				},
			},
			// Resize operation parameters
			{
				displayName: 'Width',
				name: 'width',
				type: 'number',
				default: 640,
				description: 'New width in pixels',
				displayOptions: {
					show: {
						operation: ['resize'],
					},
				},
			},
			{
				displayName: 'Height',
				name: 'height',
				type: 'number',
				default: 480,
				description: 'New height in pixels',
				displayOptions: {
					show: {
						operation: ['resize'],
					},
				},
			},
			// Rotate operation parameters
			{
				displayName: 'Angle (Degrees)',
				name: 'angle',
				type: 'number',
				default: 90,
				description: 'Rotation angle in degrees',
				displayOptions: {
					show: {
						operation: ['rotate'],
					},
				},
			},
			// Add text parameters
			{
				displayName: 'Text',
				name: 'text',
				type: 'string',
				default: 'Hello World',
				description: 'Text to add to video',
				displayOptions: {
					show: {
						operation: ['addText'],
					},
				},
			},
			{
				displayName: 'Font Size',
				name: 'fontSize',
				type: 'number',
				default: 70,
				displayOptions: {
					show: {
						operation: ['addText'],
					},
				},
			},
			{
				displayName: 'Color',
				name: 'color',
				type: 'color',
				default: 'white',
				description: 'Text color',
				displayOptions: {
					show: {
						operation: ['addText'],
					},
				},
			},
			{
				displayName: 'Position',
				name: 'position',
				type: 'options',
				options: [
					{ name: 'Center', value: 'center' },
					{ name: 'Top', value: 'top' },
					{ name: 'Bottom', value: 'bottom' },
					{ name: 'Custom', value: 'custom' },
				],
				default: 'center',
				description: 'Text position',
				displayOptions: {
					show: {
						operation: ['addText'],
					},
				},
			},
			{
				displayName: 'X Position',
				name: 'xPosition',
				type: 'number',
				default: 0,
				description: 'X coordinate for custom position',
				displayOptions: {
					show: {
						operation: ['addText'],
						position: ['custom'],
					},
				},
			},
			{
				displayName: 'Y Position',
				name: 'yPosition',
				type: 'number',
				default: 0,
				description: 'Y coordinate for custom position',
				displayOptions: {
					show: {
						operation: ['addText'],
						position: ['custom'],
					},
				},
			},
			// Add audio parameters
			{
				displayName: 'Audio File Path',
				name: 'audioFilePath',
				type: 'string',
				default: '',
				description: 'Path to the audio file',
				displayOptions: {
					show: {
						operation: ['addAudio'],
					},
				},
			},
			// Speed parameters
			{
				displayName: 'Speed Factor',
				name: 'speedFactor',
				type: 'number',
				default: 1.0,
				description: 'Speed factor (1.0 = normal, 2.0 = 2x faster, 0.5 = 2x slower)',
				displayOptions: {
					show: {
						operation: ['speed'],
					},
				},
			},
			// Fade parameters
			{
				displayName: 'Fade Type',
				name: 'fadeType',
				type: 'options',
				options: [
					{ name: 'Fade In', value: 'fadeIn' },
					{ name: 'Fade Out', value: 'fadeOut' },
					{ name: 'Fade In and Out', value: 'fadeInOut' },
				],
				default: 'fadeIn',
				description: 'Type of fade effect',
				displayOptions: {
					show: {
						operation: ['fade'],
					},
				},
			},
			{
				displayName: 'Fade Duration (Seconds)',
				name: 'fadeDuration',
				type: 'number',
				default: 1.0,
				description: 'Duration of fade effect in seconds',
				displayOptions: {
					show: {
						operation: ['fade'],
					},
				},
			},
			// Crop parameters
			{
				displayName: 'Crop X',
				name: 'cropX',
				type: 'number',
				default: 0,
				description: 'X coordinate to start crop',
				displayOptions: {
					show: {
						operation: ['crop'],
					},
				},
			},
			{
				displayName: 'Crop Y',
				name: 'cropY',
				type: 'number',
				default: 0,
				description: 'Y coordinate to start crop',
				displayOptions: {
					show: {
						operation: ['crop'],
					},
				},
			},
			{
				displayName: 'Crop Width',
				name: 'cropWidth',
				type: 'number',
				default: 640,
				description: 'Width of crop area',
				displayOptions: {
					show: {
						operation: ['crop'],
					},
				},
			},
			{
				displayName: 'Crop Height',
				name: 'cropHeight',
				type: 'number',
				default: 480,
				description: 'Height of crop area',
				displayOptions: {
					show: {
						operation: ['crop'],
					},
				},
			},
			// Watermark parameters
			{
				displayName: 'Watermark Image Path',
				name: 'watermarkPath',
				type: 'string',
				default: '',
				description: 'Path to watermark image',
				displayOptions: {
					show: {
						operation: ['watermark'],
					},
				},
			},
			{
				displayName: 'Watermark Position',
				name: 'watermarkPosition',
				type: 'options',
				options: [
					{ name: 'Bottom Left', value: 'bottomLeft' },
					{ name: 'Bottom Right', value: 'bottomRight' },
					{ name: 'Center', value: 'center' },
					{ name: 'Top Left', value: 'topLeft' },
					{ name: 'Top Right', value: 'topRight' },
				],
				default: 'bottomRight',
				description: 'Position of watermark',
				displayOptions: {
					show: {
						operation: ['watermark'],
					},
				},
			},
			// GIF parameters
			{
				displayName: 'GIF Duration (Seconds)',
				name: 'gifDuration',
				type: 'number',
				default: 5,
				description: 'Duration of GIF in seconds',
				displayOptions: {
					show: {
						operation: ['gif'],
					},
				},
			},
			{
				displayName: 'GIF FPS',
				name: 'gifFps',
				type: 'number',
				default: 10,
				description: 'Frames per second for GIF',
				displayOptions: {
					show: {
						operation: ['gif'],
					},
				},
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;
			const outputFilePath = this.getNodeParameter('outputFilePath', i) as string;

			try {
				const nodeDir = __dirname;
				let pythonScriptPath: string;
				let cmd: string;

				switch (operation) {
					case 'cut':
						const inputFilePath = this.getNodeParameter('inputFilePath', i) as string;
						const startTime = this.getNodeParameter('startTime', i) as number;
						const endTime = this.getNodeParameter('endTime', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_cut.py');
						cmd = `python3 "${pythonScriptPath}" "${inputFilePath}" "${startTime.toString()}" "${endTime.toString()}" "${outputFilePath}"`;
						break;

					case 'resize':
						const resizeInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const width = this.getNodeParameter('width', i) as number;
						const height = this.getNodeParameter('height', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_resize.py');
						cmd = `python3 "${pythonScriptPath}" "${resizeInputPath}" "${width.toString()}" "${height.toString()}" "${outputFilePath}"`;
						break;

					case 'rotate':
						const rotateInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const angle = this.getNodeParameter('angle', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_rotate.py');
						cmd = `python3 "${pythonScriptPath}" "${rotateInputPath}" "${angle.toString()}" "${outputFilePath}"`;
						break;

					case 'addText': {
						const getParam = (name: string) => {
							try {
								return this.getNodeParameter(name, i);
							} catch (e) {
								throw new NodeOperationError(this.getNode(), `Missing parameter: ${name}`);
							}
						};
						let textInputPath, text, fontSize, color, position, xPosition, yPosition, outputFilePath;
						try {
							textInputPath = getParam('inputFilePath') as string;
							text = getParam('text') as string;
							fontSize = getParam('fontSize') as number;
							color = getParam('color') as string;
							position = getParam('position') as string;
							if (position === 'custom') {
								xPosition = getParam('xPosition') as number;
								yPosition = getParam('yPosition') as number;
							} else {
								xPosition = 0;
								yPosition = 0;
							}
							outputFilePath = getParam('outputFilePath') as string;
						} catch (error: any) {
							returnData.push({ json: { success: false, operation, error: error.message, params: {
								inputFilePath: this.getNodeParameter('inputFilePath', i, false),
								text: this.getNodeParameter('text', i, false),
								fontSize: this.getNodeParameter('fontSize', i, false),
								color: this.getNodeParameter('color', i, false),
								position: this.getNodeParameter('position', i, false),
								xPosition: this.getNodeParameter('xPosition', i, false),
								yPosition: this.getNodeParameter('yPosition', i, false),
								outputFilePath: this.getNodeParameter('outputFilePath', i, false),
							}} });
							continue;
						}
						pythonScriptPath = join(nodeDir, 'moviepy_add_text.py');
						cmd = `python3 "${pythonScriptPath}" "${textInputPath}" "${text}" "${fontSize.toString()}" "${color}" "${position}" "${xPosition.toString()}" "${yPosition.toString()}" "${outputFilePath}"`;
						break;
					}

					case 'addAudio':
						const audioInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const audioFilePath = this.getNodeParameter('audioFilePath', i) as string;
						pythonScriptPath = join(nodeDir, 'moviepy_add_audio.py');
						cmd = `python3 "${pythonScriptPath}" "${audioInputPath}" "${audioFilePath}" "${outputFilePath}"`;
						break;

					case 'concatenate':
						const inputFilePaths = this.getNodeParameter('inputFilePaths', i) as string;
						pythonScriptPath = join(nodeDir, 'moviepy_concatenate.py');
						cmd = `python3 "${pythonScriptPath}" "${inputFilePaths}" "${outputFilePath}"`;
						break;

					case 'speed':
						const speedInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const speedFactor = this.getNodeParameter('speedFactor', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_speed.py');
						cmd = `python3 "${pythonScriptPath}" "${speedInputPath}" "${speedFactor.toString()}" "${outputFilePath}"`;
						break;

					case 'extractAudio':
						const extractInputPath = this.getNodeParameter('inputFilePath', i) as string;
						pythonScriptPath = join(nodeDir, 'moviepy_extract_audio.py');
						cmd = `python3 "${pythonScriptPath}" "${extractInputPath}" "${outputFilePath}"`;
						break;

					case 'fade':
						const fadeInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const fadeType = this.getNodeParameter('fadeType', i) as string;
						const fadeDuration = this.getNodeParameter('fadeDuration', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_fade.py');
						cmd = `python3 "${pythonScriptPath}" "${fadeInputPath}" "${fadeType}" "${fadeDuration.toString()}" "${outputFilePath}"`;
						break;

					case 'crop':
						const cropInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const cropX = this.getNodeParameter('cropX', i) as number;
						const cropY = this.getNodeParameter('cropY', i) as number;
						const cropWidth = this.getNodeParameter('cropWidth', i) as number;
						const cropHeight = this.getNodeParameter('cropHeight', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_crop.py');
						cmd = `python3 "${pythonScriptPath}" "${cropInputPath}" "${cropX.toString()}" "${cropY.toString()}" "${cropWidth.toString()}" "${cropHeight.toString()}" "${outputFilePath}"`;
						break;

					case 'watermark':
						const watermarkInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const watermarkPath = this.getNodeParameter('watermarkPath', i) as string;
						const watermarkPosition = this.getNodeParameter('watermarkPosition', i) as string;
						pythonScriptPath = join(nodeDir, 'moviepy_watermark.py');
						cmd = `python3 "${pythonScriptPath}" "${watermarkInputPath}" "${watermarkPath}" "${watermarkPosition}" "${outputFilePath}"`;
						break;

					case 'gif':
						const gifInputPath = this.getNodeParameter('inputFilePath', i) as string;
						const gifDuration = this.getNodeParameter('gifDuration', i) as number;
						const gifFps = this.getNodeParameter('gifFps', i) as number;
						pythonScriptPath = join(nodeDir, 'moviepy_gif.py');
						cmd = `python3 "${pythonScriptPath}" "${gifInputPath}" "${gifDuration.toString()}" "${gifFps.toString()}" "${outputFilePath}"`;
						break;

					default:
						throw new NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
				}

				await new Promise<void>((resolve, reject) => {
					exec(cmd, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
						if (err) {
							console.error('Error:', err);
							reject(new Error(`Python script execution failed: ${err.message}`));
						} else {
							console.log('Operation completed:', stdout);
							resolve();
						}
					});
				});
				returnData.push({ json: { success: true, operation, outputFilePath } });
			} catch (error: any) {
				returnData.push({ json: { success: false, operation, error: error.message } });
			}
		}
		return [returnData];
	}

}