# Development Guide - Sikkim Monasteries Digital Platform

## 🏗️ Architecture Overview

The Sikkim Monasteries Digital Platform is a comprehensive system consisting of three main components:

### 1. Web Platform (Next.js)
- **Location**: `/web`
- **Technology**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Features**: 
  - Interactive monastery showcase
  - Virtual tours with 360° panoramas
  - 3D model viewer with Three.js
  - Digital documentation system
  - Responsive design for all devices

### 2. API Server (Node.js/Express)
- **Location**: `/api`
- **Technology**: Node.js, Express, TypeScript, Prisma, PostgreSQL
- **Features**:
  - RESTful API for all data operations
  - Authentication and authorization
  - File upload and media management
  - Database management with Prisma ORM
  - NMMA integration endpoints

### 3. Mobile App (React Native/Expo)
- **Location**: `/mobile`
- **Technology**: React Native, Expo, TypeScript
- **Features**:
  - Cross-platform mobile application
  - AR experiences with ARCore/ARKit
  - Offline content access
  - GPS navigation and maps
  - Push notifications

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git
- Expo CLI (for mobile development)

### Setup
1. **Clone and setup**:
   ```bash
   git clone <repository-url>
   cd sikkim-monasteries-platform
   ./setup.sh
   ```

2. **Configure environment**:
   - Update `api/.env` with database credentials
   - Add API keys to `web/.env.local` and `mobile/.env`

3. **Start development**:
   ```bash
   npm run dev  # Starts all services
   ```

## 📁 Project Structure

```
sikkim-monasteries-platform/
├── web/                    # Next.js web application
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── lib/          # Utilities and helpers
│   ├── public/           # Static assets
│   └── package.json
├── api/                   # Node.js API server
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Data models
│   │   ├── routes/       # API routes
│   │   └── services/     # Business logic
│   ├── prisma/           # Database schema
│   └── package.json
├── mobile/                # React Native mobile app
│   ├── src/
│   │   ├── screens/      # App screens
│   │   ├── components/   # Reusable components
│   │   ├── services/     # API services
│   │   └── utils/        # Utilities
│   └── package.json
├── shared/                # Shared utilities and types
├── docs/                  # Documentation
├── assets/                # Media files and 3D models
└── package.json          # Root package.json
```

## 🗄️ Database Schema

The platform uses PostgreSQL with Prisma ORM. Key entities include:

### Core Entities
- **Monastery**: Main monastery information
- **VirtualTour**: 360° panoramic tours
- **Model3D**: 3D architectural models
- **Artifact**: Sacred objects and artifacts
- **Ritual**: Ceremonies and religious practices
- **HistoricalRecord**: Manuscripts and documents
- **User**: User accounts and authentication
- **Review**: User reviews and ratings

### Relationships
- Monasteries have multiple virtual tours, 3D models, artifacts, rituals, and historical records
- Users can contribute content and leave reviews
- All content is versioned and has publication status

## 🔧 Development Workflow

### 1. Web Development
```bash
cd web
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

### 2. API Development
```bash
cd api
npm run dev          # Start with nodemon
npm run build        # Build TypeScript
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### 3. Mobile Development
```bash
cd mobile
npm run start        # Start Expo development server
npm run android      # Run on Android
npm run ios          # Run on iOS (macOS only)
npm run web          # Run in web browser
```

## 🎨 Key Features Implementation

### Virtual Tours
- **Technology**: Pannellum.js for 360° panoramas
- **Features**: Interactive hotspots, audio narration, mobile optimization
- **File Format**: Equirectangular panorama images

### 3D Models
- **Technology**: Three.js with React Three Fiber
- **Features**: Interactive viewing, annotations, mobile compatibility
- **File Format**: GLTF/GLB for optimal performance

### AR Experiences
- **Technology**: ARCore (Android), ARKit (iOS)
- **Features**: Location-based overlays, 3D model placement, historical context
- **Implementation**: Expo AR modules

### Digital Documentation
- **Features**: High-resolution photography, metadata cataloging, search functionality
- **Integration**: NMMA and National Mission for Manuscripts APIs
- **Storage**: Local file system with cloud backup options

## 🔐 Authentication & Security

### JWT Authentication
- Access tokens (1 hour expiry)
- Refresh tokens (7 days expiry)
- Role-based access control (User, Admin, Curator, Researcher)

### Security Measures
- Helmet.js for security headers
- CORS configuration
- Input validation and sanitization
- File upload restrictions
- Rate limiting (to be implemented)

## 📱 Mobile App Features

### Core Features
- Monastery discovery and information
- Virtual tour viewing
- AR experiences
- Offline content access
- GPS navigation

### AR Implementation
```typescript
// Example AR component structure
import { AR } from 'expo-ar'

const ARExperience = () => {
  // AR session management
  // 3D model placement
  // Location-based triggers
  // Historical overlays
}
```

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh` - Refresh token

### Monasteries
- `GET /api/v1/monasteries` - List monasteries
- `GET /api/v1/monasteries/:id` - Get monastery details
- `GET /api/v1/monasteries/featured/list` - Featured monasteries
- `GET /api/v1/monasteries/search/query` - Search monasteries

### Documentation
- `GET /api/v1/documentation/artifacts` - List artifacts
- `GET /api/v1/documentation/rituals` - List rituals
- `GET /api/v1/documentation/historical-records` - List records
- `GET /api/v1/documentation/categories` - Get categories

### Media
- `POST /api/v1/media/upload` - Upload files
- `GET /api/v1/media/files/:filename` - Serve files
- `GET /api/v1/media/virtual-tours/:id` - Virtual tour media
- `GET /api/v1/media/models3d/:id` - 3D model media

## 🧪 Testing Strategy

### Unit Testing
- Jest for JavaScript/TypeScript testing
- React Testing Library for component testing
- Prisma testing utilities for database testing

### Integration Testing
- API endpoint testing with Supertest
- Database integration tests
- Cross-platform mobile testing

### E2E Testing
- Playwright for web application testing
- Detox for mobile app testing

## 🚀 Deployment

### Web Platform
- **Production**: Vercel or Netlify
- **Environment**: Node.js 18+
- **Build**: `npm run build`
- **Domain**: Custom domain with SSL

### API Server
- **Production**: AWS EC2, DigitalOcean, or Railway
- **Database**: AWS RDS PostgreSQL or managed database
- **Storage**: AWS S3 for media files
- **Environment**: Node.js 18+

### Mobile App
- **iOS**: App Store via Expo Application Services (EAS)
- **Android**: Google Play Store via EAS
- **OTA Updates**: Expo Updates for instant updates

## 📊 Performance Optimization

### Web Platform
- Next.js Image Optimization
- Code splitting and lazy loading
- CDN for static assets
- Service worker for offline functionality

### API Server
- Database query optimization
- Response caching with Redis
- File compression
- Rate limiting

### Mobile App
- Image optimization and caching
- Offline data synchronization
- Bundle size optimization
- Performance monitoring

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   cd api
   npx prisma db push
   npx prisma generate
   ```

2. **Mobile App Build Issues**
   ```bash
   cd mobile
   npx expo install --fix
   npx expo start --clear
   ```

3. **Web Build Issues**
   ```bash
   cd web
   rm -rf .next
   npm run build
   ```

### Development Tips

1. **Database Management**
   - Use Prisma Studio for data visualization
   - Always backup before schema changes
   - Use migrations for production changes

2. **Mobile Development**
   - Test on both iOS and Android
   - Use Expo Go for quick testing
   - Test AR features on physical devices

3. **Web Development**
   - Use browser dev tools for debugging
   - Test responsive design on multiple devices
   - Optimize images and assets

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [Three.js Documentation](https://threejs.org/docs)
- [Pannellum Documentation](https://pannellum.org/documentation/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sikkim Tourism Department
- National Mission on Monuments and Antiquities (NMMA)
- National Mission for Manuscripts
- Local monastery communities and cultural experts
- Open source contributors and libraries