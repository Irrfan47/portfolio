import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'public/projects/graduate_photo.JPG';
const outputDir1 = 'optimized_images';
const outputDir2 = 'public/optimized_images';

async function convert() {
    try {
        console.log(`Converting ${inputPath}...`);
        
        const outputFilename = 'graduate_photo.webp';
        
        if (!fs.existsSync(outputDir1)) fs.mkdirSync(outputDir1);
        if (!fs.existsSync(outputDir2)) fs.mkdirSync(outputDir2);

        const buffer = fs.readFileSync(inputPath);
        
        await sharp(buffer)
            .webp({ quality: 80, effort: 6 })
            .toFile(path.join(outputDir1, outputFilename));
            
        await sharp(buffer)
            .webp({ quality: 80, effort: 6 })
            .toFile(path.join(outputDir2, outputFilename));

        console.log('Successfully converted and saved to both optimized_images folders.');
    } catch (err) {
        console.error('Error during conversion:', err);
    }
}

convert();
