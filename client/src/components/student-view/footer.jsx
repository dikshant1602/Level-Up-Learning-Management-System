import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul>
              <li>
                <a href="/about" className="hover:text-blue-400">About Us</a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul>
              <li>Email: <a href="mailto:dikshantchoudhary12345@gmail.com" className="hover:text-blue-400">support@example.com</a></li>
              <li>Phone: <a href="tel:+91-9461921220" className="hover:text-blue-400">+91-9461921220</a></li>
              <li>Address: Udaipur, India</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="/faq" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="/careers" className="hover:text-blue-400">Careers</a></li>
              <li><a href="/blog" className="hover:text-blue-400">Blog</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center">
  <h3 className="text-xl font-semibold mb-4 text-center">Follow Us</h3>
  <div className="flex items-center space-x-4">
    <a
      href="https://facebook.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-600"
    >
      <FaFacebookF size={24} />
    </a>
    <a
      href="https://instagram.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-pink-600"
    >
      <FaInstagram size={24} />
    </a>
    <a
      href="https://twitter.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-400"
    >
      <FaTwitter size={24} />
    </a>
    <a
      href="https://www.linkedin.com/in/dikshant-choudhary-67726a22a"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-blue-600"
    >
      <FaLinkedin size={24} />
    </a>
  </div>
</div>


        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Level Up. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
