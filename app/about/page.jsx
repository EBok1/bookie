import Navigation from "../../components/Navigation/Navigation";

const AboutPage = () => {
  return (
    <>
      <Navigation />
      <div>
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-[2.5rem] font-bold font-playfair mb-4 mx-4">
              About Bookie
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your personal reading companion for discovering, tracking, and
              sharing your literary journey
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-playfair">
              What is Bookie? 📚
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Bookie is a beautiful and intuitive book management platform
              designed for book lovers who want to organize their reading life.
              Whether you&rsquo;re a casual reader or a bibliophile with hundreds of
              books, Bookie helps you keep track of your literary adventures and
              discover your next great read.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We believe that every book has a story, and every reader has a
              unique journey. Bookie is here to celebrate that journey by
              providing you with the tools to catalog, rate, review, and share
              your reading experiences with a community of fellow book
              enthusiasts.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⭐</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Rate & Review
                </h3>
              </div>
              <p className="text-gray-600">
                Share your thoughts and rate books with our 5-star system. Leave
                detailed reviews to help other readers discover their next
                favorite book.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">❤️</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Build Your Favorites
                </h3>
              </div>
              <p className="text-gray-600">
                Create your personal library of favorite books that you can
                easily access and share with friends and family.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🔍</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Discover Books
                </h3>
              </div>
              <p className="text-gray-600">
                Explore our curated collection of books across various genres.
                From fantasy romance to contemporary fiction, find your perfect
                match.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">📖</span>
                <h3 className="text-xl font-semibold text-gray-800">
                  Track Reading Progress
                </h3>
              </div>
              <p className="text-gray-600">
                Keep track of what you&rsquo;ve read, what you&rsquo;re
                currently reading, and what&rsquo;s on your to-be-read list.
              </p>
            </div>
          </div>

          {/* Quote Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-8 text-center">
            <blockquote className="text-2xl italic text-gray-700 mb-4 font-playfair">
              &ldquo;A room without books is like a body without a soul&rdquo;
            </blockquote>
            <cite className="text-gray-600 text-lg">
              — Marcus Tullius Cicero
            </cite>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
