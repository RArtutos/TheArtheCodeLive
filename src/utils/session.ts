import { generateRandomId } from '../store/editorStore';

export const getSessionId = () => {
  const path = window.location.pathname.slice(1);
  if (path) return path;
  
  const newSessionId = generateRandomId();
  window.history.pushState({}, '', `/${newSessionId}`);
  return newSessionId;
};