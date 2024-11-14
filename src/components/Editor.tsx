import { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEditorStore } from '../store/editorStore';
import { getSessionId } from '../utils/session';

const Editor = () => {
  const { theme, currentUser, currentSession } = useEditorStore();
  const ydoc = useRef<Y.Doc>();
  const provider = useRef<WebrtcProvider>();
  const awareness = useRef<any>();
  const persistence = useRef<IndexeddbPersistence>();

  useEffect(() => {
    if (!ydoc.current && currentSession) {
      ydoc.current = new Y.Doc();
      
      // Setup IndexedDB persistence
      persistence.current = new IndexeddbPersistence(currentSession.id, ydoc.current);
      
      // Configure WebRTC with more reliable settings
      provider.current = new WebrtcProvider(`collaborative-editor-${currentSession.id}`, ydoc.current, {
        signaling: [
          'wss://signaling.yjs.dev',
          'wss://y-webrtc-signaling-eu.herokuapp.com',
          'wss://y-webrtc-signaling-us.herokuapp.com'
        ],
        password: null,
        awareness: awareness.current,
        maxConns: 20 + Math.floor(Math.random() * 15),
        filterBcConns: false,
        peerOpts: {
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:global.stun.twilio.com:3478' }
            ]
          }
        }
      });

      awareness.current = provider.current.awareness;

      if (currentUser) {
        awareness.current.setLocalState({
          user: currentUser,
          cursor: null,
        });
      }

      // Save content to Firebase when changes occur
      const ytext = ydoc.current.getText('codemirror');
      ytext.observe(() => {
        setDoc(doc(db, 'sessions', currentSession.id), {
          ...currentSession,
          content: ytext.toString(),
          lastModified: Date.now(),
        });
      });
    }

    return () => {
      if (provider.current) {
        provider.current.destroy();
      }
      if (persistence.current) {
        persistence.current.destroy();
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [currentUser, currentSession]);

  const extensions = [
    javascript({ jsx: true, typescript: true }),
    python(),
    theme === 'dark' ? oneDark : [],
  ];

  if (ydoc.current) {
    const ytext = ydoc.current.getText('codemirror');
    extensions.push(
      yCollab(ytext, awareness.current, { user: currentUser })
    );
  }

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={currentSession?.content || ""}
        height="100%"
        theme={theme}
        extensions={extensions}
        className="h-full text-base"
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          history: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </div>
  );
};

export default Editor;