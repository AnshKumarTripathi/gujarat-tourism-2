import React from 'react'
import { Link } from 'react-router-dom'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/places', label: 'Tourist Places' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ]

  const resources = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/faq', label: 'FAQ' },
    { to: '/blog', label: 'Travel Blog' },
  ]

  const socialIcons = [
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ]

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-400">Gujarat Tourism</h3>
            <p className="text-gray-400 mb-4">
              Experience the vibrant culture, rich heritage, and breathtaking landscapes of Gujarat - 
              India's Jewel of the West.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-primary-400 mt-1" />
                <span className="text-gray-400">
                  Block No. 11, 3rd Floor, <br />
                  Udyog Bhavan, Gandhinagar, <br />
                  Gujarat, India - 382010
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone className="text-primary-400" />
                <span className="text-gray-400">+91 79 2325 7676</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail className="text-primary-400" />
                <span className="text-gray-400">info@gujarattourism.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm">
              Get the latest updates about tourist places, events, and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-primary-500 text-white"
              />
              <button type="submit" className="btn-primary py-2 px-6">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} Gujarat Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer