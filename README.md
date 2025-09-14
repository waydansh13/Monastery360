# Sikkim Monasteries Digital Platform

A comprehensive digital platform for showcasing Sikkim's monasteries with interactive virtual tours, 3D models, and augmented reality experiences. This project supports the National Mission on Monuments and Antiquities (NMMA) and the National Mission for Manuscripts.

## 🏛️ Features

### Web Platform
- Interactive monastery showcase with high-quality imagery
- Virtual tours with 360° panoramic views
- 3D model viewer for architectural details
- Responsive design for all devices
- Multilingual support (English, Hindi, Nepali, Tibetan)

### Mobile App
- Detailed monastery information and history
- Interactive maps with GPS navigation
- Augmented Reality (AR) experiences
- Offline content access
- Push notifications for events and updates

### Digital Documentation
- Artifact cataloging and documentation
- Ritual and ceremony recordings
- Historical records digitization
- NMMA integration for heritage preservation
- Searchable database of cultural artifacts

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Start development servers:**
   ```bash
   npm run dev
   ```

3. **Access the applications:**
   - Web Platform: http://localhost:3000
   - API Server: http://localhost:8000
   - Mobile App: Use Expo Go app to scan QR code

## 📁 Project Structure

```
sikkim-monasteries-platform/
├── web/                 # Next.js web application
├── api/                 # Node.js/Express API server
├── mobile/              # React Native mobile app
├── shared/              # Shared utilities and types
├── docs/                # Documentation and guides
└── assets/              # 3D models, images, and media files
```

## 🛠️ Technology Stack

### Web Platform
- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **3D Graphics:** Three.js, React Three Fiber
- **Virtual Tours:** Pannellum.js
- **Maps:** Mapbox GL JS

### Mobile App
- **Framework:** React Native with Expo
- **AR:** ARCore (Android), ARKit (iOS)
- **Navigation:** React Navigation
- **State Management:** Redux Toolkit

### Backend
- **API:** Node.js, Express, TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **File Storage:** AWS S3 / Local storage
- **Authentication:** JWT with refresh tokens

## 🏗️ Development

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- Expo CLI (for mobile development)
- Git

### Environment Setup
1. Copy environment files:
   ```bash
   cp api/.env.example api/.env
   cp web/.env.example web/.env
   cp mobile/.env.example mobile/.env
   ```

2. Configure database and API keys in the `.env` files

3. Run database migrations:
   ```bash
   cd api && npx prisma migrate dev
   ```

## 📱 Mobile App Development

The mobile app is built with React Native and Expo, providing:
- Cross-platform compatibility (iOS/Android)
- AR capabilities for immersive experiences
- Offline functionality for remote monastery visits
- GPS integration for location-based features

## 🌐 Web Platform Features

- **Virtual Tours:** 360° panoramic views of monastery interiors
- **3D Models:** Interactive architectural models
- **Cultural Information:** Detailed histories and significance
- **Multimedia Gallery:** Photos, videos, and audio recordings
- **Educational Content:** Learning modules about Buddhist culture

## 🔧 API Documentation

The API provides endpoints for:
- Monastery data and metadata
- 3D model and media file serving
- User authentication and preferences
- Content management for administrators
- NMMA integration endpoints

## 📊 Digital Documentation

Comprehensive documentation system for:
- **Artifacts:** Cataloging with high-resolution photography
- **Rituals:** Video documentation with cultural context
- **Historical Records:** Digitization of manuscripts and documents
- **Metadata:** Structured data for heritage preservation

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

## 📞 Support

For support and questions:
- Email: support@sikkimheritage.org
- Documentation: [Project Wiki](link-to-wiki)
- Issues: [GitHub Issues](link-to-issues)