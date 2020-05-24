import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";
import {
  faBold,
  faUnderline,
  faItalic,
  faQuoteRight,
  faListOl,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";

const StyledToolbar = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 2rem;
`;

const StyledButton = styled.button`
  border: none;
  appearance: none;
  font-size: 1rem;
  background-color: ${(props) =>
    props.isActive ? "lightgrey" : "transparent"};
`;

const inlineStyleButtons = [
  {
    style: "BOLD",
    label: "Bold",
    icon: <FontAwesomeIcon icon={faBold} />,
  },
  {
    style: "ITALIC",
    label: "Italic",
    icon: <FontAwesomeIcon icon={faItalic} />,
  },
  {
    style: "UNDERLINE",
    label: "Underline",
    icon: <FontAwesomeIcon icon={faUnderline} />,
  },
];

const blockTypeButtons = [
  {
    label: "H1",
    block: "header-one",
    icon: null,
  },

  {
    label: "H2",
    block: "header-two",
    icon: null,
  },

  {
    label: "H3",
    block: "header-three",
    icon: null,
  },

  {
    label: "Blockquote",
    block: "blockquote",
    icon: <FontAwesomeIcon icon={faQuoteRight} />,
  },

  {
    label: "Unordered List",
    block: "unordered-list-item",
    icon: <FontAwesomeIcon icon={faListUl} />,
  },

  {
    label: "Ordered List",
    block: "ordered-list-item",
    icon: <FontAwesomeIcon icon={faListOl} />,
  },
  // {
  //   label: "embed",
  //   block: "atomic",
  //   icon: null,
  // },
];

const Toolbar = ({
  applyStyle,
  editorState,
  applyBlockType,
  setEditorState,
}) => {
  const isActiveStyle = (style) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return currentStyle.has(style);
  };

  const isActiveBlock = (block) => {
    return RichUtils.getCurrentBlockType(editorState) === block;
  };

  const handleMouseDown = (e, style) => {
    e.preventDefault();
    applyStyle(style);
  };

  const addVideo = (e) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "media",
      "IMMUTABLE",
      { src: "https://www.youtube.com/watch?v=p1PgNbgWSyY" }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  return (
    <StyledToolbar>
      <StyledButton onMouseDown={(e) => addVideo(e)}>Vid</StyledButton>
      {blockTypeButtons.map((button) => {
        return (
          <StyledButton
            isActive={isActiveBlock(button.block)}
            onMouseDown={(e) => {
              e.preventDefault();
              applyBlockType(button.block);
            }}
          >
            {button.icon || button.label}
          </StyledButton>
        );
      })}
      {inlineStyleButtons.map((button) => {
        return (
          <StyledButton
            onMouseDown={(e) => handleMouseDown(e, button.style)}
            key={button.label}
            isActive={isActiveStyle(button.style)}
          >
            {button.icon}
          </StyledButton>
        );
      })}
    </StyledToolbar>
  );
};

export default Toolbar;
