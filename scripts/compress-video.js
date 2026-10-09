const ffmpeg = require('ffmpeg-static');
const { spawn } = require('child_process');
const path = require('path');

const input = path.join(__dirname, '../public/media/hero/THE ANSWER - The Birth Of The Automobile (Pilot).mp4');
const output = path.join(__dirname, '../public/media/hero/focustv-hero-compressed.mp4');

console.log(`Using ffmpeg at: ${ffmpeg}`);
console.log(`Input: ${input}`);
console.log(`Output: ${output}`);

// Scale to 1080p, CRF 28 for good compression, fast preset
const args = [
  '-i', input,
  '-vf', 'scale=-2:1080',
  '-vcodec', 'libx264',
  '-crf', '28',
  '-preset', 'fast',
  '-acodec', 'aac',
  '-b:a', '128k',
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
