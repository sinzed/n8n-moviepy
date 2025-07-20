import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { exec } from "child_process";

export class MoviePy implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'MoviePy',
		name: 'moviePy',
		icon: 'file:moviepy.svg',
		group: ['transform'],
		version: 1,
		description: 'Manipulate videos using MoviePy',
		defaults: {
			name: 'MoviePy',
			color: '#00AAFF',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		properties: [
			{
				displayName: 'Input File Path',
				name: 'inputFilePath',
				type: 'string',
				default: '',
				description: 'Path to the input video file',
			},
			{
				displayName: 'Start Time (seconds)',
				name: 'startTime',
				type: 'number',
				default: 0,
				description: 'Start time in seconds',
			},
			{
				displayName: 'End Time (seconds)',
				name: 'endTime',
				type: 'number',
				default: 10,
				description: 'End time in seconds',
			},
			{
				displayName: 'Output File Path',
				name: 'outputFilePath',
				type: 'string',
				default: '',
				description: 'Path to save the output video file',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			const inputFilePath = this.getNodeParameter('inputFilePath', i) as string;
			const startTime = this.getNodeParameter('startTime', i) as number;
			const endTime = this.getNodeParameter('endTime', i) as number;
			const outputFilePath = this.getNodeParameter('outputFilePath', i) as string;

			try {
                const cutVideo = async (inputFilePath:string, startTime:number, endTime:number, outputFilePath:string) => {
                    return new Promise((resolve, reject) => {
                        let cmd = `python3 moviepy_cut.py "${inputFilePath}" "${startTime.toString()}" "${endTime.toString()}" ${outputFilePath}`
                        
                        exec(cmd, { maxBuffer: 1024 * 500 }, async (err, stdout, stderr) => {
                          if (err) {
                            console.log(err);
                            reject("error " + err)
                          }
                          else {
                            console.log("intro done", stdout);
                            resolve(true);
                          }
                        })
                      })
                }
                await cutVideo(inputFilePath, startTime, endTime, outputFilePath)
				returnData.push({ json: { success: true, outputFilePath } });
			} catch (error) {
				returnData.push({ json: { success: false, error: error.message } });
			}
		}
		return [returnData];
	}

} 