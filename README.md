# 🧠 FocusFlow AI: The Neural Productivity Platform

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://reactjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green?logo=springboot)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-17-orange?logo=openjdk)](https://openjdk.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-black?logo=three.js)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)

**FocusFlow AI** is a premium, high-fidelity productivity ecosystem designed for the modern age. It combines cognitive science, neural assistance, and immersive 3D environments to help users achieve a state of "Flow" and maintain peak mental performance.

## 📸 Visual Showcase

> *🎬 Demo screenshots and GIF coming soon! This section will showcase:*
> - Immersive 3D Home Environment
> - Neural Focus Timer in action
> - Gamification Dashboard
> - AI Daily Planner interface

> [!TIP]
> **Built for Neurodiversity**: Specifically designed with ADHD and Autism-friendly UX patterns to minimize cognitive load and maximize engagement.

---

## ✨ Features at a Glance

### 🎯 Intelligent Focus protocols
- **Deep Work Protocol**: High-stakes focus for complex development tasks.
- **Creative Synthesis**: Fluid environment for lateral thinking and ideation.
- **Rapid Re-Alignment**: 5-minute cognitive reset for mental fatigue.
- **Neural Recovery**: Guided restoration using Theta wave modulation concepts.

### 🤖 AI-Powered "Neural Coach"
- **Contextual Assistance**: Real-time tips based on your current focus state.
- **Smart Planning**: Personalized daily task deconstruction.
- **Cognitive Insights**: Analytics that tell you *when* and *how* you focus best.

### 🎮 Gamified Growth (Neural Rank)
- **Progression System**: Earn XP through successful focus blocks.
- **Focus Battles**: Compete against your own best stats or peer benchmarks.
- **Productivity Heatmaps**: Visual evidence of your cognitive consistency.

### 🌊 Immersive 3D HUD
- **Zero-Noise Design**: An interface that feels like a futuristic HUD.
- **Three.js Visuals**: Interactive 3D home scene that responds to user presence.
- **Premium Aesthetics**: Glassmorphism, neon glows, and professional typography.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS |
| **3D Engine** | Three.js, React Three Fiber, Framer Motion |
| **Backend** | Java 17, Spring Boot 3.2, Maven |
| **Database** | MongoDB Atlas (Spring Data MongoDB) |
| **Intelligence** | Neural Cognitive API |
| **Security** | Spring Security, JWT (jjwt), Bucket4j Rate Limiting |

---

## 📦 Installation & Setup

### 1. Prerequisites
- Java 17+ (JDK) installed
- Maven 3.8+ installed (or use the bundled wrapper)
- Node.js 18+ installed (for the frontend)
- MongoDB Atlas account
- Neural Engine API Key

### 2. Clone the Repository
```bash
git clone https://github.com/yashkurangale910-spec/focusflow-ai.git
cd focusflow-ai
```

### 3. Backend Setup (Spring Boot)
```bash
cd spring-backend

# Configure application.yml (src/main/resources/application.yml) with:
#   spring.data.mongodb.uri: your_mongodb_connection_string
#   app.jwt-secret: random_secure_string
#   app.neural-engine-key: your_key

# Build and run
mvn spring-boot:run
```

> The backend runs on **port 5000** by default.

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```

> The frontend dev server runs on **port 5173** by default.

---

## 🔒 Security Note
**DO NOT** commit your `.env` file. This project includes a `.gitignore` pre-configured to exclude sensitive credentials. Always use environment variables for deployment.

---

## 🤝 Contributing

We welcome contributions from the community! Whether it's:
- 🐛 Reporting bugs
- 💡 Suggesting new features  
- 📝 Improving documentation
- 💻 Submitting code changes

Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

### Quick Contribution Steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🗺️ Roadmap

### ✅ Completed
- [x] Core focus timer with multiple protocols
- [x] AI-powered daily planner
- [x] 3D immersive home environment
- [x] Gamification system with Neural Rank
- [x] Habit tracking and productivity heatmaps
- [x] **Backend Security & Error Handling** - Helmet, CORS, and Rate Limiting
- [x] **Centralized Service Architecture** - Refactored frontend API client

### 🚀 In Progress
- [ ] **Study Together Mode** - Collaborate with friends in real-time
  - [ ] Video access for virtual co-working sessions
  - [ ] Integrated chat for study groups
  - [ ] Shared focus timers and break synchronization
  - [ ] Virtual study rooms with whiteboard

### 📋 Planned Features
- [ ] Mobile app (React Native)
- [ ] Browser extension for distraction blocking
- [ ] Advanced team collaboration dashboard
- [ ] Advanced analytics and insights
- [ ] Voice-controlled interface
- [ ] Calendar integration (Google, Outlook)
- [ ] Spotify/Music integration for focus playlist

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Yash Kurangale**
- GitHub: [@yashkurangale910-spec](https://github.com/yashkurangale910-spec)
- Email: yashkurangale910@gmail.com

---

## 🙏 Acknowledgments

- Inspired by cognitive science research and flow state theory
- Built with amazing open-source technologies
- Thanks to all contributors who help make FocusFlow AI better!

---

**Developed with ❤️ by Yash Kurangale**  
*Neural Productivity for the Next Generation.*
