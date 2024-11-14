import { useState } from 'react';
import {
  Users,
  Share2,
  Settings,
  Moon,
  Sun,
  Download,
  Copy,
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

const Sidebar = () => {
  const { theme, toggleTheme, users } = useEditorStore();
  const [showUsers, setShowUsers] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleDownload = () => {
    // Implementation for downloading code
  };

  return (
    <div className="w-12 bg-[#2b2d30] flex flex-col items-center py-4 border-r border-[#1e1f22]">
      <button
        className="p-2 text-gray-400 hover:text-white mb-4 relative"
        onClick={() => setShowUsers(!showUsers)}
      >
        <Users size={20} />
        {users.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {users.length}
          </span>
        )}
      </button>

      <button
        className="p-2 text-gray-400 hover:text-white"
        onClick={handleShare}
        title="Share session"
      >
        <Share2 size={20} />
      </button>

      <button
        className="p-2 text-gray-400 hover:text-white"
        onClick={handleDownload}
        title="Download code"
      >
        <Download size={20} />
      </button>

      <div className="flex-grow" />

      <button
        className="p-2 text-gray-400 hover:text-white"
        onClick={toggleTheme}
        title="Toggle theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <button 
        className="p-2 text-gray-400 hover:text-white"
        title="Settings"
      >
        <Settings size={20} />
      </button>

      {showUsers && (
        <div className="absolute left-12 top-0 bg-[#2b2d30] border border-[#1e1f22] rounded-r-lg p-4 w-64 shadow-lg">
          <h3 className="text-white font-semibold mb-4">Active Users</h3>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-2 text-gray-300"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: user.color }}
                />
                <span>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;