import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FooterAnimations = () => (
    <style>{`
        @keyframes floatUp {
            from { opacity: 0; transform: translateY(10px) scale(0.9); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .back-to-top-enter {
            animation: floatUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .footer-link {
            position: relative;
        }
        .footer-link::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -2px;
            width: 0%;
            height: 1.5px;
            background-color: #00C8F9;
            transition: width 0.25s ease;
        }
        .footer-link:hover::after {
            width: 100%;
        }
        @media (prefers-reduced-motion: reduce) {
            .back-to-top-enter { animation: none; }
            .footer-link::after { transition: none; }
        }
    `}</style>
);

const Footer = () => {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 320);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const quickLinks = [
        { to: '/medicines', label: 'Inventory' },
        { to: '/billing', label: 'Billing' },
        { to: '/suppliers', label: 'Suppliers' },
        { to: '/reports', label: 'Reports' },
    ];

    const supportLinks = [
        { to: '/help', label: 'Help center' },
        { to: '/contact', label: 'Contact us' },
        { to: '/privacy', label: 'Privacy policy' },
        { to: '/terms', label: 'Terms of service' },
    ];

    const socials = [
        { label: 'Twitter', href: 'https://twitter.com', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
        { label: 'Facebook', href: 'https://facebook.com', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
        { label: 'Instagram', href: 'https://instagram.com', path: 'M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5zm-5 13.5A5.5 5.5 0 1117.5 10 5.5 5.5 0 0112 15.5zM17.75 6.5a1 1 0 111-1 1 1 0 01-1 1z' },
        { label: 'LinkedIn', href: 'https://linkedin.com', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 110-4 2 2 0 010 4z' },
    ];

    return (
        <>
            <FooterAnimations />
            <footer className="bg-[#006179] text-white relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                        {/* Brand + newsletter */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-9 h-9 rounded-lg bg-[#00C8F9] flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#006179]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                                    </svg>
                                </div>
                                <span className="text-lg font-extrabold">PharmaCare</span>
                            </div>
                            <p className="text-sm text-[#a8d3de] leading-relaxed mb-4">
                                Inventory, billing, and supplier tools built for independent pharmacies.
                            </p>
                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="min-w-0 flex-1 bg-white/10 placeholder-[#a8d3de] text-white text-sm rounded-lg px-3 py-2.5 outline-none border border-white/10 focus:border-[#00C8F9] focus:bg-white/15 transition-colors duration-200"
                                />
                                <button
                                    type="submit"
                                    className="shrink-0 bg-[#00C8F9] hover:bg-[#4DDCFF] active:scale-95 text-[#006179] font-bold text-sm rounded-lg px-4 py-2.5 transition-all duration-200"
                                >
                                    Join
                                </button>
                            </form>
                        </div>

                        {/* Quick links */}
                        <div>
                            <h3 className="text-sm font-bold text-[#4DDCFF] mb-4">Product</h3>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="footer-link inline-block text-sm text-[#d6ecf1] hover:text-white transition-colors duration-150">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support links */}
                        <div>
                            <h3 className="text-sm font-bold text-[#4DDCFF] mb-4">Support</h3>
                            <ul className="space-y-3">
                                {supportLinks.map((link) => (
                                    <li key={link.to}>
                                        <Link to={link.to} className="footer-link inline-block text-sm text-[#d6ecf1] hover:text-white transition-colors duration-150">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-sm font-bold text-[#4DDCFF] mb-4">Contact</h3>
                            <ul className="space-y-3 text-sm text-[#d6ecf1]">
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#00C8F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    support@pharmacare.com
                                </li>
                                <li className="flex items-start gap-2">
                                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#00C8F9]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.05 11.05 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    +1 (800) 555-0192
                                </li>
                                <li className="flex gap-3 pt-2">
                                    {socials.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            aria-label={s.label}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#d6ecf1] hover:text-[#006179] hover:bg-[#00C8F9] hover:-translate-y-0.5 transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={s.path} />
                                            </svg>
                                        </a>
                                    ))}
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="text-xs text-[#a8d3de]">&copy; {new Date().getFullYear()} PharmaCare. All rights reserved.</p>
                        <p className="text-xs text-[#a8d3de]">Made for independent pharmacies, everywhere.</p>
                    </div>
                </div>

                {/* Back to top */}
                {showTop && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Back to top"
                        className="back-to-top-enter fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#00C8F9] hover:bg-[#4DDCFF] text-[#006179] shadow-lg flex items-center justify-center transition-colors duration-200 active:scale-90"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
                        </svg>
                    </button>
                )}
            </footer>
        </>
    );
};

export default Footer;
