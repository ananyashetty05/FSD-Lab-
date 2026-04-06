#!/bin/bash

# MERN Stack Student Portfolio Application Startup Script
# This script starts both the backend server and frontend development server

echo "🚀 Starting MERN Stack Student Portfolio Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${BLUE}Node.js version:${NC}"
node --version
echo ""

# Start backend
echo -e "${BLUE}Starting Backend Server...${NC}"
cd backend
npm install --silent 2>/dev/null
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Start backend in background
npm start &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend server started (PID: $BACKEND_PID)${NC}"
echo "Backend running on: http://localhost:3000"
sleep 2
echo ""

# Start frontend
echo -e "${BLUE}Starting Frontend Server...${NC}"
cd ../frontend/student-portfolio
npm install --silent 2>/dev/null
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

echo -e "${GREEN}✓ Starting React development server...${NC}"
npm start

# Cleanup on script exit
trap "kill $BACKEND_PID" EXIT
