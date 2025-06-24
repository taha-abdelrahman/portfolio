import { useState, useEffect } from "react";
import { Moon, Sun, Download, Mail, Linkedin, Github, Instagram, Phone, Copy, Check, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [copiedItems, setCopiedItems] = useState({});
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cardStyles = "p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 bg-white dark:bg-zinc-900 text-black dark:text-white animate-fade-in";
  const contactItem = "flex items-center gap-2 text-sm group";
  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedItems((prev) => ({ ...prev, [text]: true }));
    setTimeout(() => {
      setCopiedItems((prev) => ({ ...prev, [text]: false }));
    }, 2000);
  };

  const getCopyIcon = (text) => copiedItems[text] ? <Check size={14} className="text-green-500" /> : <Copy size={14} />;


  return (
    <div
      className={
        darkMode
          ? "dark min-h-screen text-white bg-gradient-to-b from-black via-zinc-900 to-zinc-800"
          : "min-h-screen text-black bg-gradient-to-b from-white via-gray-100 to-gray-200"
      }
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-12"
        >
          <div className="flex items-center gap-3">
            <img src="/avatar.jpg" alt="Taha Abdelrahman" className="w-10 h-10 rounded-full border shadow-lg" />
            <h1 className="text-3xl font-bold">Taha Abdelrahman</h1>
          </div>
          <div className="flex gap-2 flex-wrap items-center justify-end">
            {[
              { href: "#about", label: "About" },
              { href: "#skills", label: "Skills" },
              { href: "#projects", label: "Projects" },
              { href: "#contact", label: "Contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm px-3 py-1 border rounded-full hover:bg-gray-600 hover:text-white transition-transform hover:scale-105"
              >
                {link.label}
              </a>
            ))}
            <button
              className="p-2 rounded-full border hover:scale-110 hover:bg-gray-600 transition-transform duration-200"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
        </motion.header>

        {/* Scroll to top */}
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
          >
            <ArrowUp size={20} />
          </button>
        )}

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Hi, I'm Taha</h2>
          <p className="text-lg mb-2">
            Back-End Developer & Visual Designer specialized in Node.js, MongoDB, and RESTful APIs.
          </p>
          <div className="flex gap-4 mt-4">
            <a
              href="#projects"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:scale-105 transition-transform duration-200"
            >
              View My Work
            </a>
            <a
              href="/Taha_Abdelrahman_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white hover:scale-105 transition-transform duration-200"
            >
              <Download size={16} /> Download CV
            </a>
          </div>
        </motion.section>

        {/* About Section */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={cardStyles}>
            <h3 className="text-2xl font-bold mb-4">About Me</h3>
            <p>
              I'm a high school student and a freelance Back-End Developer with experience in building and optimizing
              scalable systems using Node.js, Express.js, MongoDB, and Firebase. I'm also skilled in Git, Docker,
              and visual content creation using Canva.
            </p>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={cardStyles}>
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {["Node.js", "Express.js", "MongoDB", "Firebase", "Git", "Docker", "REST APIs", "Canva", "DB Design"].map(skill => (
                <motion.span
                  key={skill}
                  className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm hover:scale-105 transition-transform duration-200"
                  whileHover={{ scale: 1.1 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={cardStyles}>
            <h3 className="text-2xl font-bold mb-4">Projects</h3>
            <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-lg hover:scale-105 transition-transform duration-200">
              <h4 className="text-xl font-semibold mb-2">Ticket Booking Website</h4>
              <p className="mb-2">A modern ticket booking system built using Next.js, MongoDB, and TailwindCSS. Includes authentication and dynamic ticket listings.</p>
              <a
                href="https://ticketron.vercel.app/"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website ↗
              </a>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className={cardStyles}>
            <h3 className="text-2xl font-bold mb-4">Contact</h3>
            <p>You can reach me via:</p>
            <ul className="mt-4 space-y-2">
              <li className={contactItem}>
                <Mail size={16} /> taha.abdelra7man@gmail.com
                <button onClick={() => copyText("taha.abdelra7man@gmail.com")}
                  className="ml-auto opacity-60 group-hover:opacity-100">
                  {getCopyIcon("taha.abdelra7man@gmail.com")}
                </button>
              </li>
              <li className={contactItem}>
                <Phone size={16} /> +20 101 000 4881
                <button onClick={() => copyText("+20 101 000 4881")} className="ml-auto opacity-60 group-hover:opacity-100">
                  {getCopyIcon("+20 101 000 4881")}
                </button>
              </li>
              <li className={contactItem}>
                <Linkedin size={16} /><a href="https://www.linkedin.com/in/taha-abdelra7man/" className="text-blue-500 hover:underline" target="_blank">linkedin.com/in/taha-abdelra7man</a>
              </li>
              <li className={contactItem}>
                <Github size={16} /><a href="https://github.com/taha-abdelrahman" className="text-blue-500 hover:underline" target="_blank">github.com/taha-abdelrahman</a>
              </li>
              <li className={contactItem}>
                <Instagram size={16} /><a href="https://www.instagram.com/x.tvhv/" className="text-blue-500 hover:underline" target="_blank">@x.tvhv</a>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-gray-400 dark:text-gray-500">
          © {new Date().getFullYear()} Taha Abdelrahman. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
