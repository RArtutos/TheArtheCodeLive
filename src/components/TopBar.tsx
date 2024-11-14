import { useState } from 'react';
import { Share2 } from 'lucide-react';

const TopBar = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-12 bg-[#2b2d30] border-b border-[#1e1f22] flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="text-white font-semibold">Collaborative Code Editor</div>
        <div className="text-gray-400 text-sm">
          Session: {window.location.pathname.slice(1)}
        </div>
      </div>
      <button
        onClick={handleShare}
        className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        <Share2 size={16} />
        <span>{copied ? 'Copied!' : 'Share'}</span>
      </button>
    </div>
  );
};

export default TopBar;