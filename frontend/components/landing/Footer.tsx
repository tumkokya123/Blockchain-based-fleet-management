export default function Footer() {
  return (
    <footer id="contact" className="bg-[#1b2228] mt-32">

      {/* Main Footer Content */}
      <div className="max-w-[1280px] mx-auto px-8 py-20 grid md:grid-cols-4 gap-16">

        {/* Brand Column */}
        <div className="space-y-6">
          <h3 className="text-[20px] font-semibold tracking-tight">
            FleetChain
          </h3>

          <p className="text-gray-400 text-[15px] leading-[1.7] max-w-xs">
            Enterprise fleet management platform powered by blockchain
            transparency, IoT intelligence, and automated smart contracts.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-[13px] uppercase tracking-[0.2em] text-gray-500 mb-6">
            Product
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Features</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Integrations</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Updates</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-[13px] uppercase tracking-[0.2em] text-gray-500 mb-6">
            Company
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li className="hover:text-[#00ADB5] transition cursor-pointer">About Us</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Careers</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Legal</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[13px] uppercase tracking-[0.2em] text-gray-500 mb-6">
            Contact
          </h4>

          <ul className="space-y-4 text-[15px] text-gray-300">
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Support</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Sales</li>
            <li className="hover:text-[#00ADB5] transition cursor-pointer">Partners</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#393E46]" />

      {/* Bottom Row */}
      <div className="max-w-[1280px] mx-auto px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-[13px]">

        <p>
          © 2024 FleetChain Technology. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <span className="hover:text-[#00ADB5] transition cursor-pointer">🌐</span>
          <span className="hover:text-[#00ADB5] transition cursor-pointer">🔗</span>
          <span className="hover:text-[#00ADB5] transition cursor-pointer">📄</span>
        </div>
      </div>

    </footer>
  );
}