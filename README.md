# 📚 Bookie

A modern book management and discovery app featuring popular BookTok fantasy and romance novels. Keep track of your reading journey with books that are trending on social media!

## ✨ Features

- **Curated Book Collection**: Hand-picked fantasy and romance books popular on BookTok
- **Reading Status Tracking**: Organize books by "read", "reading", or "want-to-read"
- **Responsive Design**: Mobile-first design with dropdown navigation
- **Modern UI**: Clean interface built with Tailwind CSS
- **Book Details**: Comprehensive information including ratings, descriptions, and publication details

## 📖 Book Genres

- **Fantasy Romance**: Dragon riders, fae courts, and magical worlds
- **Contemporary Romance**: College romance, sports romance, and modern love stories
- **Popular Titles**: Including Fourth Wing, ACOTAR, The Cruel Prince, Icebreaker, and more!

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a service for reviews and data
- **ESLint** - Code linting for quality assurance
- **Font Awesome** - Icons for enhanced UI

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookie
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 📱 Usage

### Mobile Navigation
- Click the "Menu" button to access the dropdown navigation
- Navigate between Home, About, and Contact sections
- Responsive design adapts to different screen sizes

### Book Data
Books are stored in `app/mocks/books.json` with the following structure:
```json
{
  "id": "1",
  "title": "Fourth Wing",
  "author": "Rebecca Yarros",
  "genre": "Fantasy Romance",
  "rating": 4.6,
  "status": "read",
  "description": "...",
  "tags": ["fantasy romance", "dragons", "academy", "booktok"]
}
```

## 📁 Project Structure

```
bookie/
├── public/
├── app/
│   ├── book/
│   │   └── [id]/
│   │       └── page.jsx     # Dynamic book detail page
│   ├── favorites/
│   │   └── page.jsx         # Favorites page
│   ├── mocks/
│   │   └── books.json       # Book data
│   ├── layout.jsx           # Root layout
│   ├── page.jsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Navigation/
│   ├── BookCard/
│   └── ...
├── package.json
└── README.md
```

## 🎨 Styling

The app uses Tailwind CSS for styling with a custom color scheme:
- **Light Theme**: Cream background (#F7F9EB) with dark blue text (#2d485f)
- **Dark Theme**: Deep blue background (#335776) with light text
- **Responsive**: Mobile-first approach with responsive breakpoints

## 📚 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔮 Future Features

- [ ] Book search and filtering
- [ ] Personal reading lists
- [ ] Book reviews and ratings
- [ ] Reading progress tracking
- [ ] Social sharing features
- [ ] Book recommendations
- [ ] Dark/light mode toggle

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- BookTok community for book recommendations
- All the amazing authors whose books are featured
- React and Vite teams for the excellent developer experience

---

Happy Reading! 📖✨