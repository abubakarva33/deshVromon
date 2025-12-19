"use client";

import { useState } from "react";

const Support = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFAQToggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add items to your cart, and proceed to checkout. You can pay using various methods including credit card, PayPal, or bank transfer.",
    },
    {
      question: "What is the return policy?",
      answer:
        "We offer a 30-day return policy for most items. Please check the product page for specific return conditions. Contact our support team to initiate a return.",
    },
    {
      question: "How can I become a seller?",
      answer:
        "To become a seller, visit our Become a Seller page and fill out the application form. Our team will review your application and get back to you within 3-5 business days.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you will receive a tracking number via email. You can use this number on the carrier's website to track your package.",
    },
    {
      question: "What if I receive a damaged product?",
      answer:
        "If you receive a damaged product, please contact our support team immediately with photos of the damage. We will arrange for a replacement or refund.",
    },
  ];

  const helpCategories = [
    {
      title: "For Buyers",
      description: "Help with shopping, orders, payments, and returns",
      icon: "🛒",
    },
    {
      title: "For Sellers",
      description: "Guidance on selling, managing your store, and analytics",
      icon: "🏪",
    },
    {
      title: "For Vendors",
      description: "Support for vendor partnerships and bulk orders",
      icon: "🚚",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Support Center</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We&apos;re here to help you with any questions or issues you may have. Our support team is available 24/7 to assist you.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-lg text-gray-600">Choose the best way to reach us</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">support@campusianshop.com</p>
            <p className="text-sm text-gray-600">Response within 24 hours</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">+8801580743409</p>
            <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Available 24/7</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
              Start Chat
            </button>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600">Find help based on your role</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpCategories.map((category, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <button className="text-indigo-600 hover:text-indigo-800 font-medium">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Quick answers to common questions</p>
        </div>
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full text-left bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 focus:outline-none"
                onClick={() => handleFAQToggle(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                  <span className="text-2xl text-gray-800">{openFAQ === index ? "−" : "+"}</span>
                </div>
                {openFAQ === index && <p className="mt-4 text-gray-600">{faq.answer}</p>}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-lg text-gray-600">Send us a message and we&apos;ll get back to you</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium text-gray-800 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-800 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300 font-medium"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
