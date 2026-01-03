const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 py-10">
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid grid-cols-1 items-center gap-2 text-center sm:grid-cols-3">
          <p className="text-white/90 font-semibold tracking-wide sm:text-left">
            PeachState Hacks
          </p>
          <p className="text-white/55 text-sm sm:text-center">© {year} PeachState Hacks</p>
          <p className="text-white/65 text-sm sm:text-right">Made by Aasrith R</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
