#!/bin/bash

echo "Installing project dependencies..."

# Install production dependencies
npm install express mongodb redis pg pg-hstore @sequelize/postgres

# Install development dependencies
npm install --save-dev typescript ts-node @types/node @types/express eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin jest @types/jest

# Add useful ESLint configuration
npx eslint --init

echo "All dependencies installed!"
echo "Run 'npm run build' to compile your TypeScript code or 'npm run dev' for development mode."
