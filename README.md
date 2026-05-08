# Tax Calculator Application

A web-based tax calculator application built with Node.js and Express.

## Features
- Calculate income tax based on different tax brackets
- Simple web interface
- Containerized deployment ready
- CI/CD pipeline integration

## Project Structure
```
tax-calculator/
├── src/
│   ├── app.js          # Main application file
│   ├── routes/         # API routes
│   ├── public/         # Static files (CSS, JS, images)
│   └── views/          # HTML templates
├── tests/              # Unit tests
├── Dockerfile          # Container configuration
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Docker (for containerization)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the application: `npm start`
4. Open browser to `http://localhost:3000`

### Testing
Run unit tests: `npm test`

### Docker
Build image: `docker build -t tax-calculator .`
Run container: `docker run -p 3000:3000 tax-calculator`

## Assignment Parts Completed
- [x] Part A: Epic and Stories created
- [x] Part B: Application containerized and deployed
- [x] Part C: DevOps pipeline with unit tests