# BlueCarbon Hub

A comprehensive full-stack web application for tracking and managing blue carbon ecosystem conservation efforts. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🌊 Interactive Map
- Real-time GeoJSON visualization of blue carbon ecosystems
- Clickable features with detailed carbon sequestration data
- Filtering by ecosystem type and project status
- Built-in carbon calculator for CO₂ estimation

### 🏢 Project Management
- NGO project creation and management
- Community pledging system (volunteer hours and funding)
- Project progress tracking and updates
- Media galleries and timeline updates

### 👥 Community Features
- Action logging with photo uploads and GPS coordinates
- Credit system for conservation activities
- Community feed and social interactions
- Leaderboards for top contributors

### 📊 Role-Based Dashboards
- **User Dashboard**: Personal stats, recent actions, pledged projects
- **NGO Manager Dashboard**: Project management, volunteer tracking, analytics
- **Admin Dashboard**: Platform oversight, user management, system health

### 🏆 Gamification
- Credit system for conservation actions
- Achievement badges and milestones
- Community leaderboards
- Impact tracking and visualization

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: JWT with role-based access control
- **Maps**: Mapbox GL JS with GeoJSON support
- **State Management**: React Context + SWR for data fetching
- **Deployment**: Vercel (recommended) or Docker

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Mapbox account (for map functionality)

### Environment Variables

Create a `.env.local` file in the root directory:

\`\`\`env
# Authentication
JWT_SECRET=your-super-secret-jwt-key-here

# Mapbox (required for interactive map)
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-public-token

# Optional: Development redirect URL for auth
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd bluecarbon-hub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Mapbox token and JWT secret

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Accounts

The application includes demo accounts for testing:

### User Account
- **Email**: user@demo.com
- **Password**: demo123
- **Role**: Regular user with action logging and project pledging

### NGO Manager Account
- **Email**: ngo@demo.com
- **Password**: demo123
- **Role**: NGO manager with project creation and management

### Admin Account
- **Email**: admin@demo.com
- **Password**: demo123
- **Role**: Platform administrator with full system access

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Dashboard
- `GET /api/dashboard/stats` - User/NGO/Admin statistics
- `GET /api/dashboard/actions` - Recent user actions
- `POST /api/dashboard/actions` - Log new action

### Community
- `GET /api/community/actions` - Community actions feed
- `POST /api/community/actions` - Create new community action

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard data

### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/[id]` - Get project details
- `POST /api/projects/[id]/pledge` - Pledge to project

### Calculator
- `POST /api/calculator/estimate` - Calculate carbon sequestration

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy automatically on push

3. **Configure Environment Variables**
   - `JWT_SECRET`: Strong random string
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox public token

### Docker Deployment

1. **Build the Docker image**
   \`\`\`bash
   docker build -t bluecarbon-hub .
   \`\`\`

2. **Run the container**
   \`\`\`bash
   docker run -p 3000:3000 \
     -e JWT_SECRET=your-jwt-secret \
     -e NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token \
     bluecarbon-hub
   \`\`\`

## Project Structure

\`\`\`
bluecarbon-hub/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── calculator/        # Carbon calculator
│   ├── community/         # Community features
│   ├── dashboard/         # Role-based dashboards
│   ├── leaderboard/       # Community leaderboards
│   ├── map/               # Interactive map
│   └── projects/          # Project management
├── components/            # Reusable React components
│   ├── auth/              # Authentication components
│   ├── calculator/        # Calculator components
│   ├── community/         # Community components
│   ├── dashboard/         # Dashboard components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components
│   ├── leaderboard/       # Leaderboard components
│   ├── map/               # Map components
│   ├── projects/          # Project components
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions and types
├── public/                # Static assets
└── scripts/               # Database scripts and utilities
\`\`\`

## Key Features Explained

### Blue Carbon Ecosystems
The platform focuses on three main blue carbon ecosystems:
- **Mangroves**: Coastal forests that store carbon in biomass and sediment
- **Seagrass**: Underwater meadows with high carbon sequestration rates
- **Salt Marshes**: Coastal wetlands that capture and store atmospheric carbon

### Carbon Calculation
The built-in calculator estimates CO₂ sequestration based on:
- Ecosystem type and area
- Age and health of the ecosystem
- Regional climate factors
- Scientific research data

### Credit System
Users earn credits for conservation actions:
- Beach cleanups: 50 credits
- Mangrove planting: 75 credits
- Seagrass monitoring: 40 credits
- Coral restoration: 80 credits
- Custom actions: Variable credits

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Email: support@bluecarbonhub.org
- Documentation: [docs.bluecarbonhub.org](https://docs.bluecarbonhub.org)

## Acknowledgments

- Marine conservation organizations worldwide
- Blue carbon research community
- Open source contributors
- Mapbox for mapping services
- Vercel for hosting platform
