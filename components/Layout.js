// Final Layout.js Code...
import Head from 'next/head';
import Script from 'next/script';
import { useState, useEffect } from 'react';

const NewsletterPopup = ({ popupSettings, onClose }) => {
  if (!popupSettings || !popupSettings.enabled) return null;
  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'white', border: '1px solid #ccc', padding: '20px', zIndex: 1000, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h3>{popupSettings.title || 'Subscribe'}</h3>
      <p>{popupSettings.text || 'Get the latest posts.'}</p>
      {/* Yahan Mailchimp ya dusre form ka code integrate hoga */}
      <input type="email" placeholder="Enter your email" style={{ padding: '8px', width: 'calc(100% - 16px)', marginBottom: '10px' }} />
      <button style={{ padding: '10px', width: '100%', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}>Subscribe</button>
      <button onClick={onClose} style={{ position: 'absolute', top: '5px', right: '5px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
    </div>
  );
};

export default function Layout({ children, globalSettings }) {
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => { if (!localStorage.getItem('popup_closed')) { setShowPopup(true); } }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const handleClosePopup = () => { setShowPopup(false); localStorage.setItem('popup_closed', 'true'); };
  const adsterra = globalSettings?.adsterra || {};
  const siteName = globalSettings?.siteName || 'My Pro Blog';
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header><h2>{siteName}</h2></header>
      <main>{children}</main>
      <footer><p>&copy; {new Date().getFullYear()} {siteName}.</p></footer>
      {showPopup && <NewsletterPopup popupSettings={globalSettings?.popup} onClose={handleClosePopup} />}
      {adsterra.socialBarScript && <Script id="adsterra-socialbar" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: adsterra.socialBarScript }} />}
      {adsterra.popunderScript && <Script id="adsterra-popunder" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: adsterra.popunderScript }} />}
    </>
  );
}
