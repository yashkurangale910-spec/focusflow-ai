# FocusFlow Backend

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create .env file:
```
PORT=5000
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
FRONTEND_URL=http://localhost:5174
```

3. Run development server:
```bash
npm run dev
```

4. Run production:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Tasks
- `GET /api/tasks` - Get all tasks (requires auth)
- `POST /api/tasks` - Create task (requires auth)
- `PUT /api/tasks/:id` - Update task (requires auth)
- `DELETE /api/tasks/:id` - Delete task (requires auth)

### Sessions
- `GET /api/sessions` - Get all sessions (requires auth)
- `POST /api/sessions` - Create session (requires auth)
- `GET /api/sessions/analytics` - Get analytics (requires auth)

### AI
- `POST /api/ai/chat` - Chat with AI (requires auth)

## Deployment

### Vercel
```bash
vercel --prod
```

### Railway
```bash
railway up
```

Add environment variables in platform dashboard.
