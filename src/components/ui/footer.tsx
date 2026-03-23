const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-black via-[#021118] to-black  border-t border-gray-800 text-gray-400 py-12 font-sans w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xl font-bold text-white font-playfair">
              <span className="text-[#00d4ff]">📈 FINSIGHT</span>AI
            </div>
            <p className="text-sm leading-relaxed max-w-xs font-playfair">
              Understand your money. Control your future. Your intelligent companion for tracking expenses and achieving financial goals.
            </p>
          </div>
          <div className="font-lato">
            <h3 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Home</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">User Profile</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Transactions</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Dashboard</a></li>
            </ul>
          </div>
          <div className="font-lato">
            <h3 className="text-white font-semibold mb-4 tracking-wider text-sm uppercase">Support & Legal</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Help Center</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">Twitter</a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">LinkedIn</a>
            <a href="#" className="hover:text-[#00d4ff] transition-colors duration-200">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;