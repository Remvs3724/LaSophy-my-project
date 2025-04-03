import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $getRoot, $getSelection } from 'lexical';
import './editor.css'; // Custom styling

const theme = {
  // You can define CSS classes here if needed
};

const editorConfig = {
  namespace: 'RecommendEditor',
  theme,
  onError(error) {
    console.error('Lexical Error:', error);
  },
  nodes: [],
};

const LexicalEditor = ({ onChange }) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <RichTextPlugin
          contentEditable={<ContentEditable className="editor-input" />}
          placeholder={<div className="editor-placeholder">Write your recommendation...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin
          onChange={(editorState) => {
            editorState.read(() => {
              const root = $getRoot();
              const selection = $getSelection();
              onChange(root.getTextContent());
            });
          }}
        />
      </div>
    </LexicalComposer>
  );
};

export default LexicalEditor;