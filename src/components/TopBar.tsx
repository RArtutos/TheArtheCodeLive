import { useState } from 'react';
import { Share2, Edit2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

const TopBar = () => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { currentSession, updateSessionName } = useEditorStore();

  const handleShare = async () => {
    const shareUrl = window.location.href;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNameUpdate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = e.currentTarget;
      await updateSessionName(input.value);
      setIsEditing(false);
    }
  };

  return (
    <div className="h-12 bg-[#2b2d30] border-b border-[#1e1f22] flex items-center justify-between px-4">
      <div className="flex items-center space-x-4">
        <div className="text-white font-semibold">Collaborative Code Editor</div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              type="text"
              defaultValue={currentSession?.name}
              onKeyDown={handleNameUpdate}
              onBlur={() => setIsEditing(false)}
              autoFocus
              className="bg-[#1e1f22] text-white px-2 py-1 rounded border border-[#383a3e] focus:outline-none focus:border-blue-500"
            />
          ) : (
            <>
              <span className="text-gray-400">{currentSession?.name}</span>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-white"
              >
                <Edit2 size={14} />
              </button>
            </>
          )}
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