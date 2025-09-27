import { Github, Instagram, Twitter, Mail } from "lucide-react";
import peachIcon from "@/assets/peach-icon.png";

const Footer = () => {
  return (
    <footer className="relative bg-neutral-950 border-t border-white/10 pt-16 pb-10 overflow-hidden">
      {/* Peach sunrise gradient strip */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200"
      />

      {/* Glow aura behind logo */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full blur-3xl opacity-20 bg-[radial-gradient(circle,rgba(255,176,103,0.4),transparent_70%)]"
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-14">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={peachIcon}
                alt="Peach"
                className="w-10 h-10 mr-3"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-200 via-amber-100 to-white bg-clip-text text-transparent">
                PeachState Hacks
              </h3>
            </div>
            <p className="text-white/70 mb-5 max-w-md">
              Georgia's sweetest high school hackathon. Building the future, 
              one line of code at a time.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Twitter, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Github, href: "#" },
                { Icon: Mail, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition relative group"
                >
                  <Icon className="w-5 h-5 text-white/70 group-hover:text-orange-300 transition-colors" />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-orange-300/40 transition"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "How It Works", "Timeline"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/60 hover:text-orange-300 transition inline-block hover:-translate-y-0.5"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-white/60">
              <li>peachstateinnovate@gmail.com</li>
              <li>Cumming, Georgia</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2025 PeachState Hacks • Made with 🍑 in Georgia
          </p>
          <p className="text-white/40 text-xs">
            A <a href="https://hackclub.com/" className="text-orange-300 hover:text-orange-200 transition-colors" target="_blank" rel="noopener noreferrer">Hack Club</a> hackathon • <a href="https://dashboard.hackclub.com/" className="text-orange-300 hover:text-orange-200 transition-colors" target="_blank" rel="noopener noreferrer">Dashboard</a>
          </p>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Code of Conduct", "Terms of Service"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/60 hover:text-orange-300 transition hover:-translate-y-0.5"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
