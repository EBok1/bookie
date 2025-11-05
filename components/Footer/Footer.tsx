import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-[#fffdf6] rounded-md shadow-md mx-5 my-8 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* About Section */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-3">
              About Bookie
            </h3>
            <p className="text-sm text-gray-600">
              Your personal reading companion featuring trending BookTok fantasy
              and romance novels. Track, review, and discover your next favorite
              book!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-500">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-500"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/favorites"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-3">
              Built With
            </h3>
            <p className="text-sm text-gray-600">
              Next.js 15 • React 19 • Supabase • Tailwind CSS
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Inspired by the BookTok community 📚
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-300 pt-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Bookie. Made with ❤️ for book lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};
