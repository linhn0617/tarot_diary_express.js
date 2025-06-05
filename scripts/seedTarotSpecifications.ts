import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { db } from '../src/config/db';
import { tarotSpecifications } from '../src/database/schema';

const csvFilePath = path.resolve(__dirname, '../seeds/table_tarot_specifications.csv');

type Row = {
  tarot_id: string;
  is_upright: string;
  message1: string;
  message2: string;
};

async function readCSV(): Promise<{
  tarotId: number;
  isUpright: boolean;
  message1: string | null;
  message2: string | null;
}[]> {
  const records: {
    tarotId: number;
    isUpright: boolean;
    message1: string | null;
    message2: string | null;
  }[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(parse({ columns: true, trim: true }))
      .on('data', (row: Row) => {
        records.push({
          tarotId: Number(row.tarot_id),
          isUpright: row.is_upright === '1',
          message1: row.message1 || null,
          message2: row.message2 || null,
        });
      })
      .on('end', () => resolve(records))
      .on('error', reject);
  });
}

async function main() {
  try {
    const data = await readCSV();
    await db.insert(tarotSpecifications).values(data);
    console.log(`✅ Inserted ${data.length} tarot specifications`);
  } catch (err) {
    console.error('❌ Failed to insert:', err);
    process.exit(1); // 確保 init.sh 在錯誤時會停止
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('❌ Unhandled error in seedTarotSpecifications:', err);
    process.exit(1);
  });