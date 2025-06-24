// pages/_app.jsx
import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Taha Abdelrahman Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Taha Abdelrahman – Back-End Developer and Visual Content Creator. Explore my portfolio, skills, and projects." />
        <meta name="author" content="Taha Abdelrahman" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Facebook */}
        <meta property="og:title" content="Taha Abdelrahman Portfolio" />
        <meta property="og:description" content="Explore my skills, projects, and contact info. I'm a Back-End Developer specialized in Node.js, MongoDB, and API development." />
        <meta property="og:image" content="https://taha-abdelrahman.vercel.app/og-cover.jpg" />
        <meta property="og:image" content="https://tahax.vercel.app/og-cover.jpg" />
        <meta property="og:url" content="https://taha-abdelrahman.vercel.app" />
        <meta property="og:url" content="https://tahax.vercel.app" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Taha Abdelrahman Portfolio" />
        <meta name="twitter:description" content="Check out my portfolio projects and back-end skills." />
        <meta name="twitter:image" content="https://taha-abdelrahman.vercel.app/og-cover.jpg" />
        <meta name="twitter:image" content="https://tahax.vercel.app/og-cover.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
