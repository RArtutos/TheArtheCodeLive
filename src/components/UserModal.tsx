import { useState } from 'react';
import { useEditorStore, createUser } from '../store/editorStore';

const UserModal = () => {
  const [name, setName] = useState('');
  const { setCurrentUser } = useEditorStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = createUser(name || undefined);
    setCurrentUser(user);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#2b2d30] rounded-lg p-6 w-96">
        <h2 className="text-xl text-white font-semibold mb-4">Welcome!</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full px-3 py-2 bg-[#1e1f22] text-white rounded border border-[#383a3e] focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Start Coding
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;