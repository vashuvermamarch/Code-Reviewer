#!/bin/bash

# Navigate to BackEnd and start in background
echo "Starting BackEnd..."
cd BackEnd && npm start & 

# Navigate back and start FrontEnd
echo "Starting FrontEnd..."
cd ../FrontEnd && npm run dev
