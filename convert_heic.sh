#!/bin/bash

# Convert HEIC images to JPG format
# Run this from the project root directory

cd assets/images/adventurer

echo "Converting HEIC files to JPG..."

# Skiing images
if [ -f "skiing/IMG_1394.HEIC" ]; then
    sips -s format jpeg "skiing/IMG_1394.HEIC" --out "skiing/IMG_1394.jpg"
    echo "✓ Converted skiing/IMG_1394.HEIC"
fi

if [ -f "skiing/IMG_2112.HEIC" ]; then
    sips -s format jpeg "skiing/IMG_2112.HEIC" --out "skiing/IMG_2112.jpg"
    echo "✓ Converted skiing/IMG_2112.HEIC"
fi

if [ -f "skiing/IMG_6740.HEIC" ]; then
    sips -s format jpeg "skiing/IMG_6740.HEIC" --out "skiing/IMG_6740.jpg"
    echo "✓ Converted skiing/IMG_6740.HEIC"
fi

# Kayaking images
if [ -f "kayaking/IMG_1897.HEIC" ]; then
    sips -s format jpeg "kayaking/IMG_1897.HEIC" --out "kayaking/IMG_1897.jpg"
    echo "✓ Converted kayaking/IMG_1897.HEIC"
fi

if [ -f "kayaking/IMG_6364.HEIC" ]; then
    sips -s format jpeg "kayaking/IMG_6364.HEIC" --out "kayaking/IMG_6364.jpg"
    echo "✓ Converted kayaking/IMG_6364.HEIC"
fi

# Motorcycle image
if [ -f "motorcycle/IMG_2511.HEIC" ]; then
    sips -s format jpeg "motorcycle/IMG_2511.HEIC" --out "motorcycle/IMG_2511.jpg"
    echo "✓ Converted motorcycle/IMG_2511.HEIC"
fi

echo "Conversion complete! Now update the adventurer.html file to use .jpg extensions."