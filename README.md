# 📚 Bookie

A modern book management and discovery app featuring popular BookTok fantasy and romance novels. Keep track of your reading journey with books that are trending on social media!

## Features

- **📚 Curated Book Collection**: Hand-picked fantasy and romance books popular on BookTok
- **⭐ Book Reviews & Ratings**: Submit and view user reviews with star ratings
- **🔍 Review Filtering**: Filter reviews by star rating with URL-based state persistence
- **📊 Average Rating System**: Real-time calculated averages from all user reviews
- **➕ Add New Books**: Contribute new books to the collection with full form validation
- **❤️ Favorites System**: Save favorite books with localStorage persistence
- **🎯 Dynamic Genres**: Filter books by genre with database-driven options
- **📱 Responsive Design**: Mobile-first design with dropdown navigation
- **🎨 Modern UI**: Clean interface built with Tailwind CSS and custom components
- **📖 Detailed Book Pages**: Comprehensive information including descriptions, tags, and user reviews
- **🔄 Real-time Updates**: Live data refresh when books or reviews are added

## Tech Stack

- **Next.js 15** - React framework with App Router and server components
- **React 19** - Modern React with hooks and state management
- **TypeScript** - Type-safe development with full type coverage
- **Supabase** - Database with secure server-side access
- **REST API** - Custom API routes for all data operations
- **Tailwind CSS** - Utility-first CSS framework with custom design system
- **ESLint** - Code linting for quality assurance
- **Prettier** - Code formatting for consistency
- **Font Awesome** - Icons and UI enhancements
- **LocalStorage API** - Client-side data persistence for favorites

## Security Architecture

This application implements a secure architecture with complete separation between client and database:

- **Server-Side Data Access**: All Supabase operations happen on the server through API routes
- **Protected Credentials**: Database credentials never exposed to the browser
- **REST API Layer**: Custom Next.js API routes handle all data operations
- **Input Validation**: Server-side validation for all incoming data
- **No Direct Database Calls**: Client components cannot access Supabase directly
- **Secure by Design**: Environment variables kept server-side only

This architecture ensures that even if someone inspects the browser console, they cannot:
- See database credentials
- Make direct database queries
- Bypass server-side validation
- Access unauthorized data

## Getting Started

### Prerequisites

- Node.js (version 18.18 or higher)
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

> **Note**: Next.js automatically loads `.env.local` and keeps it secure!

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## Usage

### Homepage
- Browse all available books in a responsive grid layout
- View average ratings and genres for each book
- Click the floating "Add Book" button to contribute new books
- Access your favorites from the navigation menu

### Book Details
- Click any book card to view detailed information
- Read user reviews and see average ratings
- Filter reviews by star rating (All, 1★, 2★, 3★, 4★, 5★)
- Filter state persists in URL for shareable links
- Submit your own reviews with star ratings
- Add/remove books from your favorites list

### Adding New Books
1. Click the green "Add Book" floating button on the homepage
2. Fill in required fields: Title, Author, Genre, Language, ISBN
3. Optionally add description and published year
4. Upload a book cover image or use the default placeholder
5. Submit to add the book to the database instantly

### Favorites Management
- Click the heart icon on any book card to add to favorites
- View all favorite books on the dedicated Favorites page
- Favorites are saved locally and persist between sessions

### Navigation
- **Available Pages**: Home, About, Favorites, Contact, Login
- **Mobile**: Use the hamburger menu for navigation
- **Desktop**: Access menu items from the top navigation bar
- **Responsive**: Interface adapts automatically to screen size

### API Architecture
All data operations go through secure REST API endpoints:

**Books:**
- `GET /api/books` - Fetch all books
- `POST /api/books` - Create new book
- `GET /api/books/:id` - Fetch single book by ID

**Comments/Reviews:**
- `GET /api/comments` - Fetch all comments
- `GET /api/comments?bookId=:id` - Fetch comments for specific book
- `POST /api/comments` - Create new comment
- `PUT /api/comments/:id` - Update comment
- `DELETE /api/comments/:id` - Delete comment

**Genres:**
- `GET /api/genres` - Fetch unique genres from all books

### Database
Books and reviews are stored in **Supabase** with the following structure:

**Books Table:**
```json
{
  "id": 1,
  "title": "Fourth Wing",
  "author": "Rebecca Yarros",
  "genre": "Fantasy Romance",
  "rating": null,
  "status": "read",
  "description": "...",
  "tags": "fantasy romance,dragons,academy,booktok",
  "coverImageUrl": "https://covers.openlibrary.org/...",
  "isbn": "9781649374045",
  "publishedYear": 2023,
  "language": "English",
  "format": "Paperback",
  "pages": 512,
  "publisher": "Entangled: Red Tower Books",
  "dateAdded": "2024-03-15"
}
```

**Comments/Reviews Table:**
```json
{
  "id": 1,
  "book_id": 1,
  "reviewer": "John Doe",
  "rating": 5,
  "comment": "Amazing book!",
  "created_at": "2024-03-15T10:00:00Z"
}
```

### Key Features Preview:
- **Homepage**: "Welcome to Bookie" landing with book grid, ratings, and floating "Add Book" button
- **Book Details**: Comprehensive book information with user reviews and average ratings
- **Add New Book**: Modal form with validation, file upload, and dynamic genre selection
- **Favorites**: Personal collection of saved books with localStorage persistence
- **Reviews**: Interactive star rating system with user comments and live updates
- **Responsive Design**: Mobile-optimized interface with hamburger navigation

## Project Structure

```
bookie/
├── public/
│   ├── logo.png            # App logo
│   └── front-page.png      # Landing page image
├── app/
│   ├── about/
│   │   └── page.tsx        # About page
│   ├── addbook/
│   │   ├── hooks/
│   │   │   ├── useBookForm.ts  # Book form state management
│   │   │   └── useGenres.ts    # Genre fetching hook
│   │   ├── utils/
│   │   │   └── formHelpers.ts  # Form utilities
│   │   └── page.tsx        # Add new book page
│   ├── api/                # REST API Routes
│   │   ├── books/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts    # GET /api/books/:id
│   │   │   └── route.ts        # GET, POST /api/books
│   │   ├── comments/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts    # PUT, DELETE /api/comments/:id
│   │   │   └── route.ts        # GET, POST /api/comments
│   │   └── genres/
│   │       └── route.ts    # GET /api/genres
│   ├── book/
│   │   └── [id]/
│   │       └── page.tsx    # Dynamic book detail pages
│   ├── contact/
│   │   └── page.tsx        # Contact form page
│   ├── favorites/
│   │   ├── FavoritesList.tsx # Favorites list component
│   │   └── page.tsx        # User favorites page
│   ├── login/
│   │   └── page.tsx        # Login page
│   ├── types/              # TypeScript type definitions
│   │   ├── book.ts         # Book types
│   │   ├── bookData.ts     # Book data types
│   │   ├── editValues.ts   # Edit form types
│   │   └── review.ts       # Review types
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Homepage with book grid
│   └── supabaseClient.ts   # Database configuration
├── components/             # Reusable UI components
│   ├── AverageBookRating/
│   │   └── AverageBookRating.tsx
│   ├── BookActionButtons/
│   │   └── BookActionButtons.tsx
│   ├── BookActions/
│   │   ├── BookActions.tsx
│   │   ├── hooks/
│   │   │   └── useBookManagement.ts
│   │   └── utils/
│   │       └── bookApi.ts
│   ├── BookCard/
│   │   └── BookCard.tsx    # Individual book display
│   ├── BookCardGrid/
│   │   └── BookCardGrid.tsx
│   ├── BookDetails/
│   │   └── BookDetails.tsx
│   ├── BookEditForm/
│   │   └── BookEditForm.tsx
│   ├── BookReview/
│   │   ├── BookReview.tsx  # Main review container
│   │   ├── hooks/
│   │   │   ├── useReviewFilter.ts    # URL-based review filtering
│   │   │   └── useReviewManagement.ts # Review CRUD operations
│   │   └── utils/
│   │       ├── reviewApi.ts    # Review API calls
│   │       └── validateForm.ts # Form validation
│   ├── BookTag/
│   │   └── BookTag.tsx     # Genre and info tags
│   ├── Dropdown/
│   │   ├── Dropdown.tsx
│   │   └── hooks/
│   │       └── useDropdown.ts
│   ├── FallbackImage/
│   │   └── FallbackImage.tsx
│   ├── FavoriteButton/
│   │   ├── FavoriteButton.tsx
│   │   └── hooks/
│   │       └── useFavorites.ts
│   ├── FileUpload/
│   │   └── FileUpload.tsx  # File upload component
│   ├── FloatingButton/
│   │   └── FloatingButton.tsx
│   ├── Footer/
│   │   └── Footer.tsx
│   ├── FormField/
│   │   └── FormField.tsx   # Reusable form input
│   ├── IsbnField/
│   │   └── IsbnField.tsx   # ISBN input with info tooltip
│   ├── Logo/
│   │   └── Logo.tsx
│   ├── Navigation/
│   │   └── Navigation.tsx  # Responsive navigation
│   ├── ReturnButton/
│   │   └── ReturnButton.tsx
│   ├── ReviewCard/
│   │   └── ReviewCard.tsx  # Individual review display
│   ├── ReviewFilters/
│   │   └── ReviewFilters.tsx # Star rating filter buttons
│   ├── ReviewForm/
│   │   └── ReviewForm.tsx  # Review submission form
│   ├── ReviewList/
│   │   └── ReviewList.tsx  # Filtered review display
│   ├── SelectGenre/
│   │   └── SelectGenre.tsx # Genre dropdown
│   ├── StarRating/
│   │   └── StarRating.tsx  # Interactive star rating
│   └── SubmitButton/
│       └── SubmitButton.tsx
├── .env.local              # Environment variables (not in repo)
├── .gitignore
├── package.json
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
└── README.md
```

## Styling

The app uses Tailwind CSS for styling with a custom light color scheme:
- **Background**: Light green (#E8F5E8) with cream cards (#FFFDF6)
- **Text**: Dark blue (#173046) for good contrast and readability
- **Responsive**: Mobile-first approach with responsive breakpoints
- **Components**: Custom styled buttons, tags, and interactive elements

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting without making changes

## Recently Implemented

- [x] 🔒 **REST API Architecture**: Complete migration to secure API endpoints
- [x] 🛡️ **Security Improvements**: Server-side data operations with no client-side Supabase exposure
- [x] 📡 **API Routes**: Custom REST endpoints for books, comments, and genres
- [x] ⭐ **Book Reviews & Ratings**: Complete star rating system with user comments
- [x] 🔍 **Review Filtering**: URL-based review filtering by star rating with shareable links
- [x] 🏗️ **Component Architecture Refactor**: Eliminated prop drilling with self-contained review components
- [x] ➕ **Add New Books**: Full-featured form with validation and database integration  
- [x] 📊 **Average Rating Calculations**: Real-time rating averages with live updates
- [x] ❤️ **Favorites System**: LocalStorage-based favorites with persistence
- [x] 🎯 **Dynamic Genre Selection**: API-driven genre filtering
- [x] 🔄 **Real-time Data Updates**: Automatic refresh when content is added
- [x] 📱 **Mobile-First Design**: Responsive interface with touch-friendly controls
- [x] ✅ **Form Validation**: Comprehensive client-side and server-side validation
- [x] 🎨 **Custom UI Components**: Reusable form and display components with custom hooks
- [x] 💾 **Database Integration**: Full CRUD operations via secure API layer
- [x] 💡 **Improved UX**: ISBN info tooltip repositioned above icon for better visibility
- [x] 📧 **Contact Page**: Full contact form with validation and success messages
- [x] 🔐 **Login Page**: Login interface with authentication UI ready for backend integration

## Future Features

- [ ] Advanced book search and filtering
- [ ] **Authentication Backend**: Full user authentication system for Login page
- [ ] Reading progress tracking with percentage completion
- [ ] Social sharing features for favorite books
- [ ] AI-powered book recommendations based on preferences
- [ ] **Dark/light mode toggle** (currently only light theme available)
- [ ] Reading reminders and notifications
- [ ] Personal reading statistics and analytics
- [ ] User profiles and social features
- [ ] Reading challenges and goals
- [ ] Customizable book covers and themes
- [ ] Discussion forums for each book
- [ ] Reading notes and highlights

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## License

This project is open source and available under the [MIT License](LICENSE).

## Database Setup

This app uses **Supabase** as the backend. You'll need to create:

### Required Tables:

**1. `books` table:**
- `id` (bigint, primary key, auto-increment)
- `title` (text)
- `author` (text) 
- `genre` (text)
- `isbn` (text)
- `description` (text)
- `coverImageUrl` (text)
- `publishedYear` (bigint)
- `language` (text)
- `format` (text)
- `pages` (bigint)
- `publisher` (text)
- `rating` (double precision, nullable)
- `status` (text)
- `tags` (text)
- `dateAdded` (text)

**2. `comments` table:**
- `id` (bigint, primary key, auto-increment)
- `book_id` (bigint, foreign key to books.id)
- `reviewer` (text)
- `rating` (bigint)
- `comment` (text)
- `created_at` (timestamp, default: now())