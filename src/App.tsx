import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { ArrowRight, Check, ChevronDown, ChevronRight, CircleX, Menu, ShieldCheck, X } from 'lucide-react';

const services = [
  { title: 'AI Solutions', path: '/services/ai-solutions', intro: 'Practical automation for the work your team repeats every day.', icon: '01' },
  { title: 'Custom Software', path: '/services/custom-software', intro: 'Focused digital products that fit your process instead of forcing a new one.', icon: '02' },
  { title: 'CRM', path: '/services/crm', intro: 'Clearer customer operations across the tools your business already uses.', icon: '03' },
];

const aiIndustries = [
  {
    id: 'healthcare', title: 'Healthcare', intro: 'Give patients quicker answers while your staff keeps control of the moments that need care.', items: [
      ['AI Receptionist', 'Answers calls 24/7, handles common questions, and routes urgent calls to staff.', 'The voice agent follows a clear call guide, checks approved information, and transfers anything sensitive to a person.'],
      ['AI Appointment Booking Agent', 'Books, reschedules, and cancels appointments through calls, chat, or text.', 'It connects to the clinic calendar, confirms the right details, and sends the patient a clear next step.'],
      ['Patient Intake and Follow-Up Automation', 'Digital intake forms, reminders, no-show reduction, and recall messages.', 'Patients receive the right prompt at the right time, while staff can see incomplete forms and follow-up tasks.'],
    ],
  },
  {
    id: 'law-firms', title: 'Law Firms', intro: 'Reduce intake and document work without taking judgment out of the hands of your legal team.', items: [
      ['24/7 Client Intake and Speed-to-Lead', 'Responds to new inquiries within seconds and books consultations.', 'It screens inquiries against your criteria, gathers case details, and sends qualified opportunities to your team.'],
      ['Document Drafting and AI Redlining', 'Checks contracts against your playbook and helps produce first drafts.', 'It flags risky terms, suggests alternative clauses, and works inside Word or web tools for review by your lawyers.'],
      ['Verified Legal Research and RAG Assistants', 'Answers plain-English questions from verified legal sources with citations.', 'Retrieval is limited to approved case law, statutes, and regulations, helping reduce made-up citations.'],
      ['Deposition and Discovery Summarization', 'Turns large PDF bundles into chronologies and focused summaries.', 'It reads records, transcripts, and email threads, flags contradictions, and creates page-by-page or topic summaries.'],
    ],
  },
  {
    id: 'real-estate', title: 'Real Estate', intro: 'Keep leads moving and transactions organized while agents spend more time with clients.', items: [
      ['Instant Lead Response and Nurture', 'Captures leads from portals, websites, and ads, then replies in seconds.', 'It qualifies budget, timeline, and preferences, follows up automatically, and pushes the conversation to your CRM.'],
      ['Showing and Viewing Scheduler', 'Books property viewings and keeps agent calendars in sync.', 'Confirmations, reminders, and reschedules happen automatically so everyone knows the next appointment.'],
      ['Transaction and Document Coordination', 'Tracks deadlines, documents, and questions across a transaction.', 'It checks what is missing, summarizes leases and contracts, and sends reminders to the right people.'],
    ],
  },
];

const crmItems = [
  ['Salesforce', 'Implementation, customization, and integrations that give sales teams a cleaner place to work.'],
  ['SugarCRM', 'Workflows, integrations, and AI-ready setups built around how your team sells and supports.'],
  ['Microsoft Dynamics 365', 'CRM and ERP customization for connected operations and better handoffs.'],
  ['HubSpot', 'Custom templates, modules, and integrations that keep marketing, sales, and service aligned.'],
  ['Odoo', 'ERP modules, workflows, and integrations for the day-to-day work behind your business.'],
  ['X2CRM', 'Lead management and workflow automation for teams that need a simpler operating rhythm.'],
];

function Logo(): JSX.Element {
  return <Link to="/" className="brand" aria-label="Selulabs home"><img src="/assets/images/logo.png" alt="" /><span><b>Selu</b><strong>Labs</strong></span></Link>;
}

function Layout({ children, onTalk }: { children: ReactNode; onTalk: () => void }): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { setMenuOpen(false); setServicesOpen(false); window.scrollTo(0, 0); }, [location.pathname]);
  return <div className="site-shell">
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/" end>Home</NavLink>
          <div className="nav-dropdown">
            <button onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>Services <ChevronDown size={15} /></button>
            <div className={servicesOpen ? 'dropdown-menu visible' : 'dropdown-menu'}>{services.map((service) => <Link key={service.path} to={service.path}>{service.title}<ChevronRight size={15} /></Link>)}</div>
          </div>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <button className="nav-cta" onClick={onTalk}>Let’s Talk <ArrowRight size={16} /></button>
        </nav>
      </div>
    </header>
    <main>{children}</main>
    <Footer onTalk={onTalk} />
  </div>;
}

function Footer({ onTalk }: { onTalk: () => void }): JSX.Element {
  return <footer className="footer"><div className="container"><div className="footer-cta"><div><p className="eyebrow">A clear next step</p><h2>Let’s make the work easier.</h2><p>Book a free 15-minute call and tell us where your team is getting stuck.</p></div><button className="button button-light" onClick={onTalk}>Book a call <ArrowRight size={17} /></button></div><div className="footer-grid"><div><Logo /><p className="footer-copy">Selulabs builds focused AI automation and software for teams that need practical progress.</p><p className="footer-contact"><a href="mailto:info@selulabs.com">info@selulabs.com</a><a href="tel:4793798502">479-379-8502</a>United States</p></div><div><h3>Explore</h3><Link to="/">Home</Link><Link to="/about">About</Link><Link to="/contact">Contact</Link></div><div><h3>Services</h3>{services.map((service) => <Link key={service.path} to={service.path}>{service.title}</Link>)}</div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Selulabs. All rights reserved.</span><span><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms and Conditions</Link></span></div></div></footer>;
}

function SectionIntro({ eyebrow, title, children, dark = false }: { eyebrow?: string; title: string; children?: ReactNode; dark?: boolean }): JSX.Element { return <div className={dark ? 'section-intro dark' : 'section-intro'}>{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2>{children && <div className="intro-copy">{children}</div>}</div>; }
function ButtonLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }): JSX.Element { return <Link className={light ? 'button button-light' : 'button'} to={to}>{children}<ArrowRight size={17} /></Link>; }

function Home({ onTalk }: { onTalk: () => void }): JSX.Element {
  return <>
    <section className="hero hero-with-background"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow">AI automation · software · CRM</p><h1>Build a business that moves with <em>clarity.</em></h1><p className="hero-lead">Selulabs helps healthcare, law, and real estate teams reduce busywork with AI and software built around the way they already work.</p><div className="hero-actions"><button className="button" onClick={onTalk}>Let’s Talk <ArrowRight size={17} /></button><ButtonLink to="/services" light>View services</ButtonLink></div><div className="hero-note"><ShieldCheck size={19} /><span>Privacy-minded by design. NDAs and data agreements when needed.</span></div></div></div></section>
    <section className="section services-preview"><div className="container"><SectionIntro eyebrow="What we do" title="Practical systems for work that matters."><p>We start with the bottleneck, then build the smallest useful solution that helps your people do better work.</p></SectionIntro><div className="service-list">{services.map((service) => <Link className="service-row" to={service.path} key={service.path}><span className="service-number">{service.icon}</span><div><h3>{service.title}</h3><p>{service.intro}</p></div><ArrowRight /></Link>)}</div></div></section>
    <section className="section industries-section"><div className="container"><SectionIntro eyebrow="Built for your world" title="Industry context makes the difference."><p>Good automation respects the details of your work. Selulabs focuses on three industries where a thoughtful handoff can change the day.</p></SectionIntro><div className="industry-grid"><div className="industry-feature"><span>01</span><h3>Healthcare</h3><p>Give patients quick answers and give staff more time for care.</p></div><div className="industry-feature active"><span>02</span><h3>Law firms</h3><p>Move intake, research, and document work forward with review built in.</p></div><div className="industry-feature"><span>03</span><h3>Real estate</h3><p>Respond to leads faster and keep every transaction detail visible.</p></div></div></div></section>
    <section className="section process-section"><div className="container"><SectionIntro eyebrow="How we work" title="Small steps. Useful outcomes." /><div className="process-grid">{[['01','Discover','We map the current process, the friction, and the result you need.'],['02','Build','We shape a focused first version around real work and real feedback.'],['03','Launch','We put it into practice with clear ownership and a simple handoff.'],['04','Support','We stay close, learn what changes, and keep the system useful.']].map(([num,title,text]) => <div className="process-item" key={num}><span>{num}</span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>
    <section className="section privacy-band"><div className="container privacy-inner"><ShieldCheck size={34} /><div><p className="eyebrow">Careful by default</p><h2>Privacy and confidentiality are part of the brief.</h2><p>We build with privacy and confidentiality in mind. When needed, we sign NDAs and data agreements before work begins. We do not claim compliance certifications we do not hold.</p></div></div></section>
    <section className="section final-cta"><div className="container"><p className="eyebrow">Ready when you are</p><h2>Book a free 15-minute call.</h2><p>Bring one process that is slowing your team down. We’ll talk through what a sensible next step could look like.</p><button className="button" onClick={onTalk}>Start the conversation <ArrowRight size={17} /></button></div></section>
  </>;
}

function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: 'services' | 'about' | 'contact' | 'ai-solutions' | 'custom-software' | 'crm' }): JSX.Element { return <section className={image ? `page-hero page-hero-${image}` : 'page-hero'}><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>; }
function ServiceCardImage({ path }: { path: string }): JSX.Element {
  if (path === '/services/ai-solutions') {
    return <img src="/assets/images/healthcare.jpeg" alt="Doctor speaking with a patient in a clinic" loading="lazy" />;
  }
  if (path === '/services/custom-software') {
    return <img src="/assets/images/hero.jpeg" alt="Colleagues collaborating around a laptop" loading="lazy" />;
  }
  return <img src="/assets/images/crm.jpeg" alt="Colleagues reviewing customer data together" loading="lazy" />;
}
function Services(): JSX.Element { return <><PageHero eyebrow="Services" title="Tools that fit the work." intro="From a first automation to a connected business system, Selulabs helps teams make progress without adding noise." image="services" /><section className="section"><div className="container"><div className="service-cards">{services.map((service) => <Link className="service-card" to={service.path} key={service.path}><span>{service.icon}</span><ServiceCardImage path={service.path} /><div><h2>{service.title}</h2><p>{service.intro}</p></div><ArrowRight /></Link>)}</div><div className="service-note"><p className="eyebrow">One focused partner</p><h2>We connect the strategy to the screen.</h2><p>You do not need another system to manage. You need a clear answer to a real operational problem, delivered in a way your people can use.</p></div></div></section></>; }

function IndustryImage({ industryId }: { industryId: string }): JSX.Element | null {
  if (industryId === 'healthcare') {
    return <img className="industry-image" src="/assets/images/healthcare.jpeg" alt="Doctor speaking with a patient in a clinic" loading="lazy" />;
  }
  if (industryId === 'law-firms') {
    return <img className="industry-image" src="/assets/images/law.jpeg" alt="Legal team collaborating in an office" loading="lazy" />;
  }
  if (industryId === 'real-estate') {
    return <img className="industry-image" src="/assets/images/real-estate.jpeg" alt="Real estate property" loading="lazy" />;
  }
  return null;
}

function AiSolutions({ onTalk }: { onTalk: () => void }): JSX.Element { return <><PageHero eyebrow="AI Solutions" title="Automation that knows where to stop." intro="We build AI workflows that handle routine work, keep people in control, and fit the context of your industry." image="ai-solutions" /><section className="section anchor-section"><div className="container anchor-links"><span>Jump to</span>{aiIndustries.map((industry) => <a href={`#${industry.id}`} key={industry.id}>{industry.title}<ArrowRight size={15} /></a>)}</div></section>{aiIndustries.map((industry, index) => <section className={index % 2 ? 'section ai-industry tinted' : 'section ai-industry'} id={industry.id} key={industry.id}><div className="container"><div className="industry-intro"><SectionIntro eyebrow={`0${index + 1} / ${industry.title}`} title={industry.intro} /><IndustryImage industryId={industry.id} /></div><div className="automation-list">{industry.items.map(([title, summary, details]) => <article className="automation-item" key={title}><div><h3>{title}</h3><p>{summary}</p></div><div><span className="label">How it works</span><p>{details}</p></div></article>)}</div></div></section>)}<section className="section human-section"><div className="container split-callout"><div><p className="eyebrow">Human in control</p><h2>AI handles the routine. Your people handle what matters.</h2></div><div><p>Every workflow has a clear handoff for sensitive, unusual, or high-stakes situations. The goal is not to remove judgment. It is to give your team more room to use it.</p><button className="button" onClick={onTalk}>Talk through an idea <ArrowRight size={17} /></button></div></div></section></>; }

function CustomSoftware({ onTalk }: { onTalk: () => void }): JSX.Element { const sections = [['Product Development','Turn a strong idea into a useful product with a clear path from first screen to launch.',['Product discovery and planning','Interface and experience design','Web application development','Launch planning and iteration']],['Enterprise Projects','Build secure, scalable applications for complex business operations and the people who depend on them.',['Internal tools and portals','System integrations','Workflow automation','Ongoing improvements']],['Consultancy','Bring in focused expertise when you need to make a decision, unblock delivery, or improve execution.',['Technical direction','Process and roadmap reviews','Delivery planning','Team support and handoff']]]; return <><PageHero eyebrow="Custom Software" title="Software with a reason to exist." intro="We build the products and internal tools that make a specific part of your business clearer, faster, or easier to run." image="custom-software" /><section className="section"><div className="container editorial-sections">{sections.map(([title, intro, bullets], index) => <article className={index % 2 ? 'editorial-row reverse' : 'editorial-row'} key={title as string}><div className="editorial-index">0{index + 1}</div><div><h2>{title as string}</h2><p>{intro as string}</p><ul>{(bullets as string[]).map((bullet) => <li key={bullet}><Check size={17} />{bullet}</li>)}</ul></div></article>)}</div></section><section className="section dark-cta"><div className="container"><p className="eyebrow">Start with the problem</p><h2>Tell us what should work better.</h2><button className="button button-light" onClick={onTalk}>Let’s talk <ArrowRight size={17} /></button></div></section></>; }

function CRM(): JSX.Element { return <><PageHero eyebrow="CRM" title="Make your customer system work harder." intro="We help teams improve the CRM they have, connect the tools around it, and create a cleaner path from lead to long-term relationship." image="crm" /><section className="section"><div className="container crm-list">{crmItems.map(([title, text], index) => <article key={title} className="crm-row"><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div><ArrowRight /></article>)}</div></section></>; }

function About(): JSX.Element { return <><PageHero eyebrow="About Selulabs" title="A small team for focused progress." intro="Selulabs is an AI agency for businesses that want useful systems, careful automation, and software that earns its place." image="about" /><section className="section about-intro"><div className="container about-intro-grid"><img src="/assets/images/about.jpeg" alt="Team members discussing their work together" loading="lazy" /><div><p className="eyebrow">Who we are</p><h2>We make complicated work easier to see and improve.</h2><p>We work closely with business owners and operators to understand how work actually happens. Then we design practical tools around that reality.</p><p>Our mission is simple: help good teams spend less time chasing steps and more time doing the work only they can do.</p></div></div></section><section className="section belief-section"><div className="container"><SectionIntro eyebrow="What we believe" title="Useful beats impressive." /><div className="belief-grid">{[['Start with people','The best system is one your team can understand and trust.'],['Make the handoff clear','Automation should make responsibility easier to see, not harder.'],['Keep the first step small','A focused improvement creates better learning than a giant promise.'],['Stay close to the work','Good products change as the real process changes.']].map(([title,text]) => <div className="belief" key={title}><span><Check size={18} /></span><h3>{title}</h3><p>{text}</p></div>)}</div></div></section><section className="section founder-section"><div className="container founder-card"><div className="founder-photo"><span>Photo slot</span></div><div><p className="eyebrow">Founder</p><h2>Muhammad Ibrahim</h2><p className="founder-role">Founder, Selulabs</p><p>A focused partner for businesses that want to use AI and software with care, not for the sake of having more technology.</p></div></div></section></>; }

function ContactForm(): JSX.Element { const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle'); const submit = (event: FormEvent<HTMLFormElement>): void => { event.preventDefault(); setStatus('loading'); window.setTimeout(() => setStatus('success'), 700); }; if (status === 'success') return <div className="form-success"><Check size={30} /><h2>Thanks for reaching out.</h2><p>Your message is ready to be reviewed. We’ll be in touch soon.</p><button className="button" onClick={() => setStatus('idle')}>Send another message</button></div>; return <form className="contact-form" onSubmit={submit}><div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" /></label><label>Email *<input name="email" type="email" required placeholder="you@company.com" /></label></div><div className="form-row"><label>Phone *<input name="phone" type="tel" required placeholder="Your phone number" /></label><fieldset><legend>How should we contact you?</legend><label className="radio-label"><input type="radio" name="contact" defaultChecked value="email" /> Email</label><label className="radio-label"><input type="radio" name="contact" value="phone" /> Phone</label></fieldset></div><label>Message<textarea name="message" rows={5} placeholder="What would you like to make easier?"></textarea></label><button className="button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? 'Sending…' : 'Let’s Talk'} <ArrowRight size={17} /></button>{status === 'error' && <p className="form-error">Something went wrong. Please try again.</p>}<p className="terms-copy">By clicking you agree to our <Link to="/terms">Terms and Conditions</Link></p><label className="checkbox-label"><input type="checkbox" defaultChecked /> Send me news and updates</label></form>; }
function Contact(): JSX.Element { return <><PageHero eyebrow="Contact" title="Let’s talk about the work." intro="Tell us what is taking too much time, getting missed, or making growth harder than it should be." image="contact" /><section className="section contact-section"><div className="container contact-grid"><div className="contact-details"><p className="eyebrow">Reach Selulabs</p><h2>A good conversation starts with one clear problem.</h2><p>Share a little context and we’ll come prepared with questions, not a sales script.</p><div className="contact-detail-list"><a href="mailto:info@selulabs.com"><span>Email</span>info@selulabs.com</a><a href="tel:4793798502"><span>Phone</span>479-379-8502</a><div><span>Location</span>United States</div></div></div><div className="form-panel"><ContactForm /></div></div></section></>; }

function Legal({ type }: { type: 'privacy' | 'terms' }): JSX.Element { const isPrivacy = type === 'privacy'; return <><PageHero eyebrow={isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'} title={isPrivacy ? 'Privacy, explained plainly.' : 'Terms for working together.'} intro={isPrivacy ? 'A simple overview of how Selulabs approaches information shared through this website.' : 'The basic terms that guide conversations and work with Selulabs.'} /><section className="section legal-section"><div className="container legal-copy"><p className="eyebrow">Last updated October 2026</p>{isPrivacy ? <><h2>Information you choose to share</h2><p>When you use the contact form, you may share your name, email, phone number, and message. We use that information to respond to your inquiry and discuss potential work.</p><h2>How we handle it</h2><p>We keep information limited to the people who need it to respond. We do not sell contact details. We take reasonable steps to protect information and only retain it as long as it is useful for the purpose it was shared.</p><h2>Questions</h2><p>For questions about privacy, email <a href="mailto:info@selulabs.com">info@selulabs.com</a>.</p></> : <><h2>Website use</h2><p>The information on this website is provided for general business conversations. It is not legal, medical, or financial advice.</p><h2>Working together</h2><p>Any project, scope, fee, ownership, confidentiality, or data-handling terms will be agreed in writing before work begins.</p><h2>Contact</h2><p>Questions about these terms can be sent to <a href="mailto:info@selulabs.com">info@selulabs.com</a>.</p></>}</div></section></>; }

function ContactModal({ onClose }: { onClose: () => void }): JSX.Element { return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Close contact form"><CircleX /></button><p className="eyebrow">Start a conversation</p><h2 id="contact-modal-title">What would you like to make easier?</h2><ContactForm /></div></div>; }

function AppRoutes(): JSX.Element { const [modalOpen, setModalOpen] = useState(false); const location = useLocation(); const openTalk = (): void => { setModalOpen(true); }; useEffect(() => { const pageMeta: Record<string, [string, string]> = { '/': ['Selulabs — AI automation and software', 'Selulabs builds practical AI automation, custom software, and CRM systems for healthcare, law, and real estate teams.'], '/services': ['Services — Selulabs', 'Explore AI solutions, custom software, and CRM services from Selulabs.'], '/services/ai-solutions': ['AI Solutions — Selulabs', 'Industry-aware AI automation for healthcare, law firms, and real estate teams.'], '/services/custom-software': ['Custom Software — Selulabs', 'Focused digital products and internal tools built around the way your business works.'], '/services/crm': ['CRM Services — Selulabs', 'Improve your CRM, connect your tools, and create a clearer path from lead to relationship.'], '/about': ['About — Selulabs', 'Meet Selulabs, a small focused team building useful AI automation and software.'], '/contact': ['Contact — Selulabs', 'Talk with Selulabs about the work taking too much time or getting missed.'], '/privacy': ['Privacy Policy — Selulabs', 'Read the Selulabs privacy policy in plain language.'], '/terms': ['Terms and Conditions — Selulabs', 'Read the Selulabs terms and conditions.'] }; const [title, description] = pageMeta[location.pathname] ?? pageMeta['/']; document.title = title; const meta = document.querySelector('meta[name="description"]'); if (meta) meta.setAttribute('content', description); }, [location.pathname]); return <Layout onTalk={openTalk}><Routes><Route path="/" element={<Home onTalk={openTalk} />} /><Route path="/services" element={<Services />} /><Route path="/services/ai-solutions" element={<AiSolutions onTalk={openTalk} />} /><Route path="/services/custom-software" element={<CustomSoftware onTalk={openTalk} />} /><Route path="/services/crm" element={<CRM />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="/privacy" element={<Legal type="privacy" />} /><Route path="/terms" element={<Legal type="terms" />} /><Route path="*" element={<Home onTalk={openTalk} />} /></Routes>{modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}</Layout>; }

export default function App(): JSX.Element { return <BrowserRouter><AppRoutes /></BrowserRouter>; }
