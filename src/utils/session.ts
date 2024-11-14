import { generateRandomId } from '../store/editorStore';

export const getSessionId = () => {
  // Remove leading slash and get the first path segment
  const path = window.location.pathname.split('/')[1];
  
  if (path && path.length > 0) {
    return path;
  }
  
  const newSessionId = generateRandomId();
  // Use pushState to update URL without reload
  window.history.pushState({}, '', `/${newSessionId}`);
  return newSessionId;
};