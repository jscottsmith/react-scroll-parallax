rm -rf ./cjs

# Process src JS with Babel
BABEL_ENV=production babel ./src --out-dir ./cjs

# Copy typings
cp ./src/index.d.ts ./cjs
echo "Copied typings to /cjs"
