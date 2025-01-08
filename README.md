# Portfolio Builder - Frontend

Create professional portfolios in minutes without coding! A user-friendly platform built with Next.js that helps you showcase your work with stunning, customizable designs.

## ✨ Features

- **No-Code Portfolio Creation:** Build professional portfolios without any technical knowledge
- **Customizable Templates:** Multiple stunning designs to choose from
- **Real-time Preview:** See changes as you make them
- **Responsive Design:** Perfect display across all devices
- **Easy Content Management:** Update your portfolio content seamlessly
- **Image Optimization:** Automatic image optimization for fast loading

## 🛠️ Tech Stack

- **Framework:** Next.js
- **Authentication:** Clerk
- **Image Hosting:** Cloudinary
- **Styling:** Tailwind CSS
- **State Management:** React Context/Redux

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Risabkshetri/PortfolioGen-frontend.git
cd PortfolioGen-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
NEXT_PUBLIC_API_URL=your_backend_api_url
```

4. Run the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── app/              # Next.js app router
├── components/       # Reusable components
├── lib/             # Utility functions
├── styles/          # Global styles
└── services/        # API services
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY | Clerk public key |
| CLERK_SECRET_KEY | Clerk secret key |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloudinary cloud name |
| NEXT_PUBLIC_API_URL | Backend API URL |
