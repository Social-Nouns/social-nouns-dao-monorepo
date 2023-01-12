import { PNGCollectionEncoder, PngImage } from '@nouns/sdk';
import { promises as fs } from 'fs';
import path from 'path';
import { readPngImage } from './utils';

const DESTINATION = path.join(__dirname, '../src/image-data.json');
const DESTINATION2 = path.join(__dirname, '../../nouns-contracts/files/image-data-v2.json');

const encode = async () => {
  const encoder = new PNGCollectionEncoder();

  const partfolders = ['1-bodies', '2-accessories', '3-heads', '4-glasses'];
  for (const folder of partfolders) {
    const folderpath = path.join(__dirname, '../images', folder);
    const files = await fs.readdir(folderpath);
    for (const file of files) {
      const image = await readPngImage(path.join(folderpath, file));
      encoder.encodeImage(file.replace(/\.png$/, ''), image, folder.replace(/^\d-/, ''));
    }
  }
  await fs.writeFile(
    DESTINATION,
    JSON.stringify(
      {
        bgcolors: ['d5d7e1', 'e1d7d5'],
        ...encoder.data,
      },
      null,
      2,
    ),
  );
  await fs.copyFile(DESTINATION, DESTINATION2);
};

encode();
