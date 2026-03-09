import { useState } from 'react';
import './App.css'
import PasswordGate from './components/PasswordGate'
import WelcomePopup from './components/WelcomePopup'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoveMessage from './components/LoveMessage'
import Gallery from './components/Gallery'
import Reasons from './components/Reasons'
import Timeline from './components/Timeline'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MusicPlayer from './components/MusicPlayer'

function App() {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem('unlocked') === 'yes'
  );
  const [showPopup, setShowPopup] = useState(false);

  const handleUnlock = () => {
    sessionStorage.setItem('unlocked', 'yes');
    setUnlocked(true);
  };

  return (
    <>
      <MusicPlayer />
      {unlocked ? (
        <main className="w-full overflow-x-hidden">
          <Navbar />
          <Hero onScrollVisible={() => setShowPopup(true)} />
          <LoveMessage />
          <Gallery />
          <Reasons />
          <Timeline />
          <Footer />
          <ScrollToTop />
          {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
        </main>
      ) : (
        <PasswordGate onUnlock={handleUnlock} />
      )}
    </>
  );
}

export default App
