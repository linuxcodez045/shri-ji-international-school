"use client";

import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Camera,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Globe2,
  MapPin,
  Menu,
  Phone,
  Shapes,
  Trophy,
  X,
  ZoomIn,
} from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { demoDisclaimer, siteData, type SiteImage } from "./siteData";

const iconMap = { BookOpen, Trophy, Shapes, CalendarDays };

function Picture({ image, className = "", eager = false }: { image: SiteImage; className?: string; eager?: boolean }) {
  return (
    // Selected photographs are pre-converted and optimized; plain img preserves their intended crops.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      style={{ objectPosition: image.position }}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding={eager ? "sync" : "async"}
    />
  );
}

function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div className={`section-heading${light ? " light" : ""}`}>
      <p className="eyebrow"><span />{eyebrow}</p>
      <h2>{title}</h2>
      {intro && <p className="section-intro">{intro}</p>}
    </div>
  );
}

export default function SitePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [noticesOpen, setNoticesOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = siteData.navigation
      .map((item) => document.getElementById(item.section))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62%", threshold: [0.02, 0.2, 0.55] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const modalOpen = galleryIndex !== null || noticesOpen;
  function closeModal() {
    setGalleryIndex(null);
    setNoticesOpen(false);
    window.setTimeout(() => returnFocusRef.current?.focus(), 0);
  }

  useEffect(() => {
    if (!modalOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dialog = modalRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
      if (galleryIndex !== null && event.key === "ArrowLeft") {
        setGalleryIndex((galleryIndex - 1 + siteData.gallery.length) % siteData.gallery.length);
      }
      if (galleryIndex !== null && event.key === "ArrowRight") {
        setGalleryIndex((galleryIndex + 1) % siteData.gallery.length);
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [galleryIndex, modalOpen]);

  const openGallery = (index: number, trigger: HTMLElement) => {
    returnFocusRef.current = trigger;
    setGalleryIndex(index);
  };

  const moveGallery = (direction: number) => {
    if (galleryIndex === null) return;
    setGalleryIndex((galleryIndex + direction + siteData.gallery.length) % siteData.gallery.length);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSent(false);
    const form = new FormData(event.currentTarget);
    const required = ["guardian", "student", "classInterest", "phone", "message"];
    const missing = required.some((field) => !String(form.get(field) || "").trim());
    const phone = String(form.get("phone") || "").replace(/[\s()-]/g, "");
    if (missing) {
      setFormError("Please complete every field before submitting the demo form.");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      setFormError("Please enter a valid phone number using 10 to 15 digits.");
      return;
    }
    setFormError("");
    setFormSent(true);
    event.currentTarget.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className={`site-nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Shriji International School home">
          <Picture image={siteData.images.logo} eager />
          <span><strong>SHRIJI</strong><small>INTERNATIONAL SCHOOL</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {siteData.navigation.map((item) => (
            <a key={item.section} href={item.href} className={activeSection === item.section ? "active" : ""}>{item.label}</a>
          ))}
          <a className="nav-cta" href="#enquiry">Admission Enquiry <ArrowUpRight size={15} /></a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {siteData.navigation.map((item) => <a key={item.section} href={item.href} onClick={closeMenu}>{item.label}</a>)}
          <a className="nav-cta" href="#enquiry" onClick={closeMenu}>Admission Enquiry <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <Picture image={siteData.images.hero} className="hero-image" eager />
          <div className="hero-overlay" />
          <div className="hero-content shell">
            <p className="hero-eyebrow">CBSE Affiliated <span /> Affiliation No. 2132392</p>
            <h1 id="hero-title">SHRIJI<br />INTERNATIONAL<br />SCHOOL</h1>
            <p className="hero-location">{siteData.school.shortAddress}</p>
            <p className="hero-values">Learning <span>•</span> Character <span>•</span> Growth</p>
            <div className="hero-actions">
              <a className="button button-light" href="#about">Explore Our School <ArrowRight size={17} /></a>
              <a className="button button-outline" href="#enquiry">Admission Enquiry</a>
            </div>
          </div>
          <a className="scroll-cue" href="#about">Scroll to discover <span>↓</span></a>
        </section>

        <section className="trust-strip shell" aria-label="School credentials">
          {siteData.trustItems.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
        </section>

        <section className="section about-section" id="about">
          <div className="shell about-grid">
            <div className="about-copy">
              <SectionHeading eyebrow="Welcome" title="A clear window into school life" />
              <p className="lead-copy">{siteData.copy.about}</p>
              <div className="about-details">
                <div><span>01</span><p><strong>CBSE affiliated</strong><small>Affiliation No. {siteData.school.affiliationNumber}</small></p></div>
                <div><span>02</span><p><strong>Senior Secondary</strong><small>Independent school</small></p></div>
                <div><span>03</span><p><strong>Local presence</strong><small>Chhata–Barsana Road, Mathura</small></p></div>
              </div>
              <a className="text-link" href="#academics">Explore learning and school life <ArrowRight size={16} /></a>
            </div>
            <figure className="about-image-wrap">
              <Picture image={siteData.images.about} />
              <figcaption><span>Campus overview</span><strong>Space to learn, gather and participate</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="section experience-section" id="academics">
          <div className="shell">
            <div className="split-heading">
              <SectionHeading eyebrow="Learning & experience" title="Learning in action, beyond a single moment" />
              <p>{siteData.copy.experience}</p>
            </div>
            <div className="experience-grid">
              <article className="experience-card card-academics">
                <Picture image={siteData.images.academics} />
                <div className="card-shade" />
                <div className="card-copy"><span>01 / Academics</span><h3>Academic Engagement</h3><p>Moments of concentration, writing and classroom participation.</p></div>
              </article>
              <article className="experience-card card-leadership">
                <Picture image={siteData.images.leadership} />
                <div className="card-shade" />
                <div className="card-copy"><span>02 / Responsibility</span><h3>Student Leadership</h3><p>Opportunities to take responsibility and participate in school life.</p></div>
              </article>
              <article className="experience-card card-sports">
                <Picture image={siteData.images.sports} />
                <div className="card-shade" />
                <div className="card-copy"><span>03 / Activities</span><h3>Outdoor Participation</h3><p>Organised games, active participation and teamwork on the school lawn.</p></div>
              </article>
              <article className="experience-card card-projects">
                <Picture image={siteData.images.projects} />
                <div className="card-shade" />
                <div className="card-copy"><span>04 / Creativity</span><h3>Exhibitions & Project Work</h3><p>Student-made models presented as part of creative school engagement.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="facilities-section" id="school-life">
          <div className="shell">
            <SectionHeading eyebrow="Explore the environment" title="Four ways to experience the school" intro="A considered overview of the spaces, activities and occasions visible across school life." />
            <div className="facility-grid">
              {siteData.facilities.map((item) => {
                const Icon = iconMap[item.icon];
                return <article key={item.title}><div className="facility-icon"><Icon size={22} strokeWidth={1.7} /></div><h3>{item.title}</h3><p>{item.text}</p><a href="#gallery" aria-label={`Explore ${item.title}`}>Explore <ArrowRight size={14} /></a></article>;
              })}
            </div>
          </div>
        </section>

        <section className="culture-section">
          <div className="culture-hero">
            <Picture image={siteData.images.culture} />
            <div className="culture-overlay" />
            <div className="culture-copy shell">
              <p className="eyebrow"><span />Culture & expression</p>
              <h2>Shared stages.<br />Memorable moments.</h2>
              <p>{siteData.copy.culture}</p>
              <a className="button button-light" href="#gallery">View School Gallery <ArrowRight size={17} /></a>
            </div>
          </div>
          <div className="shell culture-pair">
            <article><Picture image={siteData.images.event} /><div><span>School events</span><h3>Celebrations that bring the community together</h3><p>Programmes and occasions presented through student participation.</p></div></article>
            <article><Picture image={siteData.images.campusLife} /><div><span>Campus life</span><h3>Colour, movement and the real school setting</h3><p>A glimpse of cultural activity with the school campus in view.</p></div></article>
          </div>
        </section>

        <section className="section gallery-section" id="gallery">
          <div className="shell">
            <div className="split-heading gallery-heading">
              <SectionHeading eyebrow="School gallery" title="A closer look at life on campus" />
              <p>Authentic moments from activities, presentations, games and cultural participation.</p>
            </div>
            <div className="gallery-grid">
              {siteData.gallery.map((item, index) => (
                <button key={item.original} className={`gallery-item item-${index + 1}`} type="button" onClick={(event) => openGallery(index, event.currentTarget)} aria-label={`Open image ${index + 1} of ${siteData.gallery.length}: ${item.alt}`}>
                  <Picture image={item} /><span className="gallery-zoom"><ZoomIn size={18} /> View</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="section notices-section" id="notices">
          <div className="shell">
            <div className="split-heading notices-heading">
              <SectionHeading eyebrow="Notices & updates" title="A clear place for school communication" />
              <div><span className="demo-label">Demo content</span><p>These sample cards illustrate how confirmed notices could be presented.</p></div>
            </div>
            <div className="notice-grid">
              {siteData.notices.map((notice, index) => (
                <article key={notice.type}><span className="notice-number">0{index + 1}</span><p className="notice-type">{notice.type}</p><h3>{notice.title}</h3><p>{notice.text}</p><span className="sample-chip">Sample notice</span></article>
              ))}
            </div>
            <button className="button button-navy notices-button" type="button" onClick={(event) => { returnFocusRef.current = event.currentTarget; setNoticesOpen(true); }}>View all sample notices <ArrowRight size={16} /></button>
          </div>
        </section>

        <section className="enquiry-section" id="enquiry">
          <div className="shell enquiry-grid">
            <div className="enquiry-copy">
              <p className="eyebrow"><span />Admission enquiry</p>
              <h2>Start a conversation about your child&apos;s next step.</h2>
              <p>Use this demonstration form to see how a simple admission enquiry could work. It does not transmit or store any information.</p>
              <div className="enquiry-contact"><Phone size={19} /><span><small>Call the school</small><a href={siteData.school.phoneHref}>{siteData.school.phoneDisplay}</a></span></div>
            </div>
            <form className="enquiry-form" noValidate onSubmit={handleSubmit} onChange={() => { setFormError(""); setFormSent(false); }}>
              <div className="form-heading"><span>Enquire About Admission</span><small>Frontend demo only</small></div>
              <div className="form-grid">
                <label><span>Parent / Guardian name</span><input name="guardian" type="text" autoComplete="name" placeholder="Your full name" /></label>
                <label><span>Student name</span><input name="student" type="text" autoComplete="off" placeholder="Student’s full name" /></label>
                <label><span>Class interested in</span><select name="classInterest" defaultValue=""><option value="" disabled>Select a class</option>{["Nursery / Pre-primary", "Class I–V", "Class VI–VIII", "Class IX–X", "Class XI–XII"].map((option) => <option key={option}>{option}</option>)}</select></label>
                <label><span>Phone</span><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="10–15 digit phone number" /></label>
                <label className="full-field"><span>Message</span><textarea name="message" rows={4} placeholder="How can the school help?" /></label>
              </div>
              {formError && <p className="form-message error" role="alert">{formError}</p>}
              {formSent && <p className="form-message success" role="status"><CheckCircle2 size={18} /> Demo submitted successfully. No data was sent or stored.</p>}
              <button className="button button-gold" type="submit">Submit <ArrowRight size={16} /></button>
              <p className="form-note">Demonstration form — no enquiry data is transmitted or retained.</p>
            </form>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-heading"><SectionHeading eyebrow="Find & contact us" title="Visit Shriji International School" intro="Use the supplied Maps location and Plus Code for this demonstration." /></div>
          <div className="shell contact-layout">
            <div className="contact-card">
              <div className="contact-row"><MapPin /><p><small>School location</small><strong>{siteData.school.address}</strong><span>Plus Code: {siteData.school.plusCode}</span></p></div>
              <div className="contact-row"><Phone /><p><small>Phone</small><a href={siteData.school.phoneHref}>{siteData.school.phoneDisplay}</a></p></div>
              <div className="contact-row"><Globe2 /><p><small>Current website</small><a href={siteData.school.domainUrl} target="_blank" rel="noopener noreferrer">{siteData.school.domainLabel} <ArrowUpRight size={14} /></a></p></div>
              <a className="button button-navy" href={siteData.school.directionsUrl} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={16} /></a>
              <div className="social-links">
                <a href={siteData.school.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Shriji International School on Instagram"><Camera size={18} /><span>{siteData.school.instagramLabel}</span></a>
                <a href={siteData.school.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Shriji International School on Facebook"><Globe2 size={18} /><span>Facebook</span></a>
              </div>
            </div>
            <div className="map-frame"><iframe title="Map showing Shriji International School location" src={siteData.school.mapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-main">
          <div className="footer-brand"><Picture image={siteData.images.logo} /><div><strong>{siteData.school.name}</strong><p>{siteData.school.values}</p></div></div>
          <div className="footer-links"><h3>Quick links</h3>{siteData.navigation.slice(1).map((item) => <a key={item.section} href={item.href}>{item.label}</a>)}</div>
          <div className="footer-details"><h3>School details</h3><p>CBSE Affiliation No. {siteData.school.affiliationNumber}</p><p>{siteData.school.level} • {siteData.school.type}</p><p>Managed by {siteData.school.management}</p></div>
        </div>
        <div className="shell footer-bottom"><p>{demoDisclaimer}</p><a href="#home">Back to top ↑</a></div>
      </footer>

      {galleryIndex !== null && (
        <div className="modal-backdrop" role="presentation">
          <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`Gallery image ${galleryIndex + 1} of ${siteData.gallery.length}`} ref={modalRef}>
            <button className="modal-close" type="button" onClick={closeModal} aria-label="Close gallery"><X /></button>
            <button className="gallery-arrow previous" type="button" onClick={() => moveGallery(-1)} aria-label="Previous image"><ChevronLeft /></button>
            <Picture image={siteData.gallery[galleryIndex]} eager />
            <button className="gallery-arrow next" type="button" onClick={() => moveGallery(1)} aria-label="Next image"><ChevronRight /></button>
            <div className="gallery-caption"><span>{String(galleryIndex + 1).padStart(2, "0")} / {String(siteData.gallery.length).padStart(2, "0")}</span><p>{siteData.gallery[galleryIndex].alt}</p></div>
          </div>
        </div>
      )}

      {noticesOpen && (
        <div className="modal-backdrop" role="presentation">
          <div className="notices-modal" role="dialog" aria-modal="true" aria-labelledby="notices-modal-title" ref={modalRef}>
            <button className="modal-close dark" type="button" onClick={closeModal} aria-label="Close notices"><X /></button>
            <span className="demo-label">Demo content</span><h2 id="notices-modal-title">Sample notice centre</h2><p>These examples demonstrate a future notice layout. They are not current school announcements.</p>
            <div className="modal-notice-list">{siteData.notices.map((notice) => <article key={notice.type}><span>{notice.type}</span><h3>{notice.title}</h3><p>{notice.text}</p><small>Sample notice</small></article>)}</div>
            <button className="button button-navy" type="button" onClick={closeModal}>Close sample notices</button>
          </div>
        </div>
      )}
    </>
  );
}
