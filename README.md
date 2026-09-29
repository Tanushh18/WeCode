# WeCode: A Real-Time Collaborative Coding Platform

![WeCode Banner](https://wecode-2.onrender.com)

## Overview

**WeCode** is a comprehensive full-stack MERN (MongoDB, Express, React, Node.js) platform designed to revolutionize coding practice and peer collaboration. It combines real-time collaborative code editing, live video/audio communication, structured DSA learning resources, and a vibrant social community in one unified platform.

Whether you're preparing for technical interviews, learning data structures and algorithms, or collaborating with peers on coding problems, WeCode provides all the tools you need in a seamless, integrated environment.

### Key Highlights

- **Real-Time Collaboration**: Code with peers simultaneously using WebSocket-based synchronization
- **Live Communication**: Built-in video and audio calling using WebRTC
- **Structured Learning**: Comprehensive DSA content with video tutorials
- **Social Community**: Share progress, follow peers, and engage with a coding community
- **Admin Dashboard**: Manage problems, track user activity, and monitor platform usage
- **Secure Authentication**: Multi-authentication support (Google OAuth + JWT-based custom auth)

---

## 🎯 Features

### 1. Real-Time Collaborative Code Editor

- **Monaco Editor Integration**: Industry-standard code editor with syntax highlighting for multiple languages
- **Real-Time Synchronization**: Keystroke-level synchronization using Socket.IO WebSockets
- **Session Management**: UUID-based unique sessions for easy room creation and joining
- **Multi-Participant**: Support multiple users editing the same code simultaneously
- **Persistent Sessions**: Session history saved to MongoDB for later retrieval

### 2. Live Video & Audio Communication

- **WebRTC P2P Connection**: Direct peer-to-peer video and audio communication
- **Socket.IO Signaling**: Reliable signaling server for connection establishment
- **Room Management**: Join specific rooms using UUIDs
- **Control Features**: Mute/unmute audio, enable/disable video
- **Bandwidth Optimized**: WebRTC optimization for low-bandwidth environments

### 3. DSA Learning Platform

- **Structured Content**: Comprehensive notes on key DSA topics:
  - Arrays, Linked Lists, Stacks, Queues
  - Trees, Graphs, Binary Search Trees
  - Dynamic Programming, Greedy Algorithms
  - Sorting & Searching Algorithms
  
- **Video Integration**: Embedded YouTube tutorials for visual learning
- **Progressive Learning**: Content organized by difficulty and prerequisites
- **Interactive Dashboard**: Track your learning progress

### 4. LeetCode Integration

- **Problem Repository**: Curated collection of coding problems
- **Difficulty Levels**: Easy, Medium, and Hard categorized questions
- **Tracking Features**:
  - Mark problems as solved/completed
  - Save favorite problems for later
  - Create custom problem lists
- **Direct Integration**: Submit code directly to LeetCode with a single click
- **Default Templates**: Pre-filled code templates for quick starts

### 5. Code Execution

- **Backend Execution**: Secure code execution on Node.js backend
- **Judge0 Integration**: Optional advanced code execution with Judge0 API
- **Language Support**: Multiple programming languages
- **Error Handling**: Comprehensive error reporting and debugging information
- **Test Cases**: Run against predefined test cases

### 6. Admin Dashboard

- **Problem Management**:
  - Create, update, and delete coding problems
  - Manage problem metadata (difficulty, category, topics)
  - Handle test cases and expected outputs
  
- **User Management**:
  - View all registered users
  - Track user activity and statistics
  - Manage user permissions and roles
  - Delete inactive accounts
  
- **Analytics & Monitoring**:
  - Activity logs and user engagement metrics
  - Question solved statistics
  - User performance tracking
  - Platform health monitoring

### 7. Social Feed & Community

- **Activity Feed**: LinkedIn-style feed showing user activities
- **Follow System**: Follow other users to see their progress
- **Post Creation**: Share tips, solutions, and experiences
- **Engagement Features**:
  - Like posts
  - Comment on shared content
  - Share solutions with the community
- **User Profiles**: Customizable profiles with activity history

### 8. User Authentication & Security

- **Multiple Auth Methods**:
  - **Google OAuth**: Seamless login via Firebase
  - **Custom Registration**: Email-based signup with password hashing
  
- **Security Features**:
  - bcrypt password hashing
  - JWT tokens with expiration
  - Refresh token mechanism
  - Token expiry: 1 day (access), 7 days (refresh)
  - Secure cookie-based session management
  - Input validation and sanitization

### 9. File Upload & Media Management

- **Profile Pictures**: Upload custom profile images
- **Post Attachments**: Attach images to social posts
- **Multer Integration**: Secure file upload middleware
- **Cloudinary Storage**: Scalable image hosting and optimization
- **Size Limits**: Configurable upload size restrictions

### 10. User Profiles & Progress Tracking

- **Profile Management**:
  - Custom profile information
  - Profile picture upload
  - Activity history
  
- **Progress Metrics**:
  - Problems solved count
  - Topics mastered
  - Activity logs
  - Points/scoring system
  
- **Custom Lists**: Create personalized problem lists for targeted practice

---

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0**: Modern UI library with hooks
- **React Router v7**: Client-side routing and navigation
- **Axios**: Promise-based HTTP client
- **Monaco Editor**: Professional code editor component
- **Socket.IO Client**: Real-time WebSocket communication
- **Firebase 11.6.0**: Google OAuth and authentication
- **Chakra UI**: Modern UI component library
- **Material-UI (MUI)**: Material Design components
- **Framer Motion**: Animation library
- **Recharts & ECharts**: Data visualization
- **React Parallax Tilt**: Interactive 3D effects
- **Lottie React**: Animation support
- **JWT Decode**: Token parsing utility

### Backend
- **Node.js & Express 5.1.0**: Server framework
- **MongoDB & Mongoose 8.13.2**: NoSQL database with ODM
- **Socket.IO 4.8.1**: Real-time bidirectional communication
- **Firebase Admin SDK**: Authentication & services
- **JWT (jsonwebtoken)**: Token-based authentication
- **bcrypt/bcryptjs**: Password hashing
- **Multer**: File upload middleware
- **Cloudinary**: Cloud image storage
- **Nodemailer**: Email notification service
- **Axios**: HTTP client for external APIs
- **CORS**: Cross-origin resource sharing
- **Cookie Parser**: Cookie management
- **UUID**: Unique identifier generation
- **XLSX**: Spreadsheet file handling
- **Nodemon**: Development auto-reload

### DevOps & Deployment
- **Docker**: Containerization (optional)
- **Render**: Backend hosting
- **Vercel/Netlify**: Frontend hosting
- **MongoDB Atlas**: Cloud database

### External Services
- **Firebase Authentication**: Google OAuth provider
- **Cloudinary**: Image hosting service
- **Judge0 API**: Optional advanced code execution
- **Gmail SMTP**: Email notifications
- **YouTube API**: Video embedding

---

## 📁 Project Structure

```
WeCode/
├── client/                          # React Frontend Application
│   ├── src/
│   │   ├── screens/                # Main page components
│   │   │   ├── HomeScreen/         # Landing & home page
│   │   │   ├── LoginScreen/        # User login
│   │   │   ├── RegisterScreen/     # User registration
│   │   │   ├── DSA/                # DSA learning dashboard
│   │   │   ├── FeedDashboard/      # Social feed
│   │   │   ├── CustomRoom/         # Custom code room
│   │   │   ├── UploadPosts/        # Create & share posts
│   │   │   ├── UserDetails/        # User profile management
│   │   │   ├── Admin/              # Admin dashboard
│   │   │   ├── Follow/             # Follow system UI
│   │   │   ├── WebDev/             # Web development content
│   │   │   └── AboutScreen/        # About page
│   │   │
│   │   ├── Rooms/                  # Collaborative features
│   │   │   ├── room.jsx            # Room component
│   │   │   ├── CodeEditor.jsx      # Monaco editor integration
│   │   │   ├── VideoConferencing.jsx # WebRTC video/audio
│   │   │   └── LanguageSelector.jsx  # Code language selector
│   │   │
│   │   ├── Layout1/                # Layout components
│   │   │   ├── Layout.jsx          # Main layout wrapper
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   └── Footer.jsx          # Footer component
│   │   │
│   │   ├── sockets/                # Socket.IO configuration
│   │   │   └── socket.js           # Socket connection setup
│   │   │
│   │   ├── service/                # External services
│   │   │   └── peer.js             # WebRTC peer connection
│   │   │
│   │   ├── utils/                  # Utility functions
│   │   │   ├── FireBase.jsx        # Firebase configuration
│   │   │   ├── Logout.js           # Logout handler
│   │   │   └── quotes.js           # Quote data
│   │   │
│   │   ├── assets/                 # Static assets
│   │   ├── App.js                  # Main app component
│   │   ├── index.js                # React entry point
│   │   ├── constants.js            # App constants
│   │   └── .env                    # Environment variables
│   │
│   ├── package.json                # Frontend dependencies
│   └── public/                     # Static files

├── server/                          # Express Backend Application
│   ├── controllers/                # Route handlers & business logic
│   │   ├── Route.controller.js     # Auth & user endpoints
│   │   ├── Question.controller.js  # Problem management
│   │   ├── Room.controller.js      # Room creation & joining
│   │   ├── profile.controller.js   # User profile operations
│   │   ├── post.controller.js      # Social feed operations
│   │   ├── Follow.controller.js    # Follow/unfollow logic
│   │   ├── Submit.controller.js    # Code submission
│   │   └── HandlerQuestions.js     # Question handling
│   │
│   ├── models/                     # Mongoose schemas
│   │   ├── user.model.js           # User schema
│   │   ├── Room.model.js           # Room schema
│   │   ├── adminquestions.model.js # Problems schema
│   │   ├── post.model.js           # Post schema
│   │   ├── Follow.model.js         # Follow relationship schema
│   │   ├── customList.model.js     # Custom list schema
│   │   └── activitylog.model.js    # Activity log schema
│   │
│   ├── Route/                      # API routes
│   │   └── routes.js               # Route definitions
│   │
│   ├── middleware/                 # Express middleware
│   │   ├── auth.js                 # JWT verification
│   │   ├── multer.js               # File upload configuration
│   │   └── emailverify.js          # Email verification
│   │
│   ├── Sockets/                    # WebSocket handlers
│   │   └── socket.js               # Socket.IO event handlers
│   │
│   ├── config/                     # Configuration files
│   │   ├── db.js                   # MongoDB connection
│   │   └── FileHandling.js         # Cloudinary configuration
│   │
│   ├── utils/                      # Utility functions
│   ├── public/                     # Static files
│   ├── index.js                    # Server entry point
│   ├── package.json                # Backend dependencies
│   └── .env                        # Environment variables

├── package.json                    # Root package configuration
├── package-lock.json               # Dependency lock file
├── Problems_Format_WeCode.xlsx     # Problem format specification
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** v16.0 or higher
- **npm** v8.0 or higher
- **MongoDB** (local or MongoDB Atlas cloud)
- **Git** for version control
- **Firebase Project** (for Google OAuth)
- **Cloudinary Account** (for image uploads)

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tanushh18/WeCode.git
cd WeCode
```

### Step 2: Install Dependencies

Install root dependencies:
```bash
npm install
```

### Step 3: Configure Environment Variables

#### Server Configuration (.env)

Create `/server/.env` file with the following variables:

```env
# Server Configuration
PORT=2000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Authentication
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_SECRET_EXPIRE=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_SECRET_EXPIRE=7d

# Firebase Configuration
FIREBASE_ADMIN_CREDENTIALS='{"type": "service_account", ...}'

# Cloudinary Configuration
Cloudinary_name=your_cloudinary_name
Cloudinary_api_key=your_api_key
Cloudinary_api_secret=your_api_secret

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
adminEmails=admin@example.com

# Judge0 API Configuration (Optional - for code execution)
JUDGE0_API_URL_1=https://judge0-ce.p.rapidapi.com
RAPIDAPI_KEY_1=your_key_1
RAPIDAPI_HOST_1=judge0-ce.p.rapidapi.com

# Additional Judge0 instances (optional)
JUDGE0_API_URL_2=...
RAPIDAPI_KEY_2=...
# ... etc
```

#### Client Configuration (.env)

Create `/client/.env` file:

```env
REACT_APP_API_URL=http://localhost:2000
REACT_APP_SOCKET_URL=http://localhost:2000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_CLOUDINARY_NAME=your_cloudinary_name
```

### Step 4: Start the Application

#### Development Mode (Both server and client)

```bash
npm run dev
```

This uses `npm-run-all` (concurrently) to start both:
- Frontend: http://localhost:3000
- Backend: http://localhost:2000

#### Individual Startup

Start server:
```bash
npm run server
```

Start client (in another terminal):
```bash
npm run client
```

---

## 📖 Usage

### User Registration & Login

1. Navigate to the registration page
2. Choose authentication method:
   - **Google OAuth**: Click "Sign in with Google"
   - **Email/Password**: Fill registration form
3. Complete email verification if required
4. Access dashboard

### Creating a Collaborative Room

1. Click "Create Room" from dashboard
2. Unique UUID is generated automatically
3. Share UUID with peers
4. Start collaborative coding session
5. Toggle video/audio as needed

### Solving DSA Problems

1. Navigate to DSA Dashboard
2. Select topic or difficulty level
3. Read problem statement
4. Write solution in editor
5. Execute and test with provided test cases
6. Mark as solved once successful

### Engaging with Community

1. Visit Social Feed
2. Create post with tips or solutions
3. Follow other users to see their activity
4. Like and comment on posts
5. Share your progress with the community

### Admin Panel

1. Login with admin credentials
2. Access admin dashboard
3. Available functions:
   - Add/Edit/Delete problems
   - View user statistics
   - Monitor platform activity
   - Manage user accounts

---

## 🔐 Security & Authentication

### Authentication Methods

**Google OAuth via Firebase**
- Secure third-party authentication
- No password storage required
- Seamless user experience

**Custom JWT Authentication**
- Email/password signup
- Bcrypt password hashing
- JWT token-based sessions
- Token expiration & refresh mechanism

### Security Features

- **Password Security**: Passwords hashed using bcryptjs
- **Session Management**: JWT tokens with expiration
- **Input Validation**: All inputs sanitized and validated
- **CORS Protection**: Configurable allowed origins
- **Rate Limiting**: Recommended for production
- **Data Encryption**: Sensitive data encrypted in transit (HTTPS)
- **Database Security**: MongoDB Atlas with IP whitelisting

### Best Practices for Deployment

1. Use environment variables for all secrets
2. Enable HTTPS/TLS
3. Set strong JWT secrets (32+ characters)
4. Configure CORS strictly
5. Enable MongoDB authentication
6. Regular security audits
7. Keep dependencies updated
8. Use admin email verification

---

## 🗄️ Database Schema

### Collections

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  password: String (hashed),
  profileImage: String (URL),
  bio: String,
  isAdmin: Boolean,
  createdAt: Date,
  updatedAt: Date,
  sessions: [Session],
  questionsSolved: [ObjectId],
  points: Number
}
```

#### Rooms Collection
```javascript
{
  _id: ObjectId,
  roomId: String (UUID),
  participants: [ObjectId],
  code: String,
  language: String,
  createdAt: Date,
  updatedAt: Date,
  isActive: Boolean
}
```

#### Problems Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  difficulty: String (Easy/Medium/Hard),
  category: String,
  testCases: [TestCase],
  solutions: [String],
  defaultCode: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Posts Collection
```javascript
{
  _id: ObjectId,
  author: ObjectId (ref: User),
  content: String,
  images: [String],
  likes: [ObjectId],
  comments: [Comment],
  createdAt: Date,
  updatedAt: Date
}
```

#### Follow Collection
```javascript
{
  _id: ObjectId,
  follower: ObjectId (ref: User),
  following: ObjectId (ref: User),
  createdAt: Date
}
```

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy: Render will auto-build and deploy

### Frontend Deployment (Vercel/Netlify)

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Deploy

### Environment Setup for Production

1. Use MongoDB Atlas for database
2. Set `NODE_ENV=production`
3. Enable HTTPS
4. Configure production Firebase project
5. Update CORS origins
6. Set secure JWT secrets
7. Enable rate limiting
8. Configure monitoring & logging

### Deployed Instance

- **Frontend**: https://wecode-2.onrender.com
- **API Base**: Backend running on specified PORT

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change PORT in .env
# Or kill process on port 2000
lsof -ti:2000 | xargs kill -9
```

**MongoDB Connection Failed**
```
- Verify MONGO_URI is correct
- Check IP whitelisting in MongoDB Atlas
- Ensure credentials are valid
```

**Socket.IO Connection Issues**
```
- Verify CORS_ORIGINS includes frontend URL
- Check firewall settings
- Ensure server is running
```

**Firebase Authentication Error**
```
- Verify FIREBASE_ADMIN_CREDENTIALS JSON
- Check Firebase project settings
- Ensure service account has required permissions
```

**Cloudinary Upload Failed**
```
- Verify credentials in .env
- Check file size limits
- Ensure account has upload permissions
```

**Code Execution Timeout**
```
- Check Judge0 API limits
- Verify API keys are valid
- Review code for infinite loops
```

---

## 🛣️ API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `POST /auth/google` - Google OAuth login
- `POST /forgotpass` - Password reset request
- `POST /verifyotp` - OTP verification
- `POST /updatepassword` - Update password

### Problems/Questions
- `GET /fetch_dashboard` - Get problems for dashboard
- `GET /solvedquestions` - Get user's solved problems
- `GET /testcases/:title` - Get test cases for problem
- `GET /testcases/default/:title` - Get default code
- `POST /questions_update` - Update problem progress
- `POST /adminquestionsadd` - Add new problem (admin)
- `GET /allquestions` - Get all problems
- `POST /adminquestionupdate` - Update problem (admin)
- `POST /adminquestiondelete` - Delete problem (admin)
- `POST /submitcode` - Submit code solution
- `POST /questionhandler` - Handle problem metrics

### Custom Lists
- `POST /create-list` - Create custom problem list
- `GET /my-lists` - Get user's lists
- `POST /add-question-to-list` - Add problem to list
- `POST /view-list` - View list contents
- `POST /delete-custom-list` - Delete list
- `POST /delete-question-from-list` - Remove problem from list

### Rooms (Collaboration)
- `GET /create_room` - Create new room
- `POST /join_room` - Join existing room

### User Profile
- `GET /userprofile` - Get user profile
- `POST /user_update_profile` - Update profile with image
- `GET /userpoints` - Get user points
- `GET /activitylog` - Get activity log
- `GET /alluserssignedin` - List signed-in users (admin)

### Social Features
- `POST /follow` - Follow user
- `POST /unfollow` - Unfollow user
- `POST /check-following` - Check if following
- `GET /follow-dashboard` - Get follow feed
- `GET /SearchUser` - Search users
- `POST /upload-post` - Create post with images
- `GET /Feed` - Get social feed

### Admin
- `GET /allusers` - Get all users (admin)
- `GET /allgoogleusers` - Get Google auth users (admin)
- `POST /deleteuser` - Delete user (admin)
- `GET /questiongraph` - Problem statistics (admin)

---

## 🤝 Contributing

We welcome contributions! Here's how to contribute:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/WeCode.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   - Describe your changes
   - Reference related issues
   - Follow existing code style

### Contribution Guidelines

- Follow existing code style and conventions
- Write clear commit messages
- Add comments for complex logic
- Test thoroughly before submitting PR
- Update documentation as needed
- Add tests for new features
- Respect the existing architecture

### Areas for Contribution

- Bug fixes and improvements
- New features (clear with maintainers first)
- Documentation enhancements
- Performance optimizations
- UI/UX improvements
- Additional language support
- Test coverage expansion

---

## 📊 Performance Optimization

### Frontend Optimizations
- Lazy loading of components
- Code splitting with React Router
- Image optimization and lazy loading
- Memoization of expensive components
- WebSocket event throttling

### Backend Optimizations
- Database query indexing
- Connection pooling
- Caching strategies
- Efficient socket event handling
- Load balancing for multiple Judge0 instances

### Database Optimization
- Proper indexing on frequently queried fields
- Query optimization
- Connection pooling
- Regular maintenance

---

## 📋 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

MIT License allows:
- Commercial use
- Private use
- Modification
- Distribution

With conditions:
- License and copyright notice must be included
- Changes must be documented

---

## 👥 Credits & Acknowledgments

**Developer**: Tanushh18 - [GitHub Profile](https://github.com/Tanushh18)

### Key Technologies Used
- React.js community
- Express.js ecosystem
- MongoDB documentation
- Socket.IO developers
- Firebase by Google
- WebRTC protocols

### External Resources
- Judge0 API for code execution
- Firebase for authentication
- Cloudinary for image hosting
- YouTube API for content embedding
- Gmail SMTP for notifications

---

## 📞 Support & Contact

For issues, questions, or suggestions:

1. **GitHub Issues**: [Create an issue](https://github.com/Tanushh18/WeCode/issues)
2. **Email**: [Contact Developer](mailto:tanushh18@example.com)
3. **Documentation**: Check the README and existing issues
4. **Community**: Engage with other users in discussions

### Reporting Bugs

When reporting bugs, please include:
- Detailed description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node version)
- Screenshots/logs if applicable

### Feature Requests

Feel free to suggest improvements:
- Describe the feature clearly
- Explain the use case
- Suggest implementation approach (optional)
- Check existing requests to avoid duplicates

---

## 🎓 Learning Resources

### For Getting Started
- [MERN Stack Tutorial](https://www.mongodb.com/languages/mongodb-with-nodejs)
- [Socket.IO Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev)
- [Express Guide](https://expressjs.com/)

### For Advanced Topics
- [WebRTC Basics](https://webrtc.org/)
- [MongoDB Advanced](https://docs.mongodb.com/manual/)
- [Real-Time Applications](https://socket.io/docs/v4/socket-io-protocol/)

---

## 🔄 Version History

### Current Version
- Latest stable release available at main branch
- Development in progress for new features

### Changelog
See commit history for detailed changes

---

## 🚦 Roadmap

### Planned Features
- Code review system
- Leaderboards and achievements
- Advanced code analytics
- Collaborative whiteboard
- Problem difficulty rating
- Enhanced notifications
- Mobile app
- AI-powered code assistance

### Future Enhancements
- Performance monitoring dashboard
- Advanced search filters
- Content recommendation engine
- Live problem competitions
- Certificate generation
- Integration with GitHub

---

## 📄 Additional Files

- **Problems_Format_WeCode.xlsx** - Template for problem format and specifications
- **.gitignore** - Git configuration for ignored files
- **package.json** - Root level dependencies and scripts
- **package-lock.json** - Dependency lock for reproducibility

---

## ⚡ Quick Commands

```bash
# Start development
npm run dev

# Start only server
npm run server

# Start only client
npm run client

# Build frontend for production
cd client && npm run build

# Run tests (if configured)
cd client && npm test

# Clean dependencies
rm -rf node_modules package-lock.json && npm install

# Check code quality (optional)
npm run lint
```

---

## 🌐 Deployment Checklist

- [ ] Update environment variables for production
- [ ] Configure MongoDB Atlas
- [ ] Set up Firebase production project
- [ ] Configure Cloudinary
- [ ] Set up email service
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS/SSL
- [ ] Set strong JWT secrets
- [ ] Test all authentication flows
- [ ] Verify file uploads work
- [ ] Test video/audio features
- [ ] Check admin panel functionality
- [ ] Set up monitoring and logging
- [ ] Configure automated backups
- [ ] Plan disaster recovery

---

## 📝 Notes for Developers

- Always use environment variables for sensitive data
- Keep dependencies updated
- Write descriptive commit messages
- Test locally before pushing
- Follow the established code structure
- Document complex implementations
- Use meaningful variable names
- Comment non-obvious logic
- Handle errors gracefully
- Validate all user inputs

---

**Last Updated**: September 2026

For more information, visit [WeCode Repository](https://github.com/Tanushh18/WeCode)

---

**Happy Coding! 🚀**
