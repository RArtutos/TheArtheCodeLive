import { generateRandomId, initializeSession, useEditorStore } from '../store/editorStore';

export const getSessionId = async () => {
  const path = window.location.pathname.split('/')[1];
  const sessionId = path && path.length > 0 ? path : generateRandomId();
  
  if (!path) {
    window.history.pushState({}, '', `/${sessionId}`);
  }

  const session = await initializeSession(sessionId);
  useEditorStore.getState().setCurrentSession(session);
  
  return sessionId;
};