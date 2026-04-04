# Clone repo
git clone <repo_url>
cd zorvyn-backend

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# update DATABASE_URL, JWT_SECRET, etc.

# Run migrations (create database tables)
npx prisma db push

# Start development server
npm run dev

# Run tests
npm test