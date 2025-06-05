import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { db } from '../src/config/db';
import { tarots } from '../src/database/schema';

const csvFilePath = path.resolve(__dirname, '../seeds/table_tarots.csv');

const elementValues = ['air', 'water', 'fire', 'earth'] as const;
type ElementType = typeof elementValues[number];

interface Row {
  name: string;
  element: string;
  image_path: string;
}

async function readCSV(): Promise<{
  name: string;
  element: ElementType;
  imagePath: string;
}[]> {
  const records: {
    name: string;
    element: ElementType;
    imagePath: string;
  }[] = [];

  const seenKeys = new Set<string>();

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (row: Row) => {
        const trimmedName = row.name.slice(0, 10);
        const element = row.element as ElementType;

        if (!elementValues.includes(element)) {
          console.warn(`❌ Unknown element: ${row.element}`);
          return;
        }

        const key = `${trimmedName}-${element}`;
        if (seenKeys.has(key)) {
          console.warn(`⚠️ Duplicate skipped: ${key}`);
          return;
        }

        seenKeys.add(key);

        records.push({
          name: trimmedName,
          element,
          imagePath: row.image_path,
        });
      })
      .on('end', () => resolve(records))
      .on('error', reject);
  });
}

async function main() {
  try {
    const data = await readCSV();
    await db.insert(tarots).values(data);
    console.log(`✅ Inserted ${data.length} tarot cards`);
  } catch (err) {
    console.error('❌ Failed to insert:', err);
    process.exit(1); // 確保 shell script 停止
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Unhandled error in seedTarots:', err);
    process.exit(1);
  });