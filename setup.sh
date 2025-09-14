#!/bin/bash

# Sikkim Monasteries Digital Platform Setup Script
# This script sets up the complete development environment

set -e

echo "🏛️  Setting up Sikkim Monasteries Digital Platform..."
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
}

# Check if PostgreSQL is installed
check_postgres() {
    if ! command -v psql &> /dev/null; then
        print_warning "PostgreSQL is not installed. You'll need to install it for the database."
        print_warning "Visit: https://www.postgresql.org/download/"
    else
        print_success "PostgreSQL is installed"
    fi
}

# Install dependencies for all projects
install_dependencies() {
    print_status "Installing dependencies for all projects..."
    
    # Root dependencies
    print_status "Installing root dependencies..."
    npm install
    
    # Web dependencies
    print_status "Installing web dependencies..."
    cd web
    npm install
    cd ..
    
    # API dependencies
    print_status "Installing API dependencies..."
    cd api
    npm install
    cd ..
    
    # Mobile dependencies
    print_status "Installing mobile dependencies..."
    cd mobile
    npm install
    cd ..
    
    print_success "All dependencies installed successfully"
}

# Setup environment files
setup_environment() {
    print_status "Setting up environment files..."
    
    # API environment
    if [ ! -f "api/.env" ]; then
        cp api/.env.example api/.env
        print_success "Created api/.env from template"
        print_warning "Please update api/.env with your database and API keys"
    else
        print_warning "api/.env already exists, skipping..."
    fi
    
    # Web environment
    if [ ! -f "web/.env.local" ]; then
        cat > web/.env.local << EOF
# Web Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
EOF
        print_success "Created web/.env.local"
        print_warning "Please update web/.env.local with your API keys"
    else
        print_warning "web/.env.local already exists, skipping..."
    fi
    
    # Mobile environment
    if [ ! -f "mobile/.env" ]; then
        cat > mobile/.env << EOF
# Mobile Environment Variables
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
EXPO_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
EOF
        print_success "Created mobile/.env"
        print_warning "Please update mobile/.env with your API keys"
    else
        print_warning "mobile/.env already exists, skipping..."
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    cd api
    
    # Generate Prisma client
    print_status "Generating Prisma client..."
    npx prisma generate
    
    # Check if database is accessible
    if npx prisma db push --accept-data-loss 2>/dev/null; then
        print_success "Database schema created successfully"
    else
        print_warning "Could not connect to database. Please check your DATABASE_URL in api/.env"
        print_warning "You can run 'cd api && npx prisma db push' later to create the schema"
    fi
    
    cd ..
}

# Create upload directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p api/uploads
    mkdir -p web/public/images
    mkdir -p assets/{3d-models,panoramas,artifacts,rituals,documents}
    
    print_success "Directories created successfully"
}

# Setup Git hooks (optional)
setup_git_hooks() {
    if [ -d ".git" ]; then
        print_status "Setting up Git hooks..."
        
        # Pre-commit hook for linting
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "Running pre-commit checks..."

# Check web linting
cd web
if ! npm run lint; then
    echo "Web linting failed. Please fix the issues before committing."
    exit 1
fi
cd ..

# Check API linting
cd api
if ! npm run lint 2>/dev/null; then
    echo "API linting failed. Please fix the issues before committing."
    exit 1
fi
cd ..

echo "Pre-commit checks passed!"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks set up successfully"
    fi
}

# Main setup function
main() {
    echo "Starting setup process..."
    echo ""
    
    check_node
    check_postgres
    echo ""
    
    install_dependencies
    echo ""
    
    setup_environment
    echo ""
    
    setup_database
    echo ""
    
    create_directories
    echo ""
    
    setup_git_hooks
    echo ""
    
    print_success "Setup completed successfully! 🎉"
    echo ""
    echo "Next steps:"
    echo "1. Update environment files with your API keys and database credentials"
    echo "2. Start the development servers:"
    echo "   - Run 'npm run dev' to start all services"
    echo "   - Or start individually:"
    echo "     - Web: cd web && npm run dev"
    echo "     - API: cd api && npm run dev"
    echo "     - Mobile: cd mobile && npm run start"
    echo ""
    echo "3. Access the applications:"
    echo "   - Web Platform: http://localhost:3000"
    echo "   - API Server: http://localhost:8000"
    echo "   - Mobile App: Use Expo Go to scan QR code"
    echo ""
    echo "4. For database management:"
    echo "   - Run 'cd api && npx prisma studio' to open Prisma Studio"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"