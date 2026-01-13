import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import './App.css'

const translations = {
  ka: {
    title: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაცია",
    dev: "საიტი დეველოპმეტის პროცესშია",
    subtitle: "საქართველოს სკაუტური მოძრაობის სამეგრელოს ორგანიზაციის წევრთა სარეგისტრაციო ფორმა",
    join: "შემოგვიერთდი",
    region: "ჩვენი რეგიონი",
    samegrelo: "სამეგრელო",
    samegreloText: "ზუგდიდი და დადიანების სასახლე.",
    svaneti: "ზემო სვანეთი",
    svanetiText: "მესტია და უშგული.",
    activities: "აქტივობები",
    camp: "🏕️ ბანაკები",
    hike: "🧗 ლაშქრობები",
    projects: "🤝 პროექტები",
    help: "🩹 დახმარება",
    photos: "ჩვენი ფოტოები",
    viewAll: "ყველა ფოტოს ნახვა",
    contact: "კონტაქტი",
    name: "თქვენი სახელი და გვარი",
    email: "თქვენი ელ-ფოსტა",
    message: "თქვენი შეტყობინება",
    send: "გაგზავნა",
    main: "მთავარი",
    gallery: "ფოტოები",
    fullGallery: "სრული გალერეა",
    back: "← მთავარზე დაბრუნება",
    day: "☀️ დღე",
    night: "🌙 ღამე",
    whoWeAre: "ვინ ვართ ჩვენ",
    whatWeDo: "რას ვაკეთებთ",
    mission: "მიზანი მისია და ხედვა",
    aboutText: "ჩვენ ვართ მოხალისეობრივი, არაპოლიტიკური ორგანიზაცია ახალგაზრდებისთვის.",
    missionText: "ჩვენი მისიაა წვლილი შევიტანოთ ახალგაზრდების აღზრდაში ღირებულებათა სისტემის მეშვეობით.",
    logoTitle: "სამეგრელოს სკაუტები"
  },
  en: {
    title: "Samegrelo Organization of the Scout Movement of Georgia",
    dev: "Site is under development",
    subtitle: "Registration form for members of the Samegrelo organization of the Scout Movement of Georgia",
    join: "Join Us",
    region: "Our Region",
    samegrelo: "Samegrelo",
    samegreloText: "Zugdidi and Dadiani Palace.",
    svaneti: "Upper Svaneti",
    svanetiText: "Mestia and Ushguli.",
    activities: "Activities",
    camp: "🏕️ Camps",
    hike: "🧗 Hiking",
    projects: "🤝 Projects",
    help: "🩹 Assistance",
    photos: "Our Photos",
    viewAll: "View All Photos",
    contact: "Contact",
    name: "Your Name and Surname",
    email: "Your Email",
    message: "Your Message",
    send: "Send",
    main: "Home",
    gallery: "Gallery",
    fullGallery: "Full Gallery",
    back: "← Back to Main",
    day: "☀️ Day",
    night: "🌙 Night",
    whoWeAre: "Who We Are",
    whatWeDo: "What We Do",
    mission: "Mission & Vision",
    aboutText: "We are a voluntary, non-political educational movement for young people.",
    missionText: "Our mission is to contribute to the education of young people through a value system.",
    logoTitle: "Samegrelo Scouts"
  }
};

function AdminUpload({ lang }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!file) return alert(lang === 'ka' ? "აირჩიეთ ფაილი!" : "Select a file!");
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.url) setUrl(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h2>Upload New Photo</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ margin: '20px 0' }} />
      <br />
      <button className="cta-btn" onClick={handleUpload} disabled={loading}>
        {loading ? (lang === 'ka' ? "მუშავდება..." : "Processing...") : (lang === 'ka' ? "ატვირთვა" : "Upload to Cloudinary")}
      </button>
      {url && (
        <div style={{ marginTop: '20px' }}>
          <p>Link: <a href={url} target="_blank" rel="noreferrer">{url}</a></p>
        </div>
      )}
    </div>
  );
}

function FullGallery({ images, lang }) {
  const [localSelectedImg, setLocalSelectedImg] = useState(null);
  const t = translations[lang];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t.fullGallery} | ${translations[lang].title}`;
  }, [t.fullGallery, lang]);

  return (
    <div className="gallery-container gallery-page">
      <div className="section-title">
        <h1>{t.fullGallery}</h1>
        <Link to="/" className="cta-btn back-btn">{t.back}</Link>
      </div>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="gallery-item" 
            style={{ overflow: 'hidden', display: 'flex' }}
            onClick={() => setLocalSelectedImg(img)}
          >
            <img 
              src={img} 
              alt="Scout activity" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        ))}
      </div>
      {localSelectedImg && (
        <div className="modal" onClick={() => setLocalSelectedImg(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={localSelectedImg} alt="Enlarged" />
        </div>
      )}
    </div>
  );
}

function HomePage({ images, setSelectedImg, lang }) {
  const form = useRef();
  const dadianiPhoto = '/assets/photos/dadianebis-sasakhle-palace-of-dadiani.jpg';
  const ushguliPhoto = '/assets/photos/ushguli.jpg';
  const t = translations[lang];

  useEffect(() => {
    document.title = `${translations[lang].title} | ${t.subtitle}`;
  }, [lang, t.subtitle]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form.current, 
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
        alert(lang === 'ka' ? 'შეტყობინება გაიგზავნა!' : 'Message sent!');
        form.current.reset();
    }, (error) => {
        alert(lang === 'ka' ? 'შეცდომაა, სცადეთ მოგვიანებით.' : 'Error, please try again.');
    });
  };

  return (
    <>
      <header className="hero">
        <div className="hero-text">
          <p style={{ color: '#ffc107', marginTop: '10px', fontSize: '1rem' }}>"{t.dev}"</p>
          <h1>{translations[lang].title}</h1>
          <p>{t.subtitle}</p>
          <a href="#contact" className="cta-btn">{t.join}</a>
        </div>
      </header>

      <section className="container" id="about" style={{ padding: '80px 20px' }}>
        <div className="section-title"><h2>{t.whoWeAre}</h2></div>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <p>{t.aboutText}</p>
        </div>
      </section>

      <main className="container" id="region-section">
        <div className="section-title"><h2>{t.region}</h2></div>
        <div className="region-grid">
          <RegionCard title={t.samegrelo} text={t.samegreloText} imgClass="img-samegrelo" onClick={() => setSelectedImg(dadianiPhoto)} />
          <RegionCard title={t.svaneti} text={t.svanetiText} imgClass="img-svaneti" onClick={() => setSelectedImg(ushguliPhoto)} />
        </div>
      </main>

      <section className="activities-container" id="activities">
        <div className="section-title"><h2>{t.whatWeDo}</h2></div>
        <div className="activities-list">
          <div className="activity-item">{t.camp}</div>
          <div className="activity-item">{t.hike}</div>
          <div className="activity-item">{t.projects}</div>
          <div className="activity-item">{t.help}</div>
        </div>
      </section>

      <section className="container" id="mission" style={{ padding: '80px 20px' }}>
        <div className="section-title"><h2>{t.mission}</h2></div>
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <p>{t.missionText}</p>
        </div>
      </section>

      <section className="gallery-container" id="gallery">
        <div className="section-title"><h2>{t.photos}</h2></div>
        <div className="gallery-grid">
          {images.slice(0, 6).map((img, index) => (
            <div 
              key={index} 
              className="gallery-item" 
              style={{ overflow: 'hidden', display: 'flex' }}
              onClick={() => setSelectedImg(img)}
            >
              <img 
                src={img} 
                alt="Gallery preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/gallery" className="cta-btn view-more-btn">{t.viewAll}</Link>
        </div>
      </section>

      <section className="contact-container" id="contact">
        <div className="section-title"><h2>{t.contact}</h2></div>
        <form ref={form} className="contact-form" onSubmit={sendEmail}>
          <input type="text" name="name" placeholder={t.name} required />
          <input type="email" name="email" placeholder={t.email} required />
          <textarea name="message" placeholder={t.message} required></textarea>
          <button type="submit" className="cta-btn">{t.send}</button>
        </form>
      </section>
    </>
  );
}

function App() {
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState('ka');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const t = translations[lang];

  const galleryImages = [
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345768/scouts_gallery/xihnsdvz89yaim6uy0mq.jpg', 
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345779/scouts_gallery/bdmgyvbc4u2v84euxevu.jpg',
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345785/scouts_gallery/hq7xlxa83oqeue2v7n5f.jpg', 
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768344314/scouts_gallery/lwlaa6otqrviplveleic.jpg',
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345790/scouts_gallery/suwowi2cp8gsjzulots8.jpg', 
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345795/scouts_gallery/qi1gguz0ixsjy8plnhwf.jpg',
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345799/scouts_gallery/lgdufaxatpl96ya3o7mc.jpg', 
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345804/scouts_gallery/idnuvxc76dalu7mxuwso.jpg',
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345810/scouts_gallery/ne49f5mvrmqeqdoekqiw.jpg', 
    'https://res.cloudinary.com/dmgtsbro4/image/upload/v1768345815/scouts_gallery/sainsemc72f3ul9teb3l.jpg'
  ];

  const logoPhoto = '/assets/icon.ico';

  useEffect(() => {
    setIsMenuOpen(false);
    if (!location.hash) {
        window.scrollTo(0, 0);
    }
  }, [location]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <nav>
        <div className="logo" onClick={() => {
            closeMenu();
            setSelectedImg(logoPhoto);
          }}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <img src="/assets/icon.ico" alt="Logo" style={{ height: '35px', borderRadius: '5px' }} />
          <span>{t.logoTitle}</span>
        </div>
        
        <div 
          className="menu-icon" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </div>

        <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
          <li className="nav-controls">
            <button className="lang-btn" onClick={() => setLang(lang === 'ka' ? 'en' : 'ka')}>
              {lang === 'ka' ? 'ENGLISH' : 'ქართული'}
            </button>
            <button className="theme-btn" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? t.day : t.night}
            </button>
          </li>
          <li><Link to="/" onClick={closeMenu}>{t.main}</Link></li>
          <li><a href="#about" onClick={closeMenu}>{t.whoWeAre}</a></li>
          <li><a href="#activities" onClick={closeMenu}>{t.whatWeDo}</a></li>
          <li><a href="#mission" onClick={closeMenu}>{t.mission}</a></li>
          <li><Link to="/gallery" onClick={closeMenu}>{t.gallery}</Link></li>
          <li><a href="#contact" onClick={closeMenu}>{t.contact}</a></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage images={galleryImages} setSelectedImg={setSelectedImg} lang={lang} />} />
        <Route path="/gallery" element={<FullGallery images={galleryImages} lang={lang} />} />
        <Route path="/admin-upload" element={<AdminUpload lang={lang} />} />
      </Routes>

      {selectedImg && (
        <div className="modal" onClick={() => setSelectedImg(null)}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImg} alt="Enlarged" />
        </div>
      )}

      <footer>
        <div className="footer-content">
            <p>© 2026 Scout Of Samegrelo</p>
            <div className="social-links">
                <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noreferrer"><i className="fab fa-facebook"></i></a>
                <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            </div>
        </div>
      </footer>
    </div>
  )
}

function RegionCard({ title, text, imgClass, onClick }) {
  return (
    <div className="region-card" onClick={onClick}>
      <div className={`region-img ${imgClass}`}></div>
      <div className="region-info"><h3>{title}</h3><p>{text}</p></div>
    </div>
  )
}

export default App;