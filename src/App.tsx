import { useEffect } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import StatusBar from './components/StatusBar';
import UserModal from './components/UserModal';
import { useEditorStore } from './store/editorStore';
import { getSessionId } from './utils/session';

function App() {
  const { currentUser, theme } = useEditorStore();

  useEffect(() => {
    // Ensure we have a session ID on initial load
    getSessionId();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <TopBar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 bg-[#1e1f22]">
          <Editor />
        </main>
      </div>
      <StatusBar />
      {!currentUser && <UserModal />}
    </div>
  );
}

export default App;