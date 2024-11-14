import { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { WebrtcProvider } from 'y-webrtc';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEditorStore } from '../store/editorStore';

const Editor = () => {
  const { theme, currentUser, currentSession } = useEditorStore();
  const ydoc = useRef<Y.Doc>();
  const provider = useRef<WebrtcProvider>();
  const awareness = useRef<any>();

  useEffect(() => {
    if (!currentSession?.id || !currentUser) return;

    // Initialize Y.js document
    ydoc.current = new Y.Doc();
    const ytext = ydoc.current.getText('codemirror');

    // Set up WebRTC provider
    provider.current = new WebrtcProvider(`room-${currentSession.id}`, ydoc.current, {
      signaling: ['wss://signaling.yjs.dev'],
      password: null,
      awareness: awareness.current,
      maxConns: 30,
      filterBcConns: true,
      peerOpts: {
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            {
              urls: 'turn:relay.metered.ca:80',
              username: 'e899095c10ee55f5f17b17e2',
              credential: 'uWdWNnxuqy/sGLrI',
            },
            {
              urls: 'turn:relay.metered.ca:443',
              username: 'e899095c10ee55f5f17b17e2',
              credential: 'uWdWNnxuqy/sGLrI',
            },
          ]
        }
      }
    });

    // Set up awareness
    awareness.current = provider.current.awareness;
    awareness.current.setLocalState({
      user: currentUser,
      cursor: null
    });

    // Set up Firebase sync
    const docRef = doc(db, 'sessions', currentSession.id);

    // Initial content load
    const loadInitialContent = async () => {
      const snapshot = await onSnapshot(docRef, (doc) => {
        const data = doc.data();
        if (data?.content && ytext.toString() !== data.content) {
          ytext.delete(0, ytext.length);
          ytext.insert(0, data.content);
        }
      });

      return snapshot;
    };

    // Save changes to Firebase
    const saveToFirebase = () => {
      const content = ytext.toString();
      setDoc(docRef, {
        id: currentSession.id,
        name: currentSession.name,
        content,
        lastModified: Date.now()
      });
    };

    // Observe changes and save to Firebase
    const observer = () => {
      saveToFirebase();
    };

    ytext.observe(observer);
    const unsubscribe = loadInitialContent();

    // Cleanup
    return () => {
      ytext.unobserve(observer);
      unsubscribe();
      if (provider.current) {
        provider.current.destroy();
      }
      if (ydoc.current) {
        ydoc.current.destroy();
      }
    };
  }, [currentSession?.id, currentUser]);

  if (!currentSession || !currentUser) {
    return null;
  }

  const extensions = [
    javascript({ jsx: true, typescript: true }),
    python(),
    theme === 'dark' ? oneDark : []
  ];

  if (ydoc.current && awareness.current) {
    const ytext = ydoc.current.getText('codemirror');
    extensions.push(
      yCollab(ytext, awareness.current, { user: currentUser })
    );
  }

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={currentSession.content || ''}
        height="100%"
        theme={theme}
        extensions={extensions}
        className="h-full text-base"
        onChange={(value) => {
          if (ydoc.current) {
            const ytext = ydoc.current.getText('codemirror');
            if (ytext.toString() !== value) {
              ytext.delete(0, ytext.length);
              ytext.insert(0, value);
            }
          }
        }}
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