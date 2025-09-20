# Church Newcomer Management Dashboard

A full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript for managing church newcomers and mentors.

## 🚀 Features

### Admin Panel Features
- **Newcomer Management**: Add and manage newcomer information with comprehensive status tracking
- **Mentor Management**: Full CRUD operations for mentor information
- **Status Tracking**: Track newcomers through various programs and classes
- **Responsive Design**: Clean, modern UI that works on desktop and mobile

### Newcomer Information Collected
- Personal details (name, email, address, phone)
- Mentor assignment
- Network information
- Status flags for various programs:
  - New Convert & Classes
  - Guest tracking (1st, 2nd, 3rd time)
  - Membership Classes
  - Foundation Classes
  - Leadership roles (Dream Team Leader, Pathfinder/CIDS)
  - G4A Training

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **TypeScript** for type safety
- **Express Validator** for input validation
- **CORS** for cross-origin requests
- **Morgan** for logging
- **Helmet** for security

### Frontend
- **React 18** with **TypeScript**
- **Redux Toolkit** for state management
- **RTK Query** for API interactions
- **React Router v6** for navigation
- **TailwindCSS** for styling
- **React Hook Form** for form handling
- **React Toastify** for notifications

## 📁 Project Structure

```
church-dashboard/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   └── server.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── store/          # Redux store
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd church-dashboard
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   cp env.example .env
   # Edit .env with your API URL
   npm start
   ```

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/church-dashboard
CORS_ORIGIN=http://localhost:3000
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎨 Design System

### Colors
- **Primary**: Dark Blue (#0659b4)
- **Secondary**: Light Blue (#289df9)
- **Font**: Montserrat

### UI Components
- Responsive design with TailwindCSS
- Reusable components (Button, Modal, LoadingSpinner)
- Form validation with error messages
- Toast notifications for user feedback

## 📚 API Endpoints

### Newcomers
- `GET /api/newcomers` - Get all newcomers
- `GET /api/newcomers/:id` - Get newcomer by ID
- `POST /api/newcomers` - Create new newcomer
- `PUT /api/newcomers/:id` - Update newcomer
- `DELETE /api/newcomers/:id` - Delete newcomer

### Mentors
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/:id` - Get mentor by ID
- `POST /api/mentors` - Create new mentor
- `PUT /api/mentors/:id` - Update mentor
- `DELETE /api/mentors/:id` - Delete mentor

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Start the production server: `npm start`
3. Set environment variables for production

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository.

---

Built with ❤️ for church communities
