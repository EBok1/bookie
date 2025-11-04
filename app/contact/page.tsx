"use client";
import { useState, ChangeEvent, FormEvent } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    // Clear success message after 5 seconds
    setTimeout(() => setSubmitStatus(""), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-[2.5rem] font-bold font-playfair mb-4 mx-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a question or feedback? We&apos;d love to hear from you!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
            Send us a message
          </h2>

          {submitStatus && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {submitStatus}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-gray-700 font-medium mb-2"
              >
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="What's this about?"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#bccdbc] hover:bg-[#a8b9a8] text-black font-semibold py-3 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-playfair">
              Get in Touch
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">support@bookie.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    Response Time
                  </h3>
                  <p className="text-gray-600">
                    We typically respond within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-2xl mr-4">📚</span>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    BookTok Community
                  </h3>
                  <p className="text-gray-600">
                    Join us in celebrating great books!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 font-playfair">
              Quick Questions?
            </h3>
            <p className="text-gray-700 mb-3">
              Before reaching out, check if your question is answered in our FAQ
              section or About page.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• How to add a new book?</li>
              <li>• How to leave a review?</li>
              <li>• How to manage favorites?</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

