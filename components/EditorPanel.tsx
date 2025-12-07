import React from 'react';
import { CardState } from '../types';
import { Download, Upload, Info, Image as ImageIcon } from 'lucide-react';

interface EditorPanelProps {
  state: CardState;
  onChange: (key: keyof CardState, value: any) => void;
  onDownload: () => void;
  isDownloading: boolean;
  backgroundImage: string | null;
  onBackgroundChange: (url: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ 
  state, 
  onChange, 
  onDownload, 
  isDownloading,
  backgroundImage,
  onBackgroundChange
}) => {
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange('avatarUrl', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onBackgroundChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full md:w-[400px] bg-[#111] border-l border-[#333] h-screen overflow-y-auto flex flex-col shadow-2xl z-20">
      <div className="p-6 border-b border-[#333]">
        <h2 className="text-xl font-bold text-white mb-1">Galaxy Card Editor</h2>
        <p className="text-gray-400 text-xs">Create viral social posts.</p>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">
        
        {/* Username */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Username</label>
          <div className="flex gap-2">
             <input 
              type="text" 
              value={state.username}
              onChange={(e) => onChange('username', e.target.value)}
              className="w-full bg-[#1A1A1B] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="checkbox" 
              id="verified"
              checked={state.showVerified}
              onChange={(e) => onChange('showVerified', e.target.checked)}
              className="rounded bg-[#1A1A1B] border-[#343536]"
            />
            <label htmlFor="verified" className="text-sm text-gray-400 cursor-pointer select-none">Show Verified Badge</label>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Message Content</label>
            <div className="group relative">
                <Info className="w-4 h-4 text-gray-500 cursor-help" />
                <div className="absolute right-0 bottom-full mb-2 w-48 p-3 bg-gray-800 text-xs text-gray-200 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    Use <b>&#123;text&#125;</b> for <span className="text-yellow-300">Yellow</span>.<br/>
                    Use <b>[text]</b> for <span className="text-cyan-300">Cyan</span>.
                </div>
            </div>
          </div>
          <textarea 
            value={state.textContent}
            onChange={(e) => onChange('textContent', e.target.value)}
            className="w-full bg-[#1A1A1B] border border-[#343536] text-white p-3 rounded-lg min-h-[120px] focus:outline-none focus:border-blue-500 transition-colors font-sans text-base leading-relaxed"
            placeholder="Type your story here..."
          />
          <div className="flex gap-2 text-xs text-gray-500 font-mono">
            <span>&#123;Yellow&#125;</span>
            <span>[Cyan]</span>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-4">
            {/* Avatar */}
            <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Avatar</label>
            <div className="relative group cursor-pointer h-[80px]">
                <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[#343536] rounded-lg bg-[#1A1A1B] hover:border-blue-500 transition-colors">
                    <Upload className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-300">Upload</span>
                </div>
                <input 
                type="file" 
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            </div>

            {/* Background */}
            <div className="space-y-2">
            <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Background</label>
            <div className="relative group cursor-pointer h-[80px]">
                <div className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[#343536] rounded-lg bg-[#1A1A1B] hover:border-blue-500 transition-colors">
                    <ImageIcon className="w-5 h-5 text-gray-400 mb-1" />
                    <span className="text-[10px] text-gray-300">Upload</span>
                </div>
                <input 
                type="file" 
                accept="image/*"
                onChange={handleBackgroundChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
            </div>
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Likes</label>
                <input 
                  type="text" 
                  value={state.likeCount}
                  onChange={(e) => onChange('likeCount', e.target.value)}
                  className="w-full bg-[#1A1A1B] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Comments</label>
                <input 
                  type="text" 
                  value={state.commentCount}
                  onChange={(e) => onChange('commentCount', e.target.value)}
                  className="w-full bg-[#1A1A1B] border border-[#343536] text-white p-3 rounded-lg focus:outline-none focus:border-blue-500"
                />
             </div>
        </div>

      </div>

      <div className="p-6 border-t border-[#333]">
        <button 
          onClick={onDownload}
          disabled={isDownloading}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <span>Processing...</span>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download Image</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
