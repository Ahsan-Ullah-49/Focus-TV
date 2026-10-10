const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

const input = path.join(__dirname, '../public/media/hero/THE ANSWER - The Birth Of The Automobile (Pilot).mp4');
const output = path.join(__dirname, '../public/media/hero/focustv-hero-compressed.mp4');

console.log(`Using ffmpeg at: ${ffmpeg}`);
console.log(`Input: ${input}`);
console.log(`Output: ${output}`);

// Scale to 720p, CRF 33 for higher compression to fit in < 90MB, veryfast preset to speed it up
const args = [
  '-i', input,
  '-vf', 'scale=-2:720',
  '-vcodec', 'libx264',
  '-crf', '33',
  '-preset', 'veryfast',
  '-acodec', 'aac',
  '-b:a', '96k',
  '-y', // Overwrite output file
  output
];

const child = spawn(ffmpeg, args, { stdio: 'inherit' });

child.on('close', (code) => {
  if (code === 0) {
    console.log('Video compressed successfully.');
  } else {
    console.error(`ffmpeg process exited with code ${code}`);
  }
});
