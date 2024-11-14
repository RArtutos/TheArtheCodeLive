import { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { WebrtcProvider } from 'y-webrtc';
import { useEditorStore } from '../store/editorStore';
import { getSessionId } from '../utils/session';

const Editor = () => {
  const { theme, currentUser } = useEditorStore();
  const ydoc = useRef<Y.Doc>();
  const provider = useRef<WebrtcProvider>();
  const awareness = useRef<any>();

  useEffect(() => {
    if (!ydoc.current) {
      const sessionId = getSessionId();
      ydoc.current = new Y.Doc();
      provider.current = new WebrtcProvider(`collaborative-editor-${sessionId}`, ydoc.current);
      awareness.current = provider.current.awareness;

      if (currentUser) {
        awareness.current.setLocalState({
          user: currentUser,
          cursor: null,
        });
      }
    }

    return () => {
      provider.current?.destroy();
      ydoc.current?.destroy();
    };
  }, [currentUser]);

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
        value=""
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