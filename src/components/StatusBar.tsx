import { useEditorStore } from '../store/editorStore';

const StatusBar = () => {
  const { currentUser } = useEditorStore();

  return (
    <div className="h-6 bg-[#2b2d30] border-t border-[#1e1f22] flex items-center px-4 text-sm text-gray-400">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span>Connected</span>
      </div>
      <div className="ml-4">
        {currentUser && (
          <span>
            Editing as <span className="text-blue-400">{currentUser.name}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default StatusBar;