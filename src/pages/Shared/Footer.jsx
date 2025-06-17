import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleContactModal = () => {
    const modal = document.getElementById('contact_modal');
    if (modal) {
      modal.showModal();
    }
  };

  const handleCloseModal = () => {
    const modal = document.getElementById('contact_modal');
    if (modal) {
      modal.close();
    }
  };

  return (
    <footer className="bg-base-200 text-base-content">
      <div className="container mx-auto px-6 py-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `link link-hover transition-colors ${isActive ? 'text-primary' : ''}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/LostFound" 
                className={({ isActive }) => 
                  `link link-hover transition-colors ${isActive ? 'text-primary' : ''}`
                }
              >
                Lost & Found
              </NavLink>
              <NavLink 
                to="/AddItems" 
                className={({ isActive }) => 
                  `link link-hover transition-colors ${isActive ? 'text-primary' : ''}`
                }
              >
                Add Items
              </NavLink>
              <NavLink 
                to="/MyItems" 
                className={({ isActive }) => 
                  `link link-hover transition-colors ${isActive ? 'text-primary' : ''}`
                }
              >
                My Items
              </NavLink>
              <NavLink 
                to="/RecoveredItems" 
                className={({ isActive }) => 
                  `link link-hover transition-colors ${isActive ? 'text-primary' : ''}`
                }
              >
                Recovered Items
              </NavLink>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a 
                  href="mailto:demowhereisit@gmail.com" 
                  className="link link-primary hover:link-hover"
                >
                  demowhereisit@gmail.com
                </a>
              </p>
              <p>
                <span className="font-medium">Phone:</span>{' '}
                <a 
                  href="tel:+12345678901" 
                  className="link link-primary hover:link-hover"
                >
                  +1-234-567-8901
                </a>
              </p>
              <button 
                className="btn btn-sm btn-outline mt-3" 
                onClick={handleContactModal}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Social Media & About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm p-2 hover:text-primary transition-colors"
                aria-label="Follow us on Twitter"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm p-2 hover:text-primary transition-colors"
                aria-label="Subscribe to our YouTube channel"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm p-2 hover:text-primary transition-colors"
                aria-label="Like us on Facebook"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-5 h-5 fill-current" 
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
            <p className="text-sm opacity-80">
              Helping reunite people with their belongings since {currentYear - 1}.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider my-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm opacity-80">
          <p>© {currentYear} Where Is It? - All rights reserved</p>
          <div className="flex gap-4">
            <a href="/privacy" className="link link-hover">Privacy Policy</a>
            <a href="/terms" className="link link-hover">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <dialog id="contact_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Contact Information</h4>
              <div className="space-y-2">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  <a 
                    href="mailto:demowhereisit@gmail.com" 
                    className="link link-primary"
                  >
                    demowhereisit@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  <a 
                    href="tel:+12345678901" 
                    className="link link-primary"
                  >
                    +1-234-567-8901
                  </a>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Support Hours</h4>
              <p className="text-sm opacity-80">
                Monday - Friday: 9:00 AM - 6:00 PM<br/>
                Saturday - Sunday: 10:00 AM - 4:00 PM
              </p>
            </div>

            <p className="text-sm opacity-80">
              We're here to help you find your lost items and assist with any questions. 
              Thank you for using our service!
            </p>
          </div>
          
          <div className="modal-action">
            <button 
              className="btn btn-primary" 
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
        {/* Modal backdrop - clicking outside closes modal */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </footer>
  );
};

export default Footer;