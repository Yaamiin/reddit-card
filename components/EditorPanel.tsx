import React from 'react';
import { CardState } from '../types';
import { Download, Upload, Info, Image as ImageIcon, X, Plus, Clapperboard } from 'lucide-react';

interface EditorPanelProps {
  state: CardState;
  onChange: (key: keyof CardState, value: any) => void;
  onDownload: () => void;
  onDownloadGif: () => void;
  isDownloading: boolean;
  isDownloadingGif: boolean;
  backgroundImage: string | null;
  onBackgroundChange: (url: string) => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ 
  state, 
  onChange, 
  onDownload, 
  onDownloadGif,
  isDownloading,
  isDownloadingGif,
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

  const handleAddTrophy = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newTrophies = [...state.trophies, event.target.result as string];
          onChange('trophies', newTrophies);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset value so same file can be selected again
    e.target.value = '';
  };

  const handleRemoveTrophy = (index: number) => {
    const newTrophies = state.trophies.filter((_, i) => i !== index);
    onChange('trophies', newTrophies);
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

        {/* Trophies Manager */}
        <div className="space-y-2">
          <label className="text-[11px] uppercase tracking-wider font-bold text-gray-500">Trophies & Awards</label>
          <div className="flex flex-wrap gap-2 bg-[#1A1A1B] p-3 rounded-lg border border-[#343536] min-h-[50px]">
            {state.trophies.map((trophy, index) => (
              <div key={index} className="relative group w-8 h-8 bg-black/50 rounded flex items-center justify-center" title={trophy}>
                <img 
                  src={trophy} 
                  alt="Trophy" 
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                     // visual indicator for broken image in editor: Yellow Warning Triangle
                     (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZDMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMTAuMjkgMy44NmwtOC41IDE0LjYzQTExIDE4IDAgMDAzLjUzIDIxaDE2Ljk0YTEgMSAwIDAwLjg4LTEuNTRsLTguNS0xNC42M2ExIDEgMCAwMC0xLjY2IDB6Ii8+PGxpbmUgeDE9IjEyIiB5MT0iOSIgeDI9IjEyIiB5Mj0iMTMiLz48bGluZSB4MT0iMTIiIHkxPSIxNyIgeDI9IjEyLjAxIiB5Mj0iMTciLz48L3N2Zz4=';
                  }} 
                />
                <button 
                  onClick={() => handleRemoveTrophy(index)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-600"
                  title="Remove trophy"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
            
            <label className="w-8 h-8 flex items-center justify-center border border-dashed border-gray-600 rounded cursor-pointer hover:border-gray-400 hover:bg-white/5 transition-colors">
              <Plus size={14} className="text-gray-400" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleAddTrophy}
                className="hidden" 
              />
            </label>
          </div>
          <p className="text-[10px] text-gray-500">Add local files if folder links don't work.</p>
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

      <div className="p-6 border-t border-[#333] flex flex-col gap-3">
        <button 
          onClick={onDownload}
          disabled={isDownloading || isDownloadingGif}
          className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloading ? (
            <span>Processing PNG...</span>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Download PNG</span>
            </>
          )}
        </button>

        <button 
          onClick={onDownloadGif}
          disabled={isDownloading || isDownloadingGif}
          className="w-full flex items-center justify-center gap-2 bg-[#333] text-white font-bold py-3 rounded-full hover:bg-[#444] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isDownloadingGif ? (
            <span>Processing GIF...</span>
          ) : (
            <>
              <Clapperboard className="w-5 h-5" />
              <span>Download GIF (Beta)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};