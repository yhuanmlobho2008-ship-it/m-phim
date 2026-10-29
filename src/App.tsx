import React from 'react';
import { CinemaProvider, useCinema } from './context/CinemaContext';
import { Navbar } from './components/Navbar';
import { HeroMarquee } from './components/HeroMarquee';
import { FeaturedTrailers } from './components/FeaturedTrailers';
import { MovieCatalog } from './components/MovieCatalog';
import { ExperiencesSection } from './components/ExperiencesSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TicketPassModal } from './components/TicketPassModal';
import { MyBookingsModal } from './components/MyBookingsModal';
import { TrailerModal } from './components/TrailerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastContainer } from './components/ToastContainer';

const MainCinemaApp: React.FC = () => {
  const { isAdminOpen } = useCinema();

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans selection:bg-rose-900 selection:text-white">
      {/* Real-time Toast Notifications */}
      <ToastContainer />

      {/* Main Top Bar */}
      <Navbar onScrollToSection={handleScrollToSection} />

      {/* Dynamic View: Landing Page or Admin Portal */}
      {isAdminOpen ? (
        <main className="flex-1">
          <AdminDashboard />
        </main>
      ) : (
        <main className="flex-1">
          {/* Hero Marquee Section */}
          <HeroMarquee />

          {/* Featured Blockbuster Trailers */}
          <FeaturedTrailers />

          {/* 20 Films Catalog: Now Showing & Coming Soon */}
          <MovieCatalog />

          {/* Auditoriums & Formats */}
          <ExperiencesSection />
        </main>
      )}

      {/* Footer */}
      {!isAdminOpen && <Footer />}

      {/* Modals & Dialogs */}
      <BookingModal />
      <TicketPassModal />
      <MyBookingsModal />
      <TrailerModal />
    </div>
  );
};

export default function App() {
  return (
    <CinemaProvider>
      <MainCinemaApp />
    </CinemaProvider>
  );
}
