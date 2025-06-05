#!/bin/bash

# exit on any error
set -ex

echo "🚀 Generating schema with drizzle-kit..."
npx drizzle-kit generate

echo "📦 Applying migrations..."
npx drizzle-kit migrate

echo "🔮 Seeding tarot cards..."
npx ts-node scripts/seedTarots.ts

echo "🧾 Seeding tarot specifications..."
npx ts-node scripts/seedTarotSpecifications.ts

echo "✅ Initialization completed!"
