# Contributing to FocusFlow AI 🧠

First off, thank you for considering contributing to FocusFlow AI! It's people like you that make this neural productivity platform even better.

## 🌟 How Can I Contribute?

### Reporting Bugs 🐛
- Use the **Bug Report** template when creating an issue
- Check if the bug has already been reported
- Include detailed steps to reproduce
- Add screenshots if applicable

### Suggesting Features 💡
- Use the **Feature Request** template
- Clearly describe the use case and benefit
- Consider how it aligns with FocusFlow AI's mission

### Code Contributions 💻

#### Prerequisites
- Node.js 20+ installed
- MongoDB Atlas account (free tier works)
- Basic knowledge of React, Node.js, and Three.js

#### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/focusflow-ai.git
   cd focusflow-ai
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with:
   # MONGODB_URI=your_mongodb_connection_string
   # JWT_SECRET=random_secure_string
   # PORT=5000
   
   npm run dev
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

#### Code Style Guidelines
- **Frontend**: Follow React best practices, use functional components with hooks
- **Backend**: Use async/await for asynchronous operations
- **Naming**: Use camelCase for variables, PascalCase for components
- **Comments**: Add JSDoc comments for functions
- **Formatting**: Run `npm run format` (if available) before committing

#### Commit Message Convention
```
feat: add neural soundscape feature
fix: resolve timer pause bug
docs: update installation guide
style: improve glassmorphism effects
refactor: optimize 3D rendering
test: add habit streak tests
```

#### Pull Request Process

1. **Update Documentation**: If you've added features, update the README
2. **Test Thoroughly**: Ensure all features work as expected
3. **Create PR**: 
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes you made and why
4. **Code Review**: Be responsive to feedback and questions
5. **Celebrate**: Once merged, you're an official FocusFlow AI contributor! 🎉

## 🎨 Design Philosophy

When contributing, keep in mind FocusFlow AI's core principles:
- **Neurodiversity-First**: ADHD and Autism-friendly design
- **Premium Aesthetics**: Glassmorphism, smooth animations, professional feel
- **Cognitive Science**: Features backed by productivity research
- **Zero Noise**: Minimal distractions, maximal focus

## 🔒 Security

If you discover a security vulnerability, please email **yashkurangale910@gmail.com** instead of using the issue tracker.

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## 🙏 Thank You!

Every contribution, whether it's a typo fix or a major feature, helps make FocusFlow AI better for everyone.

---

**Questions?** Feel free to reach out by opening a discussion or issue!
