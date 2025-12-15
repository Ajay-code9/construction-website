import React, { useEffect, useState, useRef } from "react";
import ParticleBackground from "./components/ParticleBackground";
import ContactStripBackground from "./components/ContactStripBackground";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About Us" },
  { id: "clients", label: "Clients" },
  { id: "contact", label: "Contact Us" }
];

function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 80;
    const elementPosition = el.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled
          ? "left-3 right-3 top-3 rounded-2xl bg-brandBlue/95 backdrop-blur-xl shadow-2xl border border-white/10"
          : "inset-x-0 top-0 bg-brandBlue/90 backdrop-blur-lg"
      } text-white`}
    >
      {/* Premium gradient border effect */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brandYellow/50 to-transparent" />
      
      <div
        className={`flex items-center justify-between px-4 sm:px-6 lg:px-8 py-1 lg:py-2 transition-all duration-500 ${
          isScrolled ? "mx-4 sm:mx-8 lg:mx-12" : "mx-0"
        }`}
      >
        {/* Logo + tagline */}
        <div className="flex items-center gap-3 lg:gap-6">
            <div className="flex items-center gap-2">
            {/* Premium logo with gradient */}
            <div className="group relative">
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brandYellow via-brandYellow/80 to-brandBlue blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex h-8 w-8 lg:h-9 lg:w-9 items-center justify-center rounded-lg bg-gradient-to-br from-white to-gray-100 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-xl">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-brandBlue/20 to-brandYellow/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  <div className="h-3.5 w-3.5 lg:h-4 w-4 -skew-x-6 bg-gradient-to-br from-brandBlue to-blue-700 shadow-md" />
                  <div className="-ml-1 h-3.5 w-3.5 lg:h-4 w-4 -skew-x-6 bg-gradient-to-br from-brandYellow to-yellow-500 shadow-md" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-base lg:text-lg font-black tracking-[0.12em] lg:tracking-[0.2em] transition-all duration-300 group-hover:text-brandYellow bg-gradient-to-r from-white via-white to-brandYellow/80 bg-clip-text text-transparent">
                SHIV SHANKAR
              </span>
              <span className="text-[8px] lg:text-[9px] font-medium text-white/70 tracking-wider uppercase hidden sm:block">
                Building Materials
              </span>
            </div>
          </div>
          
          <div className="hidden lg:flex flex-col text-[10px] font-semibold leading-tight text-white/90 border-l border-white/20 pl-3">
            <span className="text-brandYellow/90">Leading Provider</span>
            <span>Of Industrial Solutions</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className={`relative px-4 lg:px-5 py-2 text-xs lg:text-sm font-bold uppercase tracking-wider transition-all duration-300 group ${
                activeSection === section.id
                  ? "text-brandYellow"
                  : "text-white/90 hover:text-white"
              }`}
            >
              <span className="relative z-10">{section.label}</span>
              
              {/* Animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-brandYellow to-yellow-400 transition-all duration-300 ${
                  activeSection === section.id
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`}
              />
              
              {/* Hover glow effect */}
              <span className="absolute inset-0 bg-brandYellow/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 pt-2 bg-brandBlue/98 backdrop-blur-xl border-t border-white/10">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScroll(section.id)}
              className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-all duration-300 mb-1 ${
                activeSection === section.id
                  ? "bg-brandYellow/20 text-brandYellow border-l-4 border-brandYellow"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-center gap-4 px-6 py-16"
    >
      <h2 className="text-3xl font-extrabold uppercase tracking-wide text-brandBlue md:text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    email: "",
    material: "",
    quantity: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "", whatsappLink: "" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);

  // Mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Generate WhatsApp message link
  const generateWhatsAppLink = (formData) => {
    const whatsappNumber = "9877443093"; // Your WhatsApp business number
    
    const message = `Hello, I want a quote.

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Material: ${formData.material}
Quantity: ${formData.quantity}
Details: ${formData.message || "N/A"}`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    
    // Generate WhatsApp link
    return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "", whatsappLink: "" });

    try {
      // Always use the Vercel serverless function endpoint.
      // This works both in local dev (npm run dev) and in production on Vercel.
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: quoteForm.name,
          phone: quoteForm.phone,
          email: quoteForm.email,
          materialType: quoteForm.material,
          quantity: quoteForm.quantity,
          additionalDetails: quoteForm.message
        })
      });

      if (!response.ok) {
        // Try to parse error response
        let errorMessage = "Failed to submit inquiry. Please try again.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        setSubmitMessage({
          type: "error",
          text: errorMessage,
          whatsappLink: generateWhatsAppLink(quoteForm)
        });
        return;
      }

      const data = await response.json();

      if (data.success) {
        setSubmitMessage({
          type: "success",
          text: data.message || "Inquiry submitted successfully! You can also contact us on WhatsApp.",
          whatsappLink: generateWhatsAppLink(quoteForm)
        });
        setQuoteForm({
          name: "",
          phone: "",
          email: "",
          material: "",
          quantity: "",
          message: ""
        });
      } else {
        setSubmitMessage({
          type: "error",
          text: data.message || "Failed to submit inquiry. Please try again.",
          whatsappLink: generateWhatsAppLink(quoteForm)
        });
      }
    } catch (error) {
      console.error("Error submitting quote:", error);
      let errorMessage = "Network error. Please try again or contact us directly via WhatsApp.";
      if (error.message) {
        errorMessage += ` (${error.message})`;
      }
      setSubmitMessage({
        type: "error",
        text: errorMessage,
        whatsappLink: generateWhatsAppLink(quoteForm)
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setQuoteForm({
      ...quoteForm,
      [e.target.name]: e.target.value
    });
  };

  const testimonials = [
    {
      name: "Rajesh Sharma",
      role: "Site Manager, Modern Constructions",
      location: "Chandigarh",
      quote: "They understand site pressure. Material arrives when promised and the quality is always consistent—that's why we keep working with them.",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=400&fit=crop&auto=format"
    },
    {
      name: "Priya Verma",
      role: "Project Head, Green Build Pvt Ltd",
      location: "Mohali",
      quote: "Best pricing in the market with zero compromise on quality. Their bulk delivery service has saved us countless hours and money on multiple projects.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=400&fit=crop&auto=format"
    },
    {
      name: "Amit Singh",
      role: "Contractor, Singh Builders",
      location: "Panchkula",
      quote: "What I love is their transparency. No hidden charges, clear pricing, and they always have stock when we need it urgently. Highly recommended!",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop&auto=format"
    },
    {
      name: "Deepak Mehta",
      role: "Architect & Developer",
      location: "Chandigarh",
      quote: "Professional service from start to finish. They helped us source rare materials for our premium project and delivered exactly as specified.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop&auto=format"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      {/* Spacer for fixed header */}
      <div className="h-20" />

      {/* Hero / Home with slow moving background */}
      <section
        id="home"
        className="group relative flex min-h-[90vh] items-center justify-center overflow-hidden"
      >
        {/* Animated background layers with parallax */}
        <div
          className="pointer-events-none absolute inset-x-0 -inset-y-10 bg-[url('/bgimg2.webp')] bg-cover bg-center transition-transform duration-[4000ms] ease-out"
          style={{
            transform: `translate(${mousePosition.x}px, ${scrollY * -0.15 + mousePosition.y * 0.5}px) scale(1.1)`
          }}
          aria-hidden="true"
        />
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/40" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-brandYellow/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div
          className={`relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-20 text-white transition-all duration-1000 ${
            visibleSections.has("home")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brandYellow animate-fade-in">
            Quality Building Materials · Fast Delivery · +91 77400 22757
          </p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            <span className="inline-block">Everything You Need</span>
            <br />
            <span className="inline-block underline decoration-brandYellow decoration-4">
              To Build Stronger, Faster.
            </span>
          </h1>
          <button
            onClick={() => setShowQuoteModal(true)}
            className="group/btn mt-4 rounded bg-brandBlue px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg ring-1 ring-white/40 transition-all duration-300 hover:scale-105 hover:bg-brandYellow hover:text-brandBlue hover:shadow-xl hover:ring-brandYellow"
          >
            <span className="relative z-10">Get Free Material Quote</span>
            <span className="absolute inset-0 rounded bg-brandYellow opacity-0 transition-opacity duration-300 group-hover/btn:opacity-20" />
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section
        id="services"
        className={`mx-auto max-w-6xl px-6 py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("services")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid gap-12 md:grid-cols-[1.1fr,1.2fr] md:items-start">
          {/* Left column heading and text */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
              Most popular
            </p>
            <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
              <span className="text-brandYellow">.</span>SERVICES
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
              From cement and aggregates to steel, bricks, paints and tools, we
              source and deliver the right materials so your site never stops
              working.
            </p>
            <div className="mt-6 h-0.5 w-24 bg-brandYellow" />
          </div>

          {/* Right column service items */}
          <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
            {[
              {
                title: "Cement & Aggregates",
                desc: "Premium cement, sand and stone for strong, long–lasting structures.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                title: "Steel & Bars",
                desc: "Reinforcement steel, TMT bars and sections for every type of project.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )
              },
              {
                title: "Bricks & Blocks",
                desc: "Standard and specialty bricks, blocks and allied masonry products.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                  </svg>
                )
              },
              {
                title: "Finishing Materials",
                desc: "Putty, tiles, grouts and finishes that give your work a clean look.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              },
              {
                title: "Paints & Hardware",
                desc: "Branded paints, primers, tools and hardware under one roof.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                )
              },
              {
                title: "On‑Site Delivery",
                desc: "Quick, reliable delivery to your site so your team keeps moving.",
                icon: (
                  <svg className="h-6 w-6 text-brandBlue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="group/card space-y-2 text-sm transition-all duration-300 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: visibleSections.has("services") ? 1 : 0,
                  transform: visibleSections.has("services")
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: `all 0.6s ease-out ${index * 100}ms`
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover/card:border-brandYellow group-hover/card:bg-brandYellow/10 group-hover/card:shadow-md group-hover/card:scale-110">
                  <div className="transition-transform duration-300 group-hover/card:scale-110 group-hover/card:rotate-6">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xs font-extrabold uppercase tracking-wide text-brandYellow transition-colors duration-300 group-hover/card:text-brandBlue">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUN FACTS */}
      <section
        className={`relative overflow-hidden bg-brandYellow py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("fun-facts")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        id="fun-facts"
      >
        {/* Animated particle background */}
        <ParticleBackground />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            Our track record
          </p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
            Why Choose Us
          </h2>
          <p className="mt-6 max-w-lg text-sm text-brandBlue md:text-base">
            Contractors, builders and homeowners across Chandigarh trust us for
            honest rates and dependable supply.
          </p>
          <div className="mt-6 h-0.5 w-24 bg-white/80" />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { label: "Projects supplied", value: "150+" },
              { label: "Happy contractors", value: "90+" },
              { label: "Years of experience", value: "10+" }
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="group/stat rounded border border-white/60 bg-brandYellow/10 px-8 py-8 text-white shadow-sm transition-all duration-500 hover:scale-105 hover:border-white hover:bg-brandYellow/20 hover:shadow-lg"
                style={{
                  animationDelay: `${index * 150}ms`,
                  opacity: visibleSections.has("fun-facts") ? 1 : 0,
                  transform: visibleSections.has("fun-facts")
                    ? "translateY(0)"
                    : "translateY(30px)",
                  transition: `all 0.6s ease-out ${index * 150}ms`
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] transition-colors duration-300 group-hover/stat:text-white">
                  {stat.label}
                </p>
                <p className="mt-4 text-4xl font-extrabold tracking-tight transition-all duration-300 group-hover/stat:scale-110">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTIONS / PROJECTS cards under Projects anchor */}
      <section
        id="projects"
        className={`mx-auto max-w-6xl px-6 py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("projects")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
          Most popular
        </p>
        <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
          <span className="text-brandYellow">.</span>Solutions
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          Smart material planning, bulk supply and on‑time logistics so you can
          focus on engineering and execution.
        </p>
        <div className="mt-6 h-0.5 w-24 bg-brandYellow" />

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            {
              label: "Retail Counter",
              title: "Walk‑In Material Store",
              img: "/img1.webp"
            },
            {
              label: "Bulk Supply",
              title: "Large Site Deliveries",
              img: "/img2.webp"
            },
            {
              label: "Custom Solutions",
              title: "Project‑Specific Sourcing",
              img: "/img3.webp"
            }
          ].map((card, index) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded shadow-md transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              style={{
                animationDelay: `${index * 150}ms`,
                opacity: visibleSections.has("projects") ? 1 : 0,
                transform: visibleSections.has("projects")
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: `all 0.6s ease-out ${index * 150}ms`
              }}
            >
              <div
                className="h-56 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${card.img})` }}
              />
              <div className="space-y-3 bg-white px-6 py-5 transition-colors duration-300 group-hover:bg-slate-50">
                <span className="inline-block rounded bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition-colors duration-300 group-hover:bg-brandYellow group-hover:text-brandBlue">
                  {card.label}
                </span>
                <h3 className="text-sm font-extrabold uppercase tracking-wide text-brandBlue transition-colors duration-300 group-hover:text-brandYellow">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* GET OFFER section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-slate-900">
        <div
          className="pointer-events-none absolute inset-0 -inset-y-20 bg-[url('/bgimg2.webp')] bg-cover bg-center opacity-90 transition-transform duration-[6000ms] ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.3}px, ${scrollY * -0.1 + mousePosition.y * 0.3}px) scale(1.15)`
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/75 via-slate-900/65 to-slate-900/75" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
            Free consultation
          </p>
          <h2 className="mt-4 text-5xl font-extrabold uppercase tracking-[0.2em] md:text-6xl">
            Get Offer
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-100 md:text-base">
            Share your material list and timelines—our team will put together a
            clear quote and delivery plan tailored to your project.
          </p>
          <div className="mt-6 mx-auto h-0.5 w-24 bg-brandYellow" />
          <button
            onClick={() => setShowQuoteModal(true)}
            className="mt-10 rounded bg-brandYellow px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-brandBlue shadow-lg transition hover:bg-white"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* ABOUT US under About anchor */}
      <section
        id="about"
        className={`mx-auto max-w-6xl px-6 py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("about")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
          All about
        </p>
        <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
          <span className="text-brandYellow">.</span>Predio
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          From a single shop in Village Dhanas, we&apos;ve grown into a trusted
          material partner for contractors, builders and government projects
          across the region.
        </p>
        <div className="mt-6 h-0.5 w-24 bg-brandYellow" />

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr,1fr] md:items-start">
          <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            We believe solid construction starts with the right material at the
            right time. Our team helps you plan requirements, control wastage
            and maintain uninterrupted work on site.
          </p>

          <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
            <div
              className="h-40 bg-cover bg-center"
              style={{
                backgroundImage: "url(/img4.webp)"
              }}
            />
            <div className="space-y-3 px-5 py-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brandYellow">
                Our Journey
              </p>
              <h3 className="text-sm font-semibold text-brandBlue">
                Building Trust Since 2023
              </h3>
              <p className="text-[13px] leading-relaxed text-slate-600">
                Started as a small family business, Shiv Shankar Building
                Material has steadily expanded its product range and logistics
                capability to handle demanding modern projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO section */}
      <section className="relative flex min-h-[55vh] items-center justify-center overflow-hidden bg-slate-900">
        <div
          className="pointer-events-none absolute inset-0 bg-[url('https://images.pexels.com/photos/2381463/pexels-photo-2381463.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center bg-fixed"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-16 text-center text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
            Mortgage presentation
          </p>
          <h2 className="mt-4 text-5xl font-extrabold uppercase tracking-[0.2em] md:text-6xl">
            Video
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-slate-100 md:text-base">
            Take a quick look at how we store, handle and dispatch materials so
            they reach your site in top condition.
          </p>
          <div className="mt-6 mx-auto h-0.5 w-24 bg-brandYellow" />
          <button className="mt-10 inline-flex h-16 w-16 items-center justify-center rounded-full border-2 border-white text-2xl font-semibold text-white transition hover:bg-white/10">
            ▶
          </button>
        </div>
      </section>

      {/* GALLERY grid, still under Projects area visually */}
      <section
        className={`mx-auto max-w-6xl px-6 py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("gallery")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
        id="gallery"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
          Amazing structures
        </p>
        <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
          <span className="text-brandYellow">.</span>Gallery
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          A glimpse of the projects, structures and spaces where our materials
          have played a part.
        </p>
        <div className="mt-6 h-0.5 w-24 bg-brandYellow" />

        {/* Fake filter tabs */}
        <div className="mt-10 inline-flex overflow-hidden rounded bg-brandYellow text-xs font-semibold uppercase tracking-[0.2em] text-white">
          {["Apartments", "Residences", "Villages"].map((tab, index) => (
            <button
              key={tab}
              className={`px-6 py-3 ${
                index === 0 ? "bg-brandYellow text-white" : "bg-brandYellow/70"
              }`}
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-2 md:grid-cols-3">
          {[
            "/img1.webp",
            "/img2.webp",
            "/img3.webp",
            "/img4.webp",
            "/img5.webp",
            "/img6.webp",
            "/img7.webp",
            "/img8.webp",
            "/img9.webp"
          ].map((url, idx) => (
            <div
              key={idx}
              className="group/gallery aspect-[4/3] overflow-hidden rounded-lg bg-slate-200 shadow-md transition-all duration-500 hover:scale-105 hover:shadow-xl"
              style={{
                animationDelay: `${idx * 50}ms`,
                opacity: visibleSections.has("gallery") ? 1 : 0,
                transform: visibleSections.has("gallery")
                  ? "translateY(0)"
                  : "translateY(20px)",
                transition: `all 0.5s ease-out ${idx * 50}ms`
              }}
            >
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-700 group-hover/gallery:scale-110"
                style={{ backgroundImage: `url(${url})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover/gallery:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* CLIENTS + testimonial under Clients anchor */}
      <section
        id="clients"
        className={`bg-slate-50 py-20 transition-all duration-1000 md:py-24 ${
          visibleSections.has("clients")
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
            Our satisfied
          </p>
          <h2 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-5xl">
            <span className="text-brandYellow">.</span>Clients
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Proud supply partner for respected organisations, institutions and
            private developers in and around Chandigarh.
          </p>
          <div className="mt-6 h-0.5 w-24 bg-brandYellow" />

          {/* Logo row */}
          <div className="mt-10 flex flex-wrap items-center gap-10 opacity-80">
            {["Builders", "Contractors", "Developers", "Architects", "Engineers"].map(
              (name) => (
                <span
                  key={name}
                  className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500"
                >
                  {name}
                </span>
              )
            )}
          </div>

          {/* Testimonial */}
          <div className="mt-16 grid gap-10 md:grid-cols-[auto,1fr] md:items-start">
            <div className="flex flex-col items-start gap-4">
              <div
                className="h-28 w-28 overflow-hidden rounded-full bg-slate-300 bg-cover bg-center"
                style={{ backgroundImage: `url(${testimonials[currentTestimonial].image})` }}
              />
              <div>
                <p className="text-sm font-extrabold uppercase tracking-wide text-brandYellow">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-xs text-slate-500">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-xs text-slate-400">
                  {testimonials[currentTestimonial].location}
                </p>
                <div className="mt-4 h-0.5 w-16 bg-brandYellow" />
              </div>
            </div>

            <div className="flex flex-col justify-between gap-8 text-sm leading-relaxed text-slate-600 md:text-base">
              <p className="transition-opacity duration-300">
                &quot;{testimonials[currentTestimonial].quote}&quot;
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-lg text-slate-500 transition hover:bg-slate-100 hover:border-brandYellow hover:text-brandYellow"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <span className="text-xs text-slate-400">
                  {currentTestimonial + 1} / {testimonials.length}
                </span>
                <button
                  onClick={nextTestimonial}
                  className="flex h-10 w-10 items-center justify-center rounded border border-slate-300 text-lg text-slate-500 transition hover:bg-slate-100 hover:border-brandYellow hover:text-brandYellow"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION / MAP SECTION */}
      <section
        id="contact"
        className="bg-slate-50 pt-6 pb-16 md:pt-8 md:pb-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="group">
            <div className="animated-border shadow-md">
              <div className="relative z-10 flex flex-col gap-10 rounded-[0.7rem] bg-white px-6 py-8 md:flex-row md:items-stretch md:px-8 md:py-10">
                {/* Text / address */}
                <div className="flex-1 space-y-4 md:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brandYellow">
              Visit Our Yard
            </p>
            <h2 className="text-3xl font-extrabold uppercase tracking-[0.15em] text-brandBlue md:text-4xl">
              <span className="text-brandYellow">.</span>Head Office &amp; Yard
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 md:text-base">
              Drop in to see materials, check rates or plan your next site. We are
              located just off the main road with easy truck access and customer parking.
            </p>

            <div className="mt-4 space-y-3 rounded-lg border border-slate-200 bg-slate-50/60 p-4 text-sm shadow-sm md:p-5">
              <div>
                <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-brandBlue">
                  Head Office Address
                </h3>
                <div className="mt-1 h-0.5 w-10 bg-brandYellow" />
                <p className="mt-2 text-sm text-slate-700">
                  Shiv Shankar Building Material Supplier
                  <br />
                  Shop No. 2, Opp. Petrol Pump
                  <br />
                  Near Light Point, Village Dhanas
                  <br />
                  Chandigarh, 160014
                </p>
              </div>

              <div className="pt-2 text-sm text-slate-700">
                <p className="font-semibold text-brandBlue">Contact</p>
                <p>Phone: +91 77400 22757</p>
                <p>Email: arjunjayani123@gmail.com</p>
              </div>

              <div className="pt-2 text-xs text-slate-500">
                <p>Open Monday to Saturday · Call ahead for bulk loading and deliveries.</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1">
            <div className="h-full w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-200 shadow-lg">
              <div className="aspect-[4/3] md:aspect-[16/9] h-full w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.8910683316235!2d76.74722947558178!3d30.769067274566783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ff3297011ae7b%3A0x9685447cc20b229a!2sShiv%20Shankar%20Bulding%20Material%20supplier!5e1!3m2!1sen!2sin!4v1764659150398!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP – centered yellow box, compact, with live line background */}
      <section className="relative -mt-8 bg-slate-50 pb-6 pt-10">
        <div className="mx-auto max-w-6xl px-6 text-white">
          <div className="relative mx-auto my-0 w-full max-w-3xl overflow-hidden rounded bg-gradient-to-r from-brandYellow to-amber-400 px-6 py-4 text-white shadow-lg md:px-8 md:py-4">
            {/* Live cube/line background */}
            <ContactStripBackground />

            <div className="relative z-10 grid gap-6 md:grid-cols-3 md:items-center">
              {[
                {
                  title: "Working Times",
                  line1: "Monday-Friday : 9:30 - 20:00",
                  line2: "Saturday : 9:30 - 14:00"
                },
              {
                title: "Head Office",
                line1: "Shop No. 2, Opp. Petrol Pump",
                line2: "Near Light Point, Village Dhanas, Chandigarh, 160014"
              },
              {
                title: "Contact Us",
                line1: "Phone : +91 77400 22757",
                line2: "arjunjayani123@gmail.com"
              }
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded bg-white/10">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>
                  <div className="space-y-1 text-[11px] md:text-xs">
                    <h3 className="text-[11px] font-extrabold uppercase tracking-[0.18em] md:text-xs">
                      {item.title}
                    </h3>
                    <div className="h-0.5 w-7 bg-white/80" />
                    <p>{item.line1}</p>
                    <p>{item.line2}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER (blue area with socials, newsletter, columns) */}
      <section className="bg-brandBlue pb-10 pt-10">
        <div className="mx-auto max-w-6xl px-6">
          {/* Social + newsletter row */}
          <div className="mb-8 flex flex-col gap-6 text-white md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em]">
              <span>Follow us</span>
              <div className="flex gap-3">
                {["F", "T", "In", "Y", "G"].map((ch) => (
                  <span
                    key={ch}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[11px] font-bold text-brandBlue"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-1 items-center justify-end gap-4 text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="hidden text-white/80 md:inline">Get Price Updates</span>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim() && newsletterEmail.includes("@")) {
                    try {
                      // Send newsletter subscription via Vercel serverless function
                      const apiUrl = import.meta.env.PROD 
                        ? "/api/send-mail" 
                        : "http://localhost:3001/send-mail";
                      
                      await fetch(apiUrl, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          name: "Newsletter Subscriber",
                          phone: "N/A",
                          email: newsletterEmail,
                          materialType: "Newsletter Subscription",
                          quantity: "N/A",
                          additionalDetails: "Newsletter subscription request"
                        })
                      });
                      setShowThankYouPopup(true);
                      setNewsletterEmail("");
                      setTimeout(() => {
                        setShowThankYouPopup(false);
                      }, 3000);
                    } catch (error) {
                      console.error("Newsletter subscription error:", error);
                      // Still show thank you popup even if email fails
                      setShowThankYouPopup(true);
                      setNewsletterEmail("");
                      setTimeout(() => {
                        setShowThankYouPopup(false);
                      }, 3000);
                    }
                  }
                }}
                className="flex w-full max-w-md overflow-hidden rounded bg-white text-[11px]"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email for material prices"
                  required
                  className="w-full px-4 py-3 text-xs text-slate-700 outline-none"
                />
                <button
                  type="submit"
                  className="bg-brandYellow px-6 text-xs font-extrabold uppercase tracking-[0.2em] text-white transition hover:bg-brandYellow/90"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.2fr,1fr,1fr]">
            {/* About company */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-brandYellow">
                About Shiv Shankar
              </h3>
              <div className="mt-3 h-0.5 w-10 bg-brandYellow" />
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-white">
                  <div className="h-5 w-5 -skew-x-6 bg-brandBlue" />
                  <div className="-ml-2 h-5 w-5 -skew-x-6 bg-brandYellow" />
                </div>
                <span className="text-xl font-extrabold tracking-[0.25em] text-white">
                  SHIV SHANKAR
                </span>
              </div>
              <p className="mt-6 max-w-md text-xs leading-relaxed text-slate-200/80">
                Shiv Shankar Building Material - Your trusted partner for quality
                building materials, hardware, paints, and construction supplies in
                Chandigarh. Serving the construction industry with excellence.
              </p>
            </div>

            {/* Company services list */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-brandYellow">
                Our Services
              </h3>
              <div className="mt-3 h-0.5 w-10 bg-brandYellow" />
              <ul className="mt-6 space-y-2 text-xs text-slate-200/80">
                {[
                  "House Renovation",
                  "Metal Roofing",
                  "General Contracting",
                  "Laminate Flooring",
                  "Condo Remodeling",
                  "Architecture"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-brandYellow">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Photo gallery thumbnails */}
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-brandYellow">
                Photo Gallery
              </h3>
              <div className="mt-3 h-0.5 w-10 bg-brandYellow" />
              <div className="mt-6 grid grid-cols-3 gap-2">
                {[
                  "/img5.webp",
                  "/img6.webp",
                  "/img7.webp",
                  "/img8.webp",
                  "/img9.webp",
                  "/img1.webp"
                ].map((url, idx) => (
                  <div
                    key={idx}
                    className="aspect-square overflow-hidden rounded bg-slate-600"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                      style={{ backgroundImage: `url(${url})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-600 pt-4 text-center text-[11px] text-slate-400">
            <p>
              Copyright © 2024, Shiv Shankar Building Material · All rights
              reserved.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => {
            setShowQuoteModal(false);
            setSubmitMessage({ type: "", text: "", whatsappLink: "" });
          }}
        >
          <div
            className="relative w-full max-w-2xl rounded-lg bg-white shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute right-4 top-4 text-2xl text-slate-400 transition hover:text-slate-600"
              aria-label="Close"
            >
              ×
            </button>

            {/* Modal content */}
            <div className="p-8">
              <h2 className="mb-2 text-2xl font-extrabold uppercase tracking-wide text-brandBlue">
                Get Free Material Quote
              </h2>
              <p className="mb-6 text-sm text-slate-600">
                Fill in your details and we&apos;ll get back to you with the best
                pricing.
              </p>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={quoteForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={quoteForm.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                      placeholder="+91 77400 22757"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={quoteForm.email}
                    onChange={handleInputChange}
                    className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Material Type *
                    </label>
                    <select
                      name="material"
                      value={quoteForm.material}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                    >
                      <option value="">Select material</option>
                      <option value="Cement">Cement</option>
                      <option value="Steel">Steel</option>
                      <option value="Bricks">Bricks</option>
                      <option value="Sand">Sand</option>
                      <option value="Aggregate">Aggregate</option>
                      <option value="Paints">Paints</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                      Quantity
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      value={quoteForm.quantity}
                      onChange={handleInputChange}
                      className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                      placeholder="e.g., 100 bags, 5 tons"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-700">
                    Additional Details
                  </label>
                  <textarea
                    name="message"
                    value={quoteForm.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded border border-slate-300 px-4 py-2 text-sm focus:border-brandYellow focus:outline-none focus:ring-2 focus:ring-brandYellow/20"
                    placeholder="Any specific requirements or delivery details..."
                  />
                </div>

                {/* Success/Error Message */}
                {submitMessage.text && (
                  <div
                    className={`rounded px-4 py-3 text-sm ${
                      submitMessage.type === "success"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    <p className="mb-3">{submitMessage.text}</p>
                    {submitMessage.whatsappLink && (
                      <a
                        href={submitMessage.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-green-600"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        {submitMessage.type === "success" ? "Contact on WhatsApp" : "Try WhatsApp Instead"}
                      </a>
                    )}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded bg-brandYellow px-6 py-3 text-sm font-extrabold uppercase tracking-wide text-brandBlue transition hover:bg-brandYellow/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowQuoteModal(false);
                      setSubmitMessage({ type: "", text: "", whatsappLink: "" });
                    }}
                    disabled={isSubmitting}
                    className="rounded border border-slate-300 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Thank You Popup for Newsletter */}
      {showThankYouPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowThankYouPopup(false)}
        >
          <div
            className="relative w-full max-w-md rounded-lg bg-white p-8 shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowThankYouPopup(false)}
              className="absolute right-4 top-4 text-2xl text-slate-400 transition hover:text-slate-600"
              aria-label="Close"
            >
              ×
            </button>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brandYellow">
                <svg
                  className="h-8 w-8 text-brandBlue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-2xl font-extrabold uppercase tracking-wide text-brandBlue">
                Thank You!
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Thank you for subscribing to our price updates. We&apos;ll keep you
                informed about the latest material prices and special offers.
              </p>
              <p className="text-xs font-semibold text-brandYellow">
                See you soon!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/9877443093?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20building%20materials."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-600 hover:shadow-xl"
        aria-label="Contact us on WhatsApp"
      >
        <svg
          className="h-8 w-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  );
}


