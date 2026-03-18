# Shubham Jadhav - Full Stack Developer Portfolio

Welcome to my personal portfolio repository. This project is built with **Next.js 14 (App Router)** and **Tailwind CSS**, designed to be minimal, fast, and accessible. It showcases my skills, projects, and professional experience.

## 🚀 Live Demo

[Insert Live Demo Link Here]

## 🛠 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Manual integration (inspired by shadcn/ui)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** `next-themes` (Dark/Light mode)
- **Deployment:** [Vercel](https://vercel.com/)

## 📂 Project Structure

```bash
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout with ThemeProvider
│   ├── page.tsx          # Main landing page
│   ├── globals.css       # Global styles & Tailwind config
│   └── actions.ts        # Server actions (Email logic)
├── components/           # React components
│   ├── ui/               # Reusable UI components (Button, Card, Input...)
│   ├── header.tsx        # Navigation bar
│   ├── hero.tsx          # Hero section
│   ├── projects.tsx      # Projects grid
│   └── ...               # Other sections (About, Skills, Experience, Contact)
├── lib/                  # Utility functions
│   └── utils.ts          # Tailwind class merger
└── public/               # Static assets
    └── resume.pdf        # Resume file (Place your PDF here)
```

## ⚡ Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Shubhamjadhav86/PORTFOLIO.git
    cd PORTFOLIO
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Customization

-   **Resume:** Replace `public/resume.pdf` with your actual resume file.
-   **Projects:** Update `components/projects.tsx` with your real project details.
-   **Experience:** Update `components/experience.tsx` with your work history.
-   **Contact:** The contact form currently logs to the console using a Server Action. To convert this to real email sending, update `app/actions.ts` with a library like Resend or Nodemailer.

## 🤝 Contact

-   **Email:** shubhamjadhav86@gmail.com
-   **LinkedIn:** [Shubham Jadhav](https://linkedin.com/in/shubhamjadhav86)
-   **GitHub:** [Shubhamjadhav86](https://github.com/Shubhamjadhav86)
