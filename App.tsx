import React, { useState } from 'react';
import { CardState } from './types';
import { CardPreview } from './components/CardPreview';
import { EditorPanel } from './components/EditorPanel';
import { downloadCard, downloadGif } from './utils/cardUtils';

const DEFAULT_AVATAR = "https://api.dicebear.com/7.x/avataaars/svg?seed=Zirra";

// Remote URLs - Fixes deployment missing image issues
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
    username: 'Zirra',
    avatarUrl: DEFAULT_AVATAR,
    textContent: '{Teachers}, What\'s the dumbest lie a Student used to [Skip] Class !?',
    likeCount: '99+',
    commentCount: '99+',
    showVerified: true,
    trophies: DEFAULT_TROPHIES
  });

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingGif, setIsDownloadingGif] = useState(false);

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

  const handleDownloadGif = async () => {
    setIsDownloadingGif(true);
    setTimeout(async () => {
      await downloadGif('capture-target', cardState.username || 'galaxy-card-gif');
      setIsDownloadingGif(false);
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
        onDownloadGif={handleDownloadGif}
        isDownloading={isDownloading}
        isDownloadingGif={isDownloadingGif}
        backgroundImage={backgroundImage}
        onBackgroundChange={setBackgroundImage}
      />
      
    </div>
  );
};

export default App;