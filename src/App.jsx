import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const navItems = [
  ["About", "about"],
  ["Services", "services"],
  ["Experience", "experience"],
  ["Work", "work"],
  ["Process", "process"],
];

const services = [
  {
    title: "Administrative Support",
    description: "Keep the business organized behind the scenes.",
    items: ["Data entry", "Documentation", "Information organization", "Record maintenance", "General virtual assistance"],
  },
  {
    title: "Customer Support",
    description: "Give your customers professional and responsive assistance.",
    items: ["Customer inquiries", "Email support", "Issue resolution", "Follow-ups", "Account assistance"],
  },
  {
    title: "CRM & Data Management",
    description: "Keep information accurate, organized, and accessible.",
    items: ["CRM updates", "Customer records", "Case documentation", "Information verification", "Account updates"],
  },
  {
    title: "Email Management",
    description: "Keep your inbox organized and communication moving.",
    items: ["Inbox organization", "Email categorization", "Routine responses", "Follow-ups", "Message prioritization"],
  },
  {
    title: "Social Media & Canva",
    description: "Create simple, professional content for your online presence.",
    items: ["Canva graphics", "Social media posts", "Content creation", "Promotional graphics", "Basic social assistance"],
  },
];

const strengths = [
  ["Real customer experience", "Direct experience helping customers in fast-paced professional environments."],
  ["Detail-oriented", "Careful documentation, information verification, and accurate record handling."],
  ["Adaptable", "Experience across different industries, systems, processes, and customer needs."],
  ["Privacy-conscious", "Trusted with sensitive financial and customer information under security procedures."],
];

const processSteps = [
  ["Discover", "Understand your business and the task."],
  ["Organize", "Prioritize information and requirements."],
  ["Execute", "Complete the task accurately and efficiently."],
  ["Review", "Check the work carefully before delivery."],
  ["Communicate", "Keep you informed and clarify what is needed."],
  ["Deliver", "Provide organized, completed work."],
];

const tools = [
  ["Administrative", "Data Entry", "Documentation", "Email Management", "Administrative Support"],
  ["Customer Support", "Customer Service", "Issue Resolution", "Account Support", "Communication"],
  ["Digital", "Canva", "Social Media", "Content Creation", "CRM"],
  ["Creative", "FL Studio", "Audio Editing", "Audio Mixing", "Music Production"],
];

const faqItems = [
  ["What services do you offer?", "Administrative support, customer support, CRM and data entry, email management, and Canva or social media assistance."],
  ["Are you available for remote work?", "Yes. I am based in the Philippines and available for remote opportunities."],
  ["Can you work with recurring tasks?", "Yes. Recurring administrative, customer-support, data, and digital tasks can be organized into a consistent workflow."],
  ["Do you handle sensitive information?", "My background includes working with sensitive customer and financial information while following privacy and security procedures."],
  ["How can I contact you?", "Email jadrpanes17@gmail.com or call +63 945 274 9552."],
];

const projectTabs = [
  ["support", "Customer support"],
  ["crm", "CRM & data"],
  ["email", "Email management"],
  ["social", "Social & Canva"],
];

function useRevealAnimations() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function Brand({ footer = false }) {
  return (
    <a className={`brand${footer ? " brand-footer" : ""}`} href="#home" aria-label="Jadr Panes, home">
      <span className="brand-mark">JP</span>
      <span className="brand-copy">
        <strong>Jadr Panes</strong>
        <small>Virtual Assistant</small>
      </span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const sidebarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const sidebarItems = [...navItems, ["Contact", "contact"]];

  useEffect(() => {
    let frame;
    const updateActiveSection = () => {
      const sections = document.querySelectorAll("main > section[id]");
      let current = "home";
      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) current = section.id;
      });
      setActiveSection(current);
    };
    const handleScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActiveSection);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    if (!menuOpen) return () => document.body.classList.remove("menu-open");

    sidebarRef.current?.querySelector("a")?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
      if (event.key !== "Tab") return;
      const controls = sidebarRef.current?.querySelectorAll("a, button");
      if (!controls?.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event) => { if (event.matches) setMenuOpen(false); };
    desktopQuery.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", closeOnDesktop);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <div className="mobile-bar">
        <Brand />
        <button ref={menuButtonRef} className="sidebar-toggle" type="button" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="sidebar" onClick={() => setMenuOpen(true)}><span /><span /></button>
      </div>
      {menuOpen && <button className="sidebar-backdrop" type="button" aria-label="Close navigation" tabIndex={-1} onClick={() => setMenuOpen(false)} />}
      <header ref={sidebarRef} className={`site-sidebar${menuOpen ? " is-open" : ""}`} id="sidebar">
        <div className="sidebar-top"><Brand /><button className="sidebar-close" type="button" aria-label="Close navigation" onClick={() => setMenuOpen(false)}>×</button></div>
        <nav className="sidebar-nav" aria-label="Primary navigation">
          {sidebarItems.map(([label, id], index) => (
            <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>
              <span className="sidebar-number">{String(index + 1).padStart(2, "0")}</span><span className="sidebar-rule" /><span>{label}</span><span className="sidebar-link-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <p className="sidebar-status"><span className="status-dot" />Open to remote opportunities</p>
          <a className="button button-accent" href="#contact" onClick={() => setMenuOpen(false)}>Let’s work together <span aria-hidden="true">↗</span></a>
          <p className="sidebar-location">Las Piñas City, Philippines</p>
          <div className="sidebar-direct"><a href="mailto:jadrpanes17@gmail.com">Email</a><a href="tel:+639452749552">Call</a><a href="#home" onClick={() => setMenuOpen(false)}>Back to top ↑</a></div>
        </div>
      </header>
    </>
  );
}

function SectionHeading({ number, title, emphasis, text, className = "", headingId }) {
  return (
    <div className={`section-heading reveal ${className}`}>
      <p className="section-number">{number}</p>
      <h2 id={headingId}>{title}{emphasis && <> <em>{emphasis}</em></>}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Services() {
  return (
    <section className="services section-cream" id="services" aria-labelledby="services-title">
      <div className="page-shell">
        <div className="section-heading reveal">
          <p className="section-number">04 / Services</p>
          <h2 id="services-title">How I can support <em>your business</em></h2>
          <p>Choose focused help for one workflow or combine services into consistent day-to-day support.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-card reveal" key={service.title}>
              <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
              <ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section-dark" id="experience" aria-labelledby="experience-title">
      <div className="page-shell experience-grid">
        <div className="experience-heading reveal">
          <p className="section-number">06 / Experience</p>
          <h2 id="experience-title">My Professional <em>Journey</em></h2>
          <p>Customer-focused roles where good communication and accurate documentation matter every day.</p>
        </div>
        <div className="timeline">
          <article className="timeline-item reveal">
            <div className="timeline-meta"><time>2026 — Present</time><span>Automotive Case Management</span></div>
            <div>
              <h3>Case Manager</h3>
              <p className="company">Teleperformance · Stellantis FCA</p>
              <p>I manage customer cases involving vehicle recalls, service concerns, complaints, and requests—coordinating with internal departments so each case can be reviewed, progressed, and resolved.</p>
              <ul><li>Case intake and documentation</li><li>Information gathering and review</li><li>Department escalation</li><li>Customer updates and next steps</li></ul>
            </div>
          </article>
          <article className="timeline-item reveal">
            <div className="timeline-meta"><time>2024 — 2026</time><span>Financial Account Support</span></div>
            <div>
              <h3>Customer Expert</h3>
              <p className="company">Coforge BPS · Fifth Third Bank</p>
              <p>Provided phone-based support for everyday banking needs, account services, transactions, card requests, disputes, and online banking concerns while following security procedures.</p>
              <ul><li>Account inquiries and updates</li><li>Card and funds requests</li><li>Dispute documentation</li><li>Online banking support</li></ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function ProjectSupport() {
  return (
    <>
      <div className="project-copy">
        <p className="project-label">Automotive Service & Recall Case</p>
        <h3>Customer Support Workflow</h3>
        <p>A sample case showing a customer concern moving from inquiry and research through documentation, follow-up, and resolution.</p>
        <ol className="workflow-list"><li>Inquiry</li><li>Research</li><li>Response</li><li>Document</li><li>Follow-up</li><li>Resolve</li></ol>
        <p className="project-note">Personal demonstration project. All customer information is fictional.</p>
      </div>
      <div className="ticket-mockup" aria-label="Sample customer service ticket">
        <div className="mockup-top"><span>Case / AUTO-2026-0148</span><span className="pill pill-orange">Escalated</span></div>
        <div className="ticket-body"><span className="ticket-icon">!</span><div><small>Customer Concern</small><h4>Vehicle Recall</h4><p>Customer has been unable to arrange the required repair and is requesting support.</p></div></div>
        <div className="ticket-fields"><p><small>Priority</small>Standard</p><p><small>Status</small>For review</p><p><small>Next step</small>Department update</p></div>
        <div className="ticket-progress" aria-hidden="true"><span /><span /><span /><span className="muted" /></div>
      </div>
    </>
  );
}

function ProjectCrm() {
  return (
    <>
      <div className="project-copy">
        <p className="project-label">Customer Case Tracking Dashboard</p>
        <h3>CRM & Data Organization</h3>
        <p>A clear way for a service business to record inquiries, categorize requests, document actions, track follow-ups, and keep customer records current.</p>
        <ul className="skill-tags"><li>CRM</li><li>Data entry</li><li>Documentation</li><li>Follow-up tracking</li></ul>
        <p className="project-note">Sample data for demonstration purposes only.</p>
      </div>
      <div className="dashboard-mockup" aria-label="Sample CRM dashboard">
        <div className="dashboard-stats"><p><strong>12</strong><small>Total records</small></p><p><strong>4</strong><small>Pending</small></p><p><strong>5</strong><small>Completed</small></p><p><strong>3</strong><small>Follow-ups</small></p></div>
        <div className="data-table" role="table" aria-label="Sample customer records">
          <div className="data-row data-head" role="row"><span>Customer</span><span>Request</span><span>Status</span></div>
          <div className="data-row" role="row"><span>Maria Santos</span><span>Service inquiry</span><span className="pill pill-orange">Pending</span></div>
          <div className="data-row" role="row"><span>James Miller</span><span>Account request</span><span className="pill pill-blue">Follow-up</span></div>
          <div className="data-row" role="row"><span>Anna Cruz</span><span>General inquiry</span><span className="pill pill-green">Complete</span></div>
          <div className="data-row" role="row"><span>Daniel Reed</span><span>Complaint</span><span className="pill pill-orange">Pending</span></div>
        </div>
      </div>
    </>
  );
}

function ProjectEmail() {
  return (
    <>
      <div className="project-copy">
        <p className="project-label">Inbox Organization & Prioritization</p>
        <h3>Email Management</h3>
        <p>A repeatable inbox system that identifies urgency, groups conversations by next action, and keeps important customer requests from being overlooked.</p>
        <ol className="workflow-list"><li>Review</li><li>Prioritize</li><li>Categorize</li><li>Respond</li><li>Follow up</li><li>Organize</li></ol>
        <p className="project-note">Sample emails for demonstration purposes only.</p>
      </div>
      <div className="inbox-mockup" aria-label="Sample organized inbox">
        <div className="inbox-sidebar"><strong>Inbox</strong><span>Urgent <b>2</b></span><span>Follow-up <b>5</b></span><span>General <b>8</b></span><span>Completed</span></div>
        <div className="email-list">
          <div className="email-item"><span className="priority red" /><p><strong>Service issue requires immediate assistance</strong><small>Review and respond immediately</small></p><time>9:16</time></div>
          <div className="email-item"><span className="priority orange" /><p><strong>Following up on my previous request</strong><small>Review conversation and update</small></p><time>8:42</time></div>
          <div className="email-item"><span className="priority blue" /><p><strong>Question about your services</strong><small>General inquiry</small></p><time>Mon</time></div>
          <div className="email-item"><span className="priority green" /><p><strong>Thank you for resolving my concern</strong><small>Ready to archive</small></p><time>Fri</time></div>
        </div>
      </div>
    </>
  );
}

function ProjectSocial() {
  const [sampleType, setSampleType] = useState("canva");
  const [activeImage, setActiveImage] = useState(null);
  const closeButtonRef = useRef(null);
  const isCanva = sampleType === "canva";
  const samples = [1, 2, 3, 4].map((number) => ({
    src: isCanva ? `/${number}.png` : `/social-media-sample/${number}.png`,
    alt: isCanva
      ? `Canva promotional graphic design sample ${number}`
      : `Social media content design sample ${number}`,
    label: `${isCanva ? "Canva design" : "Social media sample"} ${String(number).padStart(2, "0")}`,
  }));

  useEffect(() => {
    if (activeImage === null) return undefined;
    const previousFocus = document.activeElement;
    document.body.classList.add("lightbox-open");
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActiveImage(null);
      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [activeImage]);

  function changeSampleType(type) {
    setActiveImage(null);
    setSampleType(type);
  }

  return (
    <>
      <div className="project-copy">
        <p className="project-label">Social Media Content & Promotional Design</p>
        <h3>Social Media & Canva</h3>
        <p>Sample promotional graphics and social layouts demonstrating hierarchy, typography, product presentation, visual consistency, and content organization.</p>
        <ul className="skill-tags"><li>Canva</li><li>Graphic design</li><li>Content planning</li><li>Visual communication</li></ul>
        <p className="project-note">Personal demonstration work. Featured brands and offers are fictional.</p>
      </div>
      <div className="sample-gallery">
        <div className="gallery-switch" aria-label="Choose a sample gallery">
          <button type="button" className={isCanva ? "is-active" : ""} aria-pressed={isCanva} onClick={() => changeSampleType("canva")}>
            Canva designs <span>04</span>
          </button>
          <button type="button" className={!isCanva ? "is-active" : ""} aria-pressed={!isCanva} onClick={() => changeSampleType("social")}>
            Social media samples <span>04</span>
          </button>
        </div>
        <div className={`gallery-grid${isCanva ? "" : " gallery-grid-social"}`} key={sampleType}>
          {samples.map((sample) => (
            <figure key={sample.src}>
              <button className="gallery-image-button" type="button" onClick={() => setActiveImage(samples.indexOf(sample))} aria-label={`Enlarge ${sample.label}`}>
                <img src={sample.src} alt={sample.alt} loading="lazy" />
                <span className="zoom-hint" aria-hidden="true">View ↗</span>
              </button>
              <figcaption>{sample.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {activeImage !== null && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${samples[activeImage].label} enlarged`} onClick={(event) => { if (event.target === event.currentTarget) setActiveImage(null); }}>
          <button ref={closeButtonRef} className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close enlarged image">×</button>
          <img className="lightbox-image" src={samples[activeImage].src} alt={samples[activeImage].alt} />
        </div>,
        document.body,
      )}
    </>
  );
}

const projectContent = { support: ProjectSupport, crm: ProjectCrm, email: ProjectEmail, social: ProjectSocial };

function Portfolio() {
  const [activeProject, setActiveProject] = useState("support");
  const tabRefs = useRef([]);
  const ActiveProject = projectContent[activeProject];

  function handleTabKeyDown(event, index) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % projectTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + projectTabs.length) % projectTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = projectTabs.length - 1;
    setActiveProject(projectTabs[nextIndex][0]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="work section-light" id="work" aria-labelledby="work-title">
      <div className="page-shell">
        <div className="section-heading work-heading reveal">
          <p className="section-number">07 / Portfolio</p>
          <h2 id="work-title">A look at <em>what I can do</em></h2>
          <p>Demonstration projects that show how I think, organize information, and support day-to-day business needs.</p>
        </div>
        <div className="project-tabs reveal">
          <div className="tab-list" role="tablist" aria-label="Portfolio projects">
            {projectTabs.map(([id, label], index) => (
              <button
                key={id}
                ref={(node) => { tabRefs.current[index] = node; }}
                role="tab"
                aria-selected={activeProject === id}
                aria-controls={`project-${id}`}
                id={`tab-${id}`}
                tabIndex={activeProject === id ? 0 : -1}
                onClick={() => setActiveProject(id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              ><span>{String(index + 1).padStart(2, "0")}</span> {label}</button>
            ))}
          </div>
          <article className={`project-panel${activeProject === "social" ? " project-panel-gallery" : ""}`} id={`project-${activeProject}`} role="tabpanel" aria-labelledby={`tab-${activeProject}`}>
            <ActiveProject />
          </article>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openItem, setOpenItem] = useState(0);
  return (
    <section className="faq section-light" id="faq" aria-labelledby="faq-title">
      <div className="page-shell faq-grid">
        <div className="faq-heading reveal">
          <p className="section-number">12 / FAQ</p>
          <h2 id="faq-title">Frequently Asked <em>Questions</em></h2>
          <p>Something else in mind? Send me an email and tell me what support would make your week easier.</p>
          <a className="text-link" href="mailto:jadrpanes17@gmail.com">Email Jadr <span aria-hidden="true">↗</span></a>
        </div>
        <div className="faq-list">
          {faqItems.map(([question, answer], index) => {
            const isOpen = openItem === index;
            return (
              <article className={`faq-item reveal${isOpen ? " is-open" : ""}`} key={question}>
                <h3><button type="button" aria-expanded={isOpen} aria-controls={`faq-panel-${index}`} onClick={() => setOpenItem(isOpen ? -1 : index)}>{question}<span aria-hidden="true">+</span></button></h3>
                <div className="faq-answer" id={`faq-panel-${index}`} hidden={!isOpen}><p>{answer}</p></div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="final-cta section-accent" aria-labelledby="final-cta-title">
      <div className="page-shell">
        <p className="section-number">13 / Final CTA</p>
        <h2 id="final-cta-title">Have tasks that are taking too much <em>of your time?</em></h2>
        <p className="final-cta-lede">Let me help you get them done.</p>
        <p>Whether you need help with:</p>
        <ul className="skill-tags"><li>Customer Support</li><li>Administrative Tasks</li><li>CRM & Data</li><li>Email Management</li><li>Canva & Social Media</li></ul>
        <p>Let’s talk.</p>
        <a className="button button-dark" href="#contact">Let’s work together <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus("Please complete the required fields.");
      return;
    }
    const data = new FormData(form);
    const subject = `Portfolio inquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Support needed: ${data.get("service")}`,
      "",
      data.get("message"),
    ].join("\n");
    setStatus("Opening your email app with the message ready to send.");
    window.location.href = `mailto:jadrpanes17@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section className="contact section-accent" id="contact" aria-labelledby="contact-title">
      <div className="page-shell contact-grid">
        <div className="contact-copy reveal">
          <p className="section-number">14 / Contact</p>
          <h2 id="contact-title">Let’s work <em>together.</em></h2>
          <div className="direct-contact">
            <a href="mailto:jadrpanes17@gmail.com"><small>Email</small><span>jadrpanes17@gmail.com</span></a>
            <a href="tel:+639452749552"><small>Call</small><span>+63 945 274 9552</span></a>
            <p><small>Location</small><span>Las Piñas City, Philippines</span></p>
          </div>
        </div>
        <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>Name<input type="text" name="name" autoComplete="name" required /></label>
            <label>Email<input type="email" name="email" autoComplete="email" required /></label>
          </div>
          <label>Company / Business<input type="text" name="company" autoComplete="organization" /></label>
          <label>What can I help you with?
            <select name="service" defaultValue="Administrative Support">
              {services.map((service) => <option key={service.title} value={service.title}>{service.title}</option>)}
              <option value="Other Support">Other Support</option>
            </select>
          </label>
          <label>Message<textarea name="message" rows="4" required /></label>
          <button className="button button-dark form-submit" type="submit">Send message <span aria-hidden="true">↗</span></button>
          <p className="form-status" role="status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-dark">
      <div className="page-shell footer-grid">
        <div><Brand footer /><p>Reliable support for organized, responsive, and efficient businesses.</p></div>
        <nav aria-label="Footer navigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}<a href="#contact">Contact</a></nav>
        <div className="footer-contact"><a href="mailto:jadrpanes17@gmail.com">jadrpanes17@gmail.com</a><a href="tel:+639452749552">+63 945 274 9552</a><span>Las Piñas City, Philippines</span></div>
      </div>
      <div className="footer-bottom page-shell"><span>© {new Date().getFullYear()} Jadr Panes. All rights reserved.</span><a href="#home">Back to top ↑</a></div>
    </footer>
  );
}

export default function App() {
  useRevealAnimations();

  useEffect(() => {
    if (!window.location.hash) return;
    const timer = window.setTimeout(() => {
      document.querySelector(window.location.hash)?.scrollIntoView();
    }, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <Header />
      <main id="main">
        <section className="hero section-dark" id="home" aria-labelledby="hero-title">
          <div className="hero-grid page-shell">
            <div className="hero-copy reveal">
              <p className="eyebrow">Virtual assistant <span>•</span> Customer support <span>•</span> Administrative support</p>
              <h1 id="hero-title">The reliable support <em>behind your business.</em></h1>
              <p className="hero-intro">Hi, I'm Jadr Panes, a Virtual Assistant with professional experience in customer service, account support, administrative assistance, CRM management, data entry, email management, and digital content support.</p>
              <div className="hero-actions"><a className="button button-accent" href="#services">View my services <span aria-hidden="true">↓</span></a><a className="button button-ghost" href="#contact">Let’s work together <span aria-hidden="true">↗</span></a></div>
              <ul className="hero-notes" aria-label="Quick details"><li>Philippines-based</li><li>Available remotely</li><li>Privacy-conscious</li></ul>
            </div>
            <div className="hero-visual reveal">
              <div className="hero-image-frame"><img src="/jadr-photos/3.png" alt="Portrait of Jadr Panes wearing sunglasses against a pink background" /></div>
              <div className="hero-stamp" aria-hidden="true"><span>Organized</span><strong>Ready</strong><span>Responsive</span></div>
              <div className="availability-card"><span className="status-dot" /><p><small>Current status</small><strong>Open to remote opportunities</strong></p></div>
            </div>
          </div>
          <a className="scroll-cue" href="#credentials">Scroll to explore <span aria-hidden="true">↓</span></a>
        </section>

        <section className="credentials" id="credentials" aria-label="Quick credentials">
          <div className="credential-track">
            <div><span>01</span><strong>Customer support</strong><small>Automotive + Financial Accounts</small></div>
            <div><span>02</span><strong>Administrative</strong><small>CRM + Data + Documentation</small></div>
            <div><span>03</span><strong>Digital</strong><small>Canva + Social Media + Content</small></div>
            <div><span>04</span><strong>Remote</strong><small>Las Piñas, Philippines</small></div>
          </div>
        </section>

        <section className="about section-light" id="about" aria-labelledby="about-title">
          <div className="page-shell about-grid">
            <div className="section-intro reveal"><p className="section-number">03 / About Me</p><h2 id="about-title">A little <em>about me</em></h2></div>
            <div className="about-copy reveal"><p className="lede">Professional experience. Practical support. A client-first mindset.</p><p>I’m Jadr Panes, a Virtual Assistant with a professional background in customer service and account support. I’ve supported automotive and financial accounts where accuracy, communication, documentation, privacy, and problem-solving are essential.</p><p>I now bring those skills into virtual assistance—helping businesses manage everyday tasks, customer communication, information, and digital support with care.</p><a className="text-link" href="#experience">See my professional journey <span aria-hidden="true">↘</span></a></div>
            <figure className="about-photo reveal"><img src="/jadr-photos/5.png" alt="Portrait of Jadr Panes against a vivid magenta background" loading="lazy" /><figcaption>Based in Las Piñas City<br />Working remotely worldwide</figcaption></figure>
          </div>
        </section>

        <Services />

        <section className="why section-accent" aria-labelledby="why-title">
          <div className="page-shell">
            <div className="section-heading reveal"><p className="section-number">05 / Why Jadr?</p><h2 id="why-title">More than task support. <em>A reliable partner.</em></h2></div>
            <div className="why-grid">{strengths.map(([title, text], index) => <article className="reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
          </div>
        </section>

        <Experience />
        <Portfolio />

        <section className="process section-cream" id="process" aria-labelledby="process-title">
          <div className="page-shell process-grid">
            <div className="process-heading reveal"><p className="section-number">08 / My Work Process</p><h2 id="process-title">Simple process. <em>Reliable execution.</em></h2><p>Clear steps keep the work organized and make collaboration easy from the first conversation to final delivery.</p><a className="button button-dark" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
            <ol className="process-list">{processSteps.map(([title, text], index) => <li className="reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ol>
          </div>
        </section>

        <section className="toolkit section-light" aria-labelledby="tools-title">
          <div className="page-shell">
            <SectionHeading number="09 / Tools & Skills" title="Tools &" emphasis="Skills" headingId="tools-title" />
            <div className="tool-groups">{tools.map(([group, ...items]) => <article className="reveal" key={group}><span>{group}</span>{items.map((item) => <p key={item}>{item}</p>)}</article>)}</div>
            <section className="audience-strip reveal" aria-labelledby="audience-title"><div><p className="section-number">10 / Who I Can Help</p><h2 id="audience-title">Who can I help?</h2></div><div><span>Small Business Owners</span><span>Online Businesses/Influencers</span><span>Service-Based Businesses</span><span>Entrepreneurs</span></div></section>
          </div>
        </section>

        <section className="testimonials section-dark" aria-labelledby="testimonials-title">
          <div className="page-shell">
            <SectionHeading number="11 / Testimonials" title="What People" emphasis="Say" headingId="testimonials-title" />
            <div className="quote-grid">
              <figure className="reveal"><blockquote>“Jadr is easy to work with and takes his responsibilities seriously. He stays patient when handling customer concerns, pays attention to details, and makes sure cases are properly documented and handled.”</blockquote><figcaption><strong>John Paul Vito</strong><span>Supervisor · Teleperformance — Stellantis FCA</span></figcaption></figure>
              <figure className="reveal"><blockquote>“Jadr is patient and professional when assisting customers with banking concerns. He communicates well, understands what customers need, and pays attention to accuracy.”</blockquote><figcaption><strong>Katherine Gamboa</strong><span>Fifth Third Bank Account Supervisor · Coforge BPS</span></figcaption></figure>
            </div>
          </div>
        </section>

        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
