import React, { useState } from 'react';
import { CardState } from './types';
import { CardPreview } from './components/CardPreview';
import { EditorPanel } from './components/EditorPanel';
import { downloadCard } from './utils/cardUtils';

// Define hosted default paths
const DEFAULT_AVATAR = "https://i.ibb.co/chnnqN3v/default-avatar.jpg";
const DEFAULT_BACKGROUND = "https://i.ibb.co/SwP1cnjd/default-background.jpg";

// Remote URLs for Trophies (Keep these remote or move to assets if you prefer)
const DEFAULT_TROPHIES = [
  'https://i.ibb.co/V0K8Mz3F/Animated-Helpful-512.gif',
  'https://i.ibb.co/ZzFMZfHX/Animated-Cake-512.gif',
  'https://i.ibb.co/9H0KR2v6/Crab-Rave-512.gif',
  'https://i.ibb.co/pjVr90dn/Illuminati-512.gif',
  'https://i.ibb.co/kgS0sDsf/Snoo-Clapping-Premium-512.gif',
  'https://i.ibb.co/7dWStypC/Superheart-512.gif',
  'https://i.ibb.co/KpgGLMnH/Take-My-Power-512.gif'
];

const App: React.FC = () => {
  const [cardState, setCardState] = useState<CardState>({
    username: 'EZRA SHORTS',
    avatarUrl: DEFAULT_AVATAR,
    textContent: '{Teachers}, What\'s the dumbest lie a Student used to [Skip] Class !?',
    likeCount: '99+',
    commentCount: '99+',
    showVerified: true,
    trophies: DEFAULT_TROPHIES
  });

  // Initialize background with the default hosted image
  const [backgroundImage, setBackgroundImage] = useState<string | null>(DEFAULT_BACKGROUND);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleStateChange = (key: keyof CardState, value: any) => {
    setCardState(prev => ({ ...prev, [key]: value }));
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    // Slight delay to allow UI to update if needed
    setTimeout(async () => {
      await downloadCard('capture-target', cardState.username || 'galaxy-card');
      setIsDownloading(false);
    }, 100);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#000] overflow-hidden">
      
      {/* Left Area: Canvas/Preview */}
      <div className="flex-1 h-full overflow-auto flex items-center justify-center bg-[#050505] p-4 relative">
        <div className="absolute inset-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}
        />
        <div className="scale-[0.5] sm:scale-[0.7] md:scale-[0.85] lg:scale-100 transition-transform origin-center">
            <CardPreview 
              data={cardState} 
              id="capture-target" 
              backgroundImage={backgroundImage}
            />
        </div>
      </div>

      {/* Right Area: Controls */}
      <EditorPanel 
        state={cardState} 
        onChange={handleStateChange} 
        onDownload={handleDownload}
        isDownloading={isDownloading}
        backgroundImage={backgroundImage}
        onBackgroundChange={setBackgroundImage}
      />
      
    </div>
  );
};

export default App;