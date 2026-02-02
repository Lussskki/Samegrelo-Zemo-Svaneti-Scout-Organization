import { useState, useEffect } from 'react';
import './App.css'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('KA'); // KA / EN
  const [theme, setTheme] = useState('day'); // day / night

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  // Set body class for day/night
  useEffect(() => {
    document.body.className = theme === 'day' ? 'day' : 'night';
  }, [theme]);

  // Language content
  const content = {
    KA: {
      title: 'სამეგრელოს ორგანიზაციის სკაუტები',
      home: 'მთავარი',
      about: 'ჩვენი ცენტრი ინგირში',
      // activities: 'აქტივობები',
      join: 'ჩვენს შესახებ',
      sponsors: 'გალერეა',
      heroTitle: 'თავგადასავალი, ბუნება და ლიდერობა სამეგრელოს გულში.',
      heroText: 'სამეგრელოს  სკაუტური ცენტრი გელით!',
      joinBtn: 'განხორციელებული პროექტები',
      learnBtn: 'გაიგე მეტი ცენტრზე',
      youth: 'ახალგაზრდებისთვის',
      parents: 'მშობლებისთვის',
      becomeScout: 'გახდი სკაუტი',
      membership: 'წევრობის შესახებ',
      latestActivities: 'მიმდინარე პროექტები',
      campZone: 'საბანაკე ზონა',
      adventurePark: 'სათავგადასავლო პარკი',
      eduSpace: 'საგანმანათლებლო სივრცე',
      socialMedia: 'სოციალური მედია',
      location: 'ჩვენს შესახებ',
      partner: 'პარტნიორი',
      services: 'სერვისები',
      training: 'ტრენინგები',
      events: 'ღონისძიებები',
      rent: 'ცენტრის გაქირავება',
      servicesDesc1: 'სკაუტური ლიდერობა, ბუნებაში გადარჩენა და გუნდური მუშაობა.',
      servicesDesc2: 'ბანაკები, ფესტივალები და საგანმანათლებლო ღონისძიებები.',
      servicesDesc3: 'ცენტრის სივრცის გამოყენება ბანაკებისა და ღონისძიებებისთვის.',
      developerTitle: 'დეველოპერის შესახებ',
      developerText: 'ვებ-საიტი შექმნილია Luka Guledani-ის მიერ React და Vite ტექნოლოგიების გამოყენებით, თანამედროვე UI/UX მიდგომებით.',
      contact: 'კონტაქტი',
      donation: 'დონაცია'
    },
    EN: {
      title: 'Samegrelo Organization Scouts',
      home: 'Home',
      about: 'About',
      activities: 'Activities',
      join: 'Location',
      sponsors: 'Sponsors',
      heroTitle: 'Adventure, Nature, and Leadership in the Heart of Samegrelo.',
      heroText: 'Welcome to Samegrelo Scout Center!',
      joinBtn: 'Join the Scouts',
      learnBtn: 'Learn More About Center In Ingiri',
      youth: 'For Youth',
      parents: 'For Parents',
      becomeScout: 'Become a Scout',
      membership: 'Membership Info',
      latestActivities: 'Latest Activities',
      campZone: 'Camping Zone',
      adventurePark: 'Adventure Park',
      eduSpace: 'Educational Space',
      socialMedia: 'Social Media',
      location: 'Location',
      partner: 'Partners',
      services: 'Services',
      training: 'Trainings',
      events: 'Events',
      rent: 'Center Rental',
      servicesDesc1: 'Scout leadership, survival skills in nature, and teamwork.',
      servicesDesc2: 'Camps, festivals, and educational events.',
      servicesDesc3: 'Use of the scout center space for camps and events.',
      developerTitle: 'About the Developer',
      developerText: 'This website was developed by Luka Guledani using React and Vite technologies, with modern UI/UX approaches.'
    }
  };

  const langContent = content[lang];
  const [aboutOpen, setAboutOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);


  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div className="logo-group">
          <a href="#hero" onClick={() => setMenuOpen(false)}>
            <img src="/assets/icon.ico" alt="Logo" className="logo-img" />
            <img
              src="assets/mountain-logo.png" className='logo-sec-img'
            />

          </a>
        </div>

        {/* HAMBURGER (mobile only) */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </div>

        {/* FULLSCREEN NAV */}
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>

          <a href="#hero" onClick={() => setMenuOpen(false)}>
            მთავარი
          </a>

          <div className={`nav-dropdown ${aboutOpen ? 'open' : ''}`}>


            <button
              className="nav-link"
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              ჩვენს შესახებ
            </button>

            {aboutOpen && (
              <div className="dropdown-panel">
                <a href="#who" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>
                  ვინ ვართ ჩვენ
                </a>

                <a href="#history" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>
                  სკაუტინგის ისტორია
                </a>

                <a href="#mission" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>
                  მიზანი / მისია / ხედვა
                </a>

                <a href="#become" onClick={() => { setMenuOpen(false); setAboutOpen(false); }}>
                  როგორ გავხდე სკაუტი
                </a>
              </div>
            )}

          </div>


          <a href="#services" onClick={() => setMenuOpen(false)}>
            საგანმანათლებლო პროექტები
          </a>

          <a href="#target" onClick={() => setMenuOpen(false)}>
            ახალგაზრდული პროექტები
          </a>

          <div className="nav-dropdown">

            <button
              type="button"
              className="nav-link"
              onClick={(e) => {
                e.stopPropagation();
                setServicesOpen(prev => !prev);
              }}
            >
              {langContent.services}
            </button>

            {servicesOpen && (
              <div className="dropdown-panel">
                <a href="#service-school" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  სკაუტური სკოლა
                </a>
                <a href="#service-camps" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  ახალგაზრდული ბანაკები
                </a>
                <a href="#service-schools" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  შეთავაზება სკოლებს
                </a>
                <a href="#service-eco" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  ეკოტურები / ლაშქრობები
                </a>
                <a href="#service-venue" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  ადგილი შენი ღონისძიებისთვის
                </a>
                <a href="#service-event" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  ივენთ მენეჯმენტი
                </a>
                <a href="#service-international" onClick={() => { setMenuOpen(false); setServicesOpen(false); }}>
                  საერთაშორისო აქტივობები
                </a>
              </div>
            )}

          </div>


          <a href="#gallery" onClick={() => setMenuOpen(false)}>
            გალერეა
          </a>

          <a href="#donation" onClick={() => setMenuOpen(false)}>
            დონაცია
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            კონტაქტი
          </a>

          <div className="menu-controls">
            <button
              className="control-btn"
              onClick={() => setLang(lang === 'KA' ? 'EN' : 'KA')}
            >
              {lang}
            </button>

            <button
              className="control-btn"
              onClick={() => setTheme(theme === 'day' ? 'night' : 'day')}
            >
              {theme === 'day' ? '🌞' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id="hero" className="hero">
        <img 
          src="https://picsum.photos/id/386/1600/900" 
          alt="Scouts adventure and leadership in the nature of Samegrelo" 
          className="hero-img-tag"
        />

        <div className="hero-content">
          <h1>{langContent.heroTitle}</h1>
          <p>{langContent.heroText}</p>
        </div>
      </section>

      {/* EDUCATIONAL PROJECTS */}
      <section id="services" className="edu-projects-section">
        <h2 className="section-title">საგანმანათლებლო პროექტები</h2>

        <p className="section-subtitle">
          სკაუტური საგანმანათლებლო პროგრამები, რომლებიც ხელს უწყობს
          ახალგაზრდების განვითარებას პრაქტიკული გამოცდილების გზით.
        </p>

        <div className="edu-projects-grid">

          <div className="edu-card">
            <h3>ლიდერობის პროგრამა</h3>
            <p>
              ახალგაზრდებში ლიდერული უნარების განვითარება
              გუნდური მუშაობისა და პრაქტიკული აქტივობების მეშვეობით.
            </p>
          </div>

          <div className="edu-card">
            <h3>გარემოსდაცვითი განათლება</h3>
            <p>
              ბუნების დაცვა, ეკოლოგიური ცნობიერება და
              პასუხისმგებლობის აღზრდა.
            </p>
          </div>

          <div className="edu-card">
            <h3>ცხოვრების უნარები</h3>
            <p>
              თვითკმარობა, პრობლემების გადაჭრა და
              რეალურ ცხოვრებაში გამოსაყენებელი ცოდნა.
            </p>
          </div>

          <div className="edu-card">
            <h3>არაფორმალური განათლება</h3>
            <p>
              სწავლა გამოცდილებით, თამაშით და
              პრაქტიკული ჩართულობით.
            </p>
          </div>

        </div>
      </section>


      {/* SERVICES */}
      <section id="services" className="services-section">
        <h2 className="section-title">სერვისები</h2>

        <div className="services-grid">

          <div id="service-school" className="service-card">
            <h3>სკაუტური სკოლა</h3>
            <p>ლიდერობის, გუნდურობისა და სკაუტური უნარების განვითარება.</p>
          </div>

          <div id="service-camps" className="service-card">
            <h3>ახალგაზრდული ბანაკები</h3>
            <p>საბანაკე პროგრამები და პრაქტიკული სწავლება ბუნებაში.</p>
          </div>

          <div id="service-schools" className="service-card">
            <h3>შეთავაზება სკოლებს</h3>
            <p>საგანმანათლებლო სკაუტური პროგრამები სკოლებისთვის.</p>
          </div>

          <div id="service-eco" className="service-card">
            <h3>ეკოტურები და ლაშქრობები</h3>
            <p>აქტიური დასვენება და ეკოლოგიური ცნობიერების ამაღლება.</p>
          </div>

          <div id="service-venue" className="service-card">
            <h3>ადგილი ღონისძიებისთვის</h3>
            <p>სივრცის გაქირავება ბანაკებისა და ღონისძიებებისთვის.</p>
          </div>

          <div id="service-event" className="service-card">
            <h3>ივენთ მენეჯმენტი</h3>
            <p>ღონისძიებების სრული დაგეგმვა და ორგანიზება.</p>
          </div>

          <div id="service-international" className="service-card">
            <h3>საერთაშორისო აქტივობები</h3>
            <p>საერთაშორისო ბანაკები და სკაუტური პარტნიორობები.</p>
          </div>

        </div>
      </section>

      {/* ABOUT – ჩვენს შესახებ */}
    <section id="about" className="about-section">
      <h2 className="section-title">ჩვენს შესახებ</h2>
      <p className="section-subtitle">
        სამეგრელოს სკაუტური ცენტრი არის ახალგაზრდული სივრცე,
        რომელიც აერთიანებს განათლებას, ბუნებასა და ლიდერობას.
      </p>

      <div className="about-content">

        <section id="who" className="about-block">
          <h3>ვინ ვართ ჩვენ</h3>
          <p>
            ჩვენ ვართ სკაუტური ორგანიზაცია, რომელიც ხელს უწყობს
            ახალგაზრდების პიროვნულ განვითარებას, გუნდურ მუშაობასა
            და აქტიურ მოქალაქეობას.
          </p>
        </section>

        <section id="history" className="about-block">
          <h3>სკაუტინგის ისტორია</h3>
          <p>
            სკაუტური მოძრაობა დაარსდა 1907 წელს და დღეს მსოფლიოს
            მილიონობით ახალგაზრდას აერთიანებს საერთო ღირებულებებით.
          </p>
        </section>

        <section id="mission" className="about-block">
          <h3>მიზანი • მისია • ხედვა</h3>
          <p>
            ჩვენი მიზანია ლიდერული, პასუხისმგებელი და ბუნებაზე
            მზრუნველი თაობის აღზრდა.
          </p>
        </section>

        <section id="become" className="about-block">
          <h3>როგორ გავხდე სკაუტი</h3>
          <p>
            სკაუტად გახდომა შესაძლებელია რეგისტრაციისა და
            აქტიურ პროგრამებში ჩართვის გზით.
          </p>
        </section>
      </div>
    </section>

    {/* YOUTH PROJECTS */}
    <section id="target" className="youth-projects-section">
      <h2 className="section-title">ახალგაზრდული პროექტები</h2>

      <p className="section-subtitle">
        პროექტები, რომლებიც აძლიერებს ახალგაზრდების ჩართულობას,
        ლიდერობასა და სოციალურ პასუხისმგებლობას.
      </p>

      <div className="youth-projects-grid">

        <div className="youth-card">
          <h3>ახალგაზრდული ლიდერობა</h3>
          <p>
            ლიდერული უნარების განვითარება პრაქტიკული აქტივობებით
            და გუნდურ გარემოში.
          </p>
        </div>

        <div className="youth-card">
          <h3>სოციალური ინიციატივები</h3>
          <p>
            მოხალისეობა, საზოგადოებრივი პროექტები და
            აქტიური მოქალაქეობის მხარდაჭერა.
          </p>
        </div>

        <div className="youth-card">
          <h3>კულტურული და სპორტული აქტივობები</h3>
          <p>
            სპორტი, ლაშქრობები და კულტურული ღონისძიებები
            ჯანსაღი ცხოვრების სტილისთვის.
          </p>
        </div>

        <div className="youth-card">
          <h3>საერთაშორისო ჩართულობა</h3>
          <p>
            გაცვლითი პროგრამები, საერთაშორისო ბანაკები
            და მეგობრობა საზღვრებს გარეთ.
          </p>
        </div>

      </div>
    </section>

            <footer className="footer">
        <div className="footer-col">
          <h4>{langContent.socialMedia}</h4>
          
          <div className="social-icons">
            {/* Facebook Icon */}
            <a href="https://www.facebook.com/profile.php?id=100064482258846" target="_blank" rel="noopener noreferrer">
              <img src="assets/facebook.png" alt="Facebook" className="logo-third-img-camp" />
            </a>

            {/* Instagram Icon */}
            <a href="https://www.instagram.com/scoutsofsamegrelo/" target="_blank" rel="noopener noreferrer">
              <img src="assets/instagram.png" alt="Instagram" className="logo-third-img-camp" />
            </a>
          </div>

          <div className="contact-details">
            <p>
              <a href="tel:+9955334557890">
                <img src="assets/phone.png" alt="Phone" className="contact-icon-small" />
                + 995 533 455 7890
              </a>
            </p>
            <p>
              <a href="mailto:scoutsofsamegrelo@gmail.com">
                <img src="assets/mail.png" alt="Email" className="contact-icon-small" />
                scoutsofsamegrelo@gmail.com
              </a>
            </p>
            <p>
              <a href="https://scoutsofsamegrelo.com" target="_blank" rel="noreferrer">
                <img src="assets/web.png" alt="Web" className="contact-icon-small" />
                scoutsofsamegrelo.com
              </a>
            </p>
          </div>
        </div>
      

        <div className="footer-col" id="location">
          <h4>{langContent.location}</h4>
          <div className="map-container" style={{ marginTop: '20px' }}>
            <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2960.140492091809!2d41.8297427!3d42.4977788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x405c2506c0f5b005%3A0xe6ae831db81149c0!2z4YOV4YOU4YOi4YOU4YO_4YOY4YOc4YOQ4YO_4YOYIC8gVmV0ZXJpbmFyaWFu!5e0!3m2!1sen!2sge!4v1705312345678"
             width="100%" height="450" style={{ border: 0, borderRadius: '12px' }} allowFullScreen="" loading="lazy">
             </iframe>
          </div>
        </div>

        <div className="footer-col">
          <h4>{langContent.partner}</h4>
          <div className="partner-logos">
            <img src="assets/deja-vu.jpg" alt="DEJA VU" className='dejavu'/>
          </div>
        </div>
      </footer>
    </div>
  );
}