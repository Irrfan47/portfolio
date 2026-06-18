import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'C:\\Users\\kaung\\Downloads\\Untitled design';
const outputDir = 'C:\\Users\\kaung\\Downloads\\Code\\portfolio\\public\\optimized_images';

async function convert() {
  console.log('Starting conversion of fleet images...');
  
  for (let i = 1; i <= 6; i++) {
    const inputPath = path.join(inputDir, `${i}.jpg`);
    const outputPath = path.join(outputDir, `fleet${i}.webp`);
    
    if (fs.existsSync(inputPath)) {
      console.log(`Converting ${inputPath} to ${outputPath}...`);
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      console.log(`Converted fleet${i}.webp`);
    } else {
      console.warn(`File not found: ${inputPath}`);
    }
  }
  
  console.log('Conversion complete!');
}

convert().catch(console.error);
