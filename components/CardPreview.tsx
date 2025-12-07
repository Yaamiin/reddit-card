import React from 'react';
import { CardState } from '../types';
import { parseContent } from '../utils/cardUtils';
import { Heart, MessageCircle, BadgeCheck } from 'lucide-react';

interface CardPreviewProps {
  data: CardState;
  id: string;
  backgroundImage?: string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({ data, id, backgroundImage }) => {
  const parsedText = parseContent(data.textContent);

  // Hardcoded trophies to match the vibe of the screenshot
  const trophies = ['🧊', '🤖', '💎', '🛸', '🚀', '👹'];

  // Default to a starry background if none provided
  const bgImage = backgroundImage || "https://images.unsplash.com/photo-1534796636912-3b95b3ab5980?q=80&w=3260&auto=format&fit=crop";

  return (
    <div className="flex items-center justify-center p-8 bg-[#050505] min-h-[400px]">
      <div 
        id={id}
        className="relative w-[600px] overflow-hidden rounded-[24px] shadow-2xl"
        // No fixed aspect ratio - let content dictate height for compactness
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        {/* Card Content - Compact stacking */}
        <div className="relative z-10 flex flex-col p-6">
          
          {/* Header Section */}
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative shrink-0 pt-1">
                <img 
                  src={data.avatarUrl} 
                  alt="Profile" 
                  className="w-[72px] h-[72px] rounded-full object-cover border-[3px] border-white/15 shadow-md bg-[#111]"
                  crossOrigin="anonymous"
                />
            </div>

            {/* User Info */}
            <div className="flex flex-col pt-1.5">
              <div className="flex items-center gap-2">
                <span className="text-white text-[26px] font-black tracking-tighter leading-none drop-shadow-md">
                  @{data.username}
                </span>
                {data.showVerified && (
                  <BadgeCheck className="w-6 h-6 text-[#3BA9EE] fill-[#3BA9EE] text-white" />
                )}
              </div>
              
              <div className="flex items-center gap-1.5 mt-1.5">
                {trophies.map((emoji, idx) => (
                  <span key={idx} className="text-[16px] filter drop-shadow leading-none">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Text Content - Tight spacing */}
          <div className="mt-1 mb-2 pl-1">
            <p className="text-[32px] leading-[1.1] font-black text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight">
              {parsedText.map((part, index) => {
                if (part.type === 'yellow') {
                  return <span key={index} className="text-[#FFFF00]">{part.text}</span>;
                }
                if (part.type === 'cyan') {
                  return <span key={index} className="text-[#00FFFF]">{part.text}</span>;
                }
                return <span key={index}>{part.text}</span>;
              })}
            </p>
          </div>

          {/* Footer stats */}
          <div className="flex items-center justify-between pt-1 opacity-90 pl-1">
            <div className="flex items-center gap-2 text-white drop-shadow-md">
              <Heart className="w-7 h-7 fill-transparent stroke-white stroke-[2.5px]" />
              <span className="text-xl font-bold translate-y-[1px]">{data.likeCount}</span>
            </div>
            
            <div className="flex items-center gap-2 text-white drop-shadow-md">
              <MessageCircle className="w-7 h-7 stroke-white stroke-[2.5px]" />
              <span className="text-xl font-bold translate-y-[1px]">{data.commentCount}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
