import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './App.css';

import { ALL_PHOTOS } from './photos';
import { translations } from './translations';
import { FullGallery } from './MasonryGridGallery';
import { AdminUpload } from './AdminUpload';




function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function RegionCard({ title, text, imgClass }) {
    return (
        <div className="region-card">
            <div className={`region-img ${imgClass}`}></div>
            <div className="region-info"><h3>{title}</h3><p>{text}</p></div>
        </div>
    );
}


function HomePage({ lang }) {
    const form = useRef();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const t = translations[lang];
    useEffect(() => { document.title = `${translations[lang].title}`; }, [lang]);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
        .then(() => { alert(lang === 'ka' ? 'შეტყობინება გაიგზავნა!' : 'Message sent!'); form.current.reset(); }, () => { alert(lang === 'ka' ? 'შეცდომაა, სცადეთ მოგვიანებით.' : 'Error, please try again.'); });
    };

    const previewImages = ALL_PHOTOS.slice(0, 6); 
    const nextImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev + 1) % previewImages.length); };
    const prevImg = (e) => { e.stopPropagation(); setSelectedIndex((prev) => (prev - 1 + previewImages.length) % previewImages.length); };

    return (
        <>
            <header className="hero" id="home">
                <div className="hero-text">
                    <p style={{ color: '#ffc107', marginBottom: '10px', fontSize: '1.2rem' }}>"{t.dev}"</p>
                    <h1>{translations[lang].title}</h1>
                    <p>{t.subtitle}</p>
                    <a href="#contact" className="cta-btn">{t.join}</a>
                </div>
            </header>

            <section className="container" id="about">
                <div className="section-title"><h2>{t.whoWeAre}</h2></div>
                <div className="centered-text"><p>{t.aboutText}</p></div>
            </section>

            <section className="container" id="region-section">
                <div className="section-title"><h2>{t.region}</h2></div>
                <div className="region-grid">
                    <RegionCard title={t.samegrelo} text={t.samegreloText} imgClass="img-samegrelo" />
                    <RegionCard title={t.svaneti} text={t.svanetiText} imgClass="img-svaneti" />
                </div>
            </section>

            <section className="activities-container" id="activities">
                <div className="section-title"><h2>{t.whatWeDo}</h2></div>
                <div className="activities-list">
                    <div className="activity-item">{t.camp}</div>
                    <div className="activity-item">{t.hike}</div>
                    <div className="activity-item">{t.projects}</div>
                    <div className="activity-item">{t.help}</div>
                </div>
            </section>

            <section className="container" id="mission">
                <div className="section-title"><h2>{t.mission}</h2></div>
                <div className="centered-text"><p>{t.missionText}</p></div>
            </section>

            <section className="container" id="location">
                <div className="section-title"><h2>{t.location}</h2></div>
                <div className="centered-text">
                    <p>{t.locationText}</p>
                    <div className="map-container" style={{ marginTop: '20px' }}>
                        <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678" width="100%" height="450" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy"></iframe>
                    </div>
                </div>
            </section>

            <section className="container donation-section" id="donation">
                <div className="section-title"><h2>{t.donationTitle}</h2></div>
                <div className="centered-text">
                    <p>{t.donationText}</p>
                    <button className="cta-btn" style={{marginTop: '20px'}}>{t.donateBtn}</button>
                </div>
            </section>

            <section className="gallery-container" id="gallery-section">
                <div className="section-title"><h2>{t.photos}</h2></div>
                <div className="masonry-grid">
                    {previewImages.map((img, index) => (
                        <div key={img.id} className="masonry-item" onClick={() => setSelectedIndex(index)}>
                            <img src={img.url} alt={img.title} loading="lazy" />
                            <div className="item-hover-overlay">
                                <div className="overlay-content"><h2 className="overlay-type">{img.type}</h2><p className="overlay-year">{img.year}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ textAlign: 'center', marginTop: '40px' }}><Link to="/gallery" className="cta-btn">{t.viewAll}</Link></div>
            </section>

            {selectedIndex !== null && (
                <div className="modal-overlay" onClick={() => setSelectedIndex(null)}>
                    <span className="close-modal" onClick={() => setSelectedIndex(null)}>×</span>
                    <button className="nav-btn prev" onClick={prevImg}>❮</button>
                    <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
                        <img className="modal-content" src={previewImages[selectedIndex].url} alt="Enlarged" />
                    </div>
                    <button className="nav-btn next" onClick={nextImg}>❯</button>
                </div>
            )}

            <section className="contact-container" id="contact">
                <div className="section-title"><h2>{t.contact}</h2></div>
                <form ref={form} className="contact-form" onSubmit={sendEmail}>
                    <input type="text" name="name" placeholder={t.name} required />
                    <input type="email" name="email" placeholder={t.email} required />
                    <textarea name="message" placeholder={t.message} required></textarea>
                    <button type="submit" className="cta-btn">{t.send}</button>
                </form>
            </section>

            {/* --- NEW DEVELOPER SECTION --- */}
            <section className="container" id="developer" style={{ padding: '80px 20px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                <div className="section-title">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>{t.developerTitle}</h2>
                </div>
                
                <div className="dev-layout" style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    flexWrap: 'wrap',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '50px', 
                    maxWidth: '1000px',
                    margin: '0 auto'
                }}>
                    {/* Photo Column */}
                    <div className="dev-photo-wrapper" style={{ flexShrink: 0 }}>
                        <img 
                            src="https://res.cloudinary.com/dmgtsbro4/image/upload/v1768667645/IMG_20221023_155538_205_kzzwyi.jpg" 
                            alt="Luka Guledani" 
                            style={{ 
                                width: '240px', 
                                height: '240px', 
                                borderRadius: '20px', // Changed to rounded square to match your second image feel
                                objectFit: 'cover', 
                                border: '4px solid #ffc107', 
                                boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                            }} 
                        />
                    </div>

                    {/* Text Column */}
                    <div className="dev-story-content" style={{ 
                        flex: '1', 
                        minWidth: '300px', 
                        textAlign: 'left' 
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                            {t.developerText} <span style={{ color: '#ffc107', fontWeight: 'bold' }}>Luka Guledani</span>
                        </h3>
                        
                        <p style={{ 
                            lineHeight: '1.8', 
                            fontSize: '1.1rem',
                            color: '#555',
                            fontStyle: 'italic',
                            backgroundColor: 'rgba(255, 193, 7, 0.05)',
                            padding: '20px',
                            borderRadius: '10px',
                            borderLeft: '5px solid #ffc107'
                        }}>
                            "{t.devStory}"
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [lang, setLang] = useState('ka');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const t = translations[lang];

    useEffect(() => { setIsMenuOpen(false); }, [location]);

    const scrollToSection = (e, id) => {
        if (e) e.preventDefault();
        setIsMenuOpen(false);
        const executeScroll = () => {
            if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); } 
            else { const target = document.getElementById(id); target?.scrollIntoView({ behavior: 'smooth' }); }
        };
        if (location.pathname !== '/') { navigate('/'); setTimeout(executeScroll, 150); } 
        else { executeScroll(); }
    };

    return (
        <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <ScrollToTop />
            <nav>
                <div className="logo" onClick={(e) => scrollToSection(e, 'top')} style={{ cursor: 'pointer' }}>
                    <img src="/assets/icon.ico" alt="Logo" style={{ height: '45px', borderRadius: '5px' }} />
                    <div className="logo-text"><span className="line1">{t.logoLine1}</span><span className="line2">{t.logoLine2}</span></div>
                </div>
                <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? '✕' : '☰'}</div>
                <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
                    <li><a href="/" onClick={(e) => scrollToSection(e, 'top')}>{t.main}</a></li>
                    <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>{t.whoWeAre}</a></li>
                    <li><a href="#activities" onClick={(e) => scrollToSection(e, 'activities')}>{t.whatWeDo}</a></li>
                    <li><a href="#mission" onClick={(e) => scrollToSection(e, 'mission')}>{t.mission}</a></li>
                    <li><a href="#location" onClick={(e) => scrollToSection(e, 'location')}>{t.location}</a></li>
                    <li><a href="#donation" onClick={(e) => scrollToSection(e, 'donation')}>{t.donation}</a></li>
                   <li><Link to="/gallery">{t.gallery}</Link></li>
                    <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.contact}</a></li>
                    <li className="nav-controls-wrapper">
                        <div className="nav-controls">
                            <button className="lang-btn" onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}>{lang === 'ka' ? 'EN' : 'KA'}</button>
                            <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? t.day : t.night}</button>
                        </div>
                    </li>
                </ul>
            </nav>

            <Routes>
                <Route path="/" element={<HomePage lang={lang} />} />
                <Route path="/gallery" element={<FullGallery lang={lang} />} />
                <Route path="/admin-upload" element={<AdminUpload lang={lang} />} />
            </Routes>

            <footer>
                <p>© 2026 Scouts Of Samegrelo</p>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                </div>
            </footer>
        </div>
    );
}

export default App;