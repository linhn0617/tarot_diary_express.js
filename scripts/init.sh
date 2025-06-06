#!/bin/bash

# exit on any error
set -e

npx drizzle-kit generate

npx drizzle-kit migrate

npx ts-node scripts/seedTarots.ts

npx ts-node scripts/seedTarotSpecifications.ts