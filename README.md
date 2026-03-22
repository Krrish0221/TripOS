# 🌍 TripOS

TripOS is a next-generation, AI-powered travel and tourism platform designed to revolutionize the way people plan their trips. Built for a hackathon, this platform focuses on accessibility, performance, and delivering highly personalized experiences using state-of-the-art language models and real-time APIs.

## ✨ Key Features

*   🧠 **AI-Powered Concierge:** Leverages the Groq API (LLaMA-3) to instantly generate personalized travel themes (Adventure, Relaxing, Photography), dynamic transit estimates, and curated "Must-Visit" spots for any location in the world.
*   🌐 **Multi-Language Support (i18n):** fully accessible with dynamic, real-time translations for UI elements and AI-generated content in **English, Spanish, Hindi, and Gujarati**.
*   📡 **Data Saver Mode:** Built for users with limited bandwidth. With the click of a button, heavy interactive map tiles are disabled and replaced with lightweight geographical text summaries powered by the Wikipedia API.
*   ⛅ **Live Climate Integration:** Fetches real-time weather conditions, temperature, and wind speed dynamically via the Open-Meteo API.
*   🎨 **Premium UI/UX:** Built with Tailwind CSS v4, featuring a beautiful glassmorphic aesthetic, seamless dark/light mode toggling (`next-themes`), and smooth micro-animations.
*   👤 **Interactive Dashboards:** Includes a functional Profile dashboard for managing settings, home cities, travel styles, and simulated "Saved Trips", alongside a robust Contact & Support center.

## 🛠️ Technology Stack

*   **Framework:** [Next.js](https://nextjs.org/) (App Router format)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **AI Backend:** [Groq API](https://console.groq.com/) (llama-3.3-70b-versatile)
*   **Geocoding & Weather:** [Open-Meteo API](https://open-meteo.com/)
*   **Geographical Data:** Wikipedia REST API

## 🚀 Getting Started

### 1. Clone the Repository
\`\`\`bash
git clone <your-repo-link>
cd "Travel and Tourism"
\`\`\`

### 2. Install Dependencies
Make sure you have Node.js installed, then run:
\`\`\`bash
npm install
\`\`\`

### 3. Environment Variables
Create a \`.env.local\` file in the root directory and add your Groq API Key required for the AI routing and insights:
\`\`\`env
GROQ_API_KEY=your_groq_api_key_here
\`\`\`

### 4. Run the Development Server
\`\`\`bash
npm run dev
\`\`\`
Navigate to [http://localhost:3000](http://localhost:3000) in your browser to explore TripOS.

## 📂 Project Structure

*   **/src/app:** Application routes (Features, Contact, Profile, About).
*   **/src/actions:** Next.js Server Actions (e.g., \`travel.ts\` for secure Groq API calls).
*   **/src/components:** Reusable UI components (Navbar, Providers, ProtectedRoute).
*   **/src/context:** Global State Contexts (\`LanguageContext.tsx\`, \`AuthContext.tsx\`).

## 💡 What's Next?
*   Full Database Integration (PostgreSQL / Prisma)
*   Authentication (NextAuth.js)
*   Flight and Hotel Booking API integrations

---
*Built with ❤️ for the AI Battle.*
