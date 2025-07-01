import { useState, useEffect } from "react";
import { Moon, Sun, Download, Mail, Linkedin, Github, Instagram, Phone, Copy, Check, Menu, X, Inbox, Send, ArrowDown, ArrowUp, FileJson, Loader } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';

export default function Home() {
    const [darkMode, setDarkMode] = useState(true);
    const [copiedItems, setCopiedItems] = useState({});
    const [showTop, setShowTop] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showContactForm, setShowContactForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.documentElement.style.scrollBehavior = "smooth";
        const onScroll = () => setShowTop(window.scrollY > 300);
        window.addEventListener("scroll", onScroll);

        if (showContactForm) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            document.body.style.overflow = 'auto';
        };
    }, [showContactForm]);


    const cardStyles = "p-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 animate-fade-in backdrop-blur-md";
    const contactItem = (darkMode) => `flex items-center gap-2 text-sm group shadow-md  rounded-md px-4 py-2 transition duration-200 ${darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"}`;
    const textWithShadow = "font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.25)]";

    const skillsWithLinks = [
        { name: "Node.js", url: "https://nodejs.org/", tooltip: "JavaScript runtime built on Chrome's V8" },
        { name: "Express.js", url: "https://expressjs.com/", tooltip: "Minimal Node.js web application framework" },
        { name: "Next.js", url: "https://nextjs.org/", tooltip: "React framework for server-side rendering" },
        { name: "React.js", url: "https://reactjs.org/", tooltip: "UI library for building interfaces" },
        { name: "TailwindCSS", url: "https://tailwindcss.com/", tooltip: "Utility-first CSS framework" },
        { name: "MongoDB", url: "https://www.mongodb.com/", tooltip: "NoSQL document database" },
        { name: "Firebase", url: "https://firebase.google.com/", tooltip: "Google's app development platform" },
        { name: "Git", url: "https://git-scm.com/", tooltip: "Version control system" },
        { name: "Docker", url: "https://www.docker.com/", tooltip: "Container platform for apps" },
        { name: "REST APIs", url: "https://restfulapi.net/", tooltip: "Design standard for APIs" },
        { name: "Canva", url: "https://www.canva.com/", tooltip: "Graphic design platform" },
        { name: "DB Design", url: "https://www.lucidchart.com/pages/er-diagrams", tooltip: "Database structure modeling" },
    ];



    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedItems((prev) => ({ ...prev, [text]: true }));
        setTimeout(() => {
            setCopiedItems((prev) => ({ ...prev, [text]: false }));
        }, 2000);
    };

    const handleSend = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
            setToastMessage("All fields are required ❗");
            setTimeout(() => setToastMessage(null), 3000);
            return;
        }

        setIsLoading(true);
        setToastMessage("Sending... ⏳");

        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            setToastMessage("Message sent successfully ✅");
            setFormData({ name: '', email: '', message: '' });
            setShowContactForm(false);
        } catch {
            setToastMessage("Failed to send message ❌");
        } finally {
            setIsLoading(false);
        }

        setTimeout(() => setToastMessage(null), 4000);
    };

    const getCopyIcon = (text) => copiedItems[text] ? <Check size={14} className="text-green-500" /> : <Copy size={14} />;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className={
                darkMode
                    ? "dark min-h-screen text-white bg-gradient-to-br from-black via-zinc-900 to-zinc-800 bg-[url('/noise.svg')] bg-fixed"
                    : "dark min-h-screen text-white bg-gradient-to-br from-zinc-500 via-zinc-300 to-zinc-400 bg-[url('/noise.svg')] bg-fixed"
            }
        >
            <div className="max-w-4xl mx-auto px-4 py-8 relative">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-12 shadow-xl rounded-xl p-4 ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`}
                >
                    <div className="flex flex-wrap justify-between items-center gap-4">
                        {/* Name & Avatar */}
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                            <img
                                src="/avatar.jpg"
                                alt="Taha Abdelrahman"
                                className="w-12 h-12 rounded-full shadow-md shrink-0"
                            />
                            <h1 className={`text-xl sm:text-2xl md:text-3xl ${textWithShadow} truncate`}>
                                Taha Abdelrahman
                            </h1>
                        </div>

                        {/* Mobile Menu Buttton */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className={`p-2 rounded-full border shadow-md transition-all duration-200 hover:rotate-180 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"}`} >
                                {menuOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                        <div className="hidden md:flex gap-2 flex-wrap items-center justify-end">
                            {["about", "skills", "projects", "contact"].map((id) => (
                                <a
                                    key={id}
                                    href={`#${id}`}
                                    className={`text-sm px-3 py-1 border rounded-full hover:text-white transition-transform hover:scale-105 shadow-md ${darkMode ? "bg-zinc-900 text-white hover:bg-zinc-800" : "bg-zinc-200 text-black hover:bg-zinc-500"}`} >
                                    {id.charAt(0).toUpperCase() + id.slice(1)}
                                </a>
                            ))}
                            <button
                                className={`p-2 rounded-full border shadow-md transition-all duration-200 hover:rotate-180 ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"}`}
                                onClick={() => setDarkMode(!darkMode)}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                key="menu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="md:hidden mt-4 flex flex-col gap-2 overflow-hidden"
                            >
                                {["about", "skills", "projects", "contact"].map((id) => (
                                    <a
                                        key={id}
                                        href={`#${id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setMenuOpen(false);

                                            setTimeout(() => {
                                                window.location.hash = id;
                                                setTimeout(() => {
                                                    history.replaceState(null, "", window.location.pathname + window.location.search);
                                                }, 400);
                                            }, 200);
                                        }}
                                        className={`text-sm px-3 py-2  border shadow-md rounded-full text-center hover:bg-gray-600 hover:text-white transition ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-200 text-black"}`}>
                                        {id.charAt(0).toUpperCase() + id.slice(1)}
                                    </a>
                                ))}
                                <button
                                    className={`p-2 rounded-full  border shadow-md hover:scale-110 hover:bg-gray-600 transition-transform duration-200 self-center ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-200 text-black"}`}
                                    onClick={() => setDarkMode(!darkMode)}
                                    aria-label="Toggle dark mode"
                                >
                                    {darkMode ? <Sun /> : <Moon />}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </motion.header>

                <AnimatePresence>
                    {showTop && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-xl hover:bg-blue-700"
                            style={{ zIndex: 9999 }}
                        >
                            <ArrowUp />
                        </motion.button>
                    )}
                </AnimatePresence>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className={`mb-16 shadow-xl rounded-xl p-6 ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`}
                >
                    <h2 className={`text-4xl font-bold mb-4 ${textWithShadow}`}>
                        Hi, I'm Taha <br />
                        <span className={`text-blue-500 shadow-md inline-block ${textWithShadow}`}>
                            <Typewriter words={["Back-End Dev", "API Builder", "Database Designer"]} loop cursor />
                        </span>
                    </h2>
                    <p className={`text-lg mb-2 ${textWithShadow}`}>
                        Back-End Developer & Visual Designer specialized in Node.js, MongoDB, and RESTful APIs.
                    </p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4">
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            href="#projects"
                            className="flex items-center justify-center gap-2 px-5 py-2 min-w-[150px] text-center border border-zinc-500 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md"
                        >
                            <FileJson size={16} />
                            View My Work
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05, y: -2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            href="/Taha_Abdelrahman_CV.pdf"
                            download
                            className={`flex items-center justify-center gap-2 px-5 py-2 min-w-[150px] text-center border border-zinc-600 rounded-full hover:text-white shadow-md ${darkMode ? "text-zinc-300 hover:bg-zinc-800" : "bg-zinc-200 text-black hover:bg-zinc-500"}`}
                        >
                            <Download size={16} /> Download CV
                        </motion.a>
                    </div>

                </motion.section>

                {/* About Section */}
                <motion.section
                    id="about"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16">
                    <div className={`${cardStyles} ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`} >
                        <motion.h3
                            className={`text-2xl mb-6 ${textWithShadow}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }} >
                            About Me
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className={`leading-relaxed text-base ${darkMode ? "text-white" : "text-black"}`} >
                            My name is{" "}
                            <span className="text-blue-500 font-semibold">Taha Abdelrahman</span>, a
                            dedicated and detail-oriented high school senior specializing in back-end
                            web development. I have hands-on experience designing and implementing
                            RESTful APIs, managing NoSQL databases, and building scalable
                            infrastructure using <strong>Node.js</strong>,{" "}
                            <strong>Express.js</strong>, and <strong>MongoDB</strong>. Additionally, I
                            am proficient in tools like <strong>Firebase</strong>,{" "}
                            <strong>Docker</strong>, and version control systems like{" "}
                            <strong>Git</strong>. My skill set also extends to visual content design
                            using <strong>Canva</strong> for creating promotional materials and UI
                            assets.
                        </motion.p>
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
                    <div className={`${cardStyles} ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`}>
                        <h3 className={`text-2xl mb-4 ${textWithShadow}`}>Technical Skills</h3>
                        <p className="mb-4">Here are the main technologies and tools I work with:</p>
                        <div className="flex flex-wrap gap-3">
                            {skillsWithLinks.map(({ name, url, tooltip }, index) => (
                                <motion.a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="relative group px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow cursor-pointer"
                                >
                                    {name}
                                    {/* Tooltip */}
                                    <span className="absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap bg-zinc-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                                        {tooltip}
                                    </span>
                                </motion.a>
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
                    <div className={`${cardStyles} ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`}>
                        <h3 className={`text-2xl mb-4 ${textWithShadow}`}>Selected Projects</h3>
                        <div className="grid gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={`p-5 rounded-xl shadow transition-all duration-300 hover:scale-[1.02] ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"
                                    }`}
                            >
                                <h4 className="text-xl font-semibold mb-1">🎟 Ticket Booking Platform</h4>
                                <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    A web-based ticket booking platform developed using <strong>Next.js</strong>, <strong>MongoDB</strong>, and <strong>TailwindCSS</strong>. The system supports user authentication, dynamic event listings, and secure API architecture.
                                </p>
                                <div className="flex items-center gap-4">
                                    <a
                                        href="https://ticketron.vercel.app/"
                                        className="text-blue-500 hover:underline font-medium"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        🔗 Live Preview
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 0.5, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={`p-5 rounded-xl shadow transition-all duration-300 pointer-events-none ${darkMode ? "bg-zinc-800 text-white" : "bg-zinc-100 text-black"}`}
                            >
                                <h4 className="text-xl font-semibold mb-1 flex items-center gap-2">
                                    🛠 Orken Team Platform
                                    <span
                                        className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium bg-yellow-500/20 ${darkMode ? "text-gray-400" : "text-gray-600"}`} >
                                        <Loader size={14} /> In Progress
                                    </span>

                                </h4>
                                <p className={`text-sm mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    A collaborative workspace management system currently under active development. The platform will allow teams to manage projects, roles, and workflows seamlessly using modern technologies including <strong>Next.js</strong>, <strong>TypeScript</strong>, <strong>TailwindCSS</strong>, and <strong>MongoDB</strong>.
                                </p>
                                <p className="text-xs italic text-gray-400 dark:text-gray-500">
                                    Status: In Development — Not yet deployed
                                </p>
                            </motion.div>
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
                    <div className={`${cardStyles} ${darkMode ? "bg-zinc-900 text-white" : "bg-zinc-300 text-black"}`}>
                        <motion.h3
                            className={`text-2xl mb-4 ${textWithShadow}`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Contact Information
                        </motion.h3>
                        <motion.p
                            className="mb-4"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Feel free to reach out for project opportunities, freelance inquiries, or networking:
                        </motion.p>
                        <ul className="mt-4 space-y-3">
                            {[
                                {
                                    icon: <Mail size={16} />,
                                    content: "taha.abdelra7man@gmail.com",
                                    copy: true,
                                },
                                {
                                    icon: <Phone size={16} />,
                                    content: "+20 101 000 4881",
                                    copy: true,
                                },
                                {
                                    icon: <Linkedin size={16} />,
                                    content: "LinkedIn",
                                    link: "https://www.linkedin.com/in/taha-abdelra7man/",
                                },
                                {
                                    icon: <Github size={16} />,
                                    content: "GitHub",
                                    link: "https://github.com/taha-abdelrahman",
                                },
                                {
                                    icon: <Instagram size={16} />,
                                    content: "@x.tvhv",
                                    link: "https://www.instagram.com/x.tvhv/",
                                },
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className={contactItem(darkMode)}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
                                >
                                    {item.icon}{" "}
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            target="_blank"
                                            className="text-blue-500 hover:underline"
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <>
                                            {item.content}
                                            {item.copy && (
                                                <button
                                                    onClick={() => copyText(item.content)}
                                                    className="ml-auto opacity-60 group-hover:opacity-100"
                                                >
                                                    {getCopyIcon(item.content)}
                                                </button>
                                            )}
                                        </>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                        <motion.div
                            className="text-center mt-10"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }} >
                            <button
                                onClick={() => setShowContactForm(!showContactForm)}
                                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md flex items-center justify-center gap-2 mx-auto"
                            >
                                <Inbox size={16} />
                                {showContactForm ? "Send Message ( Opened )" : "Send Message"}
                            </button>
                        </motion.div>
                    </div>
                </motion.section>



                {/* Toast Message */}
                {toastMessage && (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-zinc-800 text-white rounded-lg shadow-md z-[100] text-sm dark:bg-zinc-700 dark:text-white max-w-[90%] text-center">
                        {toastMessage}
                    </div>
                )}

                {/* Contact Form */}
                <AnimatePresence>
                    {showContactForm && (
                        <motion.section
                            id="contactForm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center overflow-y-auto p-4"
                        >
                            <div className={`relative rounded-2xl shadow-2xl max-w-xl w-full p-6 ${darkMode ? "bg-zinc-900 text-white" : "bg-white text-black"}`}>
                                <button
                                    onClick={() => setShowContactForm(false)}
                                    className="absolute top-4 right-4 text-zinc-500 hover:text-red-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <h3 className="text-2xl font-bold mb-6 text-center">Contact Me</h3>

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setShowConfirmModal(true);
                                    }}
                                    className={`flex flex-col gap-4 bg-opacity-80 backdrop-blur-lg p-6 rounded-xl shadow-2xl border ${darkMode ? "border-zinc-700" : "border-gray-200"}`}
                                >
                                    <input type="hidden" name="_from" value="Taha Portfolio Contact" />
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your Name"
                                        className={`px-4 py-2 rounded-md border dark:border-zinc-700 shadow ${darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-black"}`}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Your Email"
                                        className={`px-4 py-2 rounded-md border dark:border-zinc-700 shadow ${darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-black"}`}
                                    />
                                    <textarea
                                        name="message"
                                        required
                                        rows="5"
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder="Your Message"
                                        className={`px-4 py-2 rounded-md border dark:border-zinc-700 shadow ${darkMode ? "bg-zinc-800 text-white" : "bg-gray-100 text-black"}`}
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow flex items-center justify-center gap-2 max-w-xs mx-auto"
                                        style={{ width: "100px" }}

                                    >
                                        <Send size={16} />
                                        Send
                                    </button>

                                </form>
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {showConfirmModal && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center backdrop-blur-sm px-4"
                        >
                            <div className="bg-white dark:bg-zinc-800 text-black dark:text-white rounded-xl p-6 max-w-xs w-full shadow-xl relative">
                                <h4 className="text-lg font-semibold mb-4 text-center">Send Message?</h4>
                                <p className="text-sm text-center mb-6">Are you sure you want to send this message?</p>
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={() => {
                                            handleSend(new Event('submit'));
                                            setShowConfirmModal(false);
                                        }}
                                        className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 shadow"
                                    >
                                        Yes, Send
                                    </button>
                                    <button
                                        onClick={() => setShowConfirmModal(false)}
                                        className="px-4 py-1 border border-gray-300 dark:border-zinc-600 rounded hover:bg-gray-100 dark:hover:bg-zinc-700 shadow"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <footer className={`text-center py-6 text-sm ${darkMode ? "text-gray-500" : "text-gray-600"}`}>
                    © {new Date().getFullYear()} Taha Abdelrahman — Back-End Developer & Designer
                </footer>


            </div>
        </motion.div>
    );
}
