#!/bin/bash

# Tax Calculator Build and Deploy Script
set -e

echo "🚀 Starting Tax Calculator Build and Deploy Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Install dependencies
print_status "Installing dependencies..."
npm ci

# Step 2: Run tests
print_status "Running Jest tests..."
npm test

print_status "Running Jasmine tests..."
npx jasmine

# Step 3: Build Docker image
print_status "Building Docker image..."
docker build -t tax-calculator:latest .

# Step 4: Test Docker container
print_status "Testing Docker container..."
docker run -d --name tax-calc-test -p 3001:3000 tax-calculator:latest
sleep 5

# Health check
if curl -f http://localhost:3001/health > /dev/null 2>&1; then
    print_status "Container health check passed!"
else
    print_error "Container health check failed!"
    docker logs tax-calc-test
    docker stop tax-calc-test
    docker rm tax-calc-test
    exit 1
fi

# Clean up test container
docker stop tax-calc-test
docker rm tax-calc-test

# Step 5: Tag for registry (update with your registry)
print_status "Tagging image for registry..."
docker tag tax-calculator:latest your-registry/tax-calculator:latest
docker tag tax-calculator:latest your-registry/tax-calculator:$(git rev-parse --short HEAD)

print_status "Build completed successfully! 🎉"
print_warning "To deploy to IBM Cloud:"
print_warning "1. Push image: docker push your-registry/tax-calculator:latest"
print_warning "2. Apply K8s manifests: kubectl apply -f deployment/"
print_warning "3. Check deployment: kubectl get pods -l app=tax-calculator"

echo ""
print_status "Available commands:"
echo "  npm start          - Start the application locally"
echo "  npm test           - Run Jest tests"
echo "  npx jasmine        - Run Jasmine tests"
echo "  docker-compose up  - Run with Docker Compose"