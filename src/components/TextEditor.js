import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import Toolbar from "./Toolbar";
import VideoEmbed from "./VideoEmbed";

const styleMap = {
  STRIKETHROUGH: {
    textDecoration: "line-through",
  },
};

const myBlockStyleFn = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === "blockquote") {
    return "blockquote";
  }
};

const blockRenderer = (contentBlock) => {
  const type = contentBlock.getType();
  if (type === "atomic") {
    return {
      component: VideoEmbed,
      editable: false,
    };
  }
};

const TextEdtior = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const applyStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const applyBlockType = (type) => {
    setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const setState = (argument) => {
    try {
      setEditorState(argument);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Toolbar
        editorState={editorState}
        setEditorState={setEditorState}
        applyStyle={applyStyle}
        applyBlockType={applyBlockType}
      />
      <Editor
        styleMap={styleMap}
        editorState={editorState}
        onChange={setState}
        blockStyleFn={myBlockStyleFn}
        blockRendererFn={blockRenderer}
      />
    </>
  );
};

export default TextEdtior;
