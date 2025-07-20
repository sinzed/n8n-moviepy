import { exec } from 'child_process';

export const cutVideo = async (
  inputFilePath: string,
  startTime: number,
  endTime: number,
  outputFilePath: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const cmd = `python3 moviepy_cut.py "${inputFilePath}" "${startTime.toString()}" "${endTime.toString()}" ${outputFilePath}`;
    exec(cmd, { maxBuffer: 1024 * 500 }, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
        reject(new Error('error ' + err));
      } else {
        console.log('intro done', stdout);
        resolve(true);
      }
    });
  });
}; 