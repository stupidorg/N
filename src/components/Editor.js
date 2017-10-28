import React, { PropTypes } from "react";
import styled from "styled-components";
import Chromeless from "@atlaskit/editor-core/dist/es5/editor/ui/Appearance/Chromeless";
import { moveCursorToTheEnd } from "@atlaskit/editor-core/dist/es5/utils";
import ProviderFactory from "@atlaskit/editor-core/dist/es5/providerFactory";
import createEditor from "@atlaskit/editor-core/dist/es5/editor/create-editor/create-editor";
import pastePlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/paste";
import basePlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/base";
import blockTypePlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/block-type";
import placeholderPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/placeholder";
import listPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/lists";
import tablesPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/tables";
import textFormattingPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/text-formatting";
import hyperlinkPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/hyperlink";
import tasksAndDecisionsPlugin from "@atlaskit/editor-core/dist/es5/editor/plugins/tasks-and-decisions";

const EditorStylesWrapper = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  box-sizing: border-box;

  & > div {
    flex: 1;
    padding: 8px 28px 0;

    & > div {
      height: 100%;
    }
  }

  .ProseMirror {
    height: 100%;

    table {
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    & pre {
      font-family: "SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono",
        "Ubuntu Mono", Menlo, Courier, monospace;
      background: #f4f5f7;
      padding: 12px;
      border-radius: 3px;
    }

    & .code,
    & code {
      padding: 2px 4px;
      border-radius: 3px;
      background: #f4f5f7;
      font-size: 12px;
      line-height: 1.4;
    }
  }
`;

const contentTransformer = doc =>
  Promise.resolve({
    content: doc.toJSON(),
    time: Date.now(),
    textContent: doc.textContent,
    size: doc.textContent.length
  });

export default class Editor extends React.Component {
  static contextTypes = {
    editorActions: PropTypes.object
  };

  state = { editor: {} };

  constructor(props) {
    super(props);
    this.providerFactory = new ProviderFactory();
  }

  initEditor = place => {
    if (!place) return;
    const editor = createEditor(
      place,
      [
        pastePlugin,
        basePlugin,
        blockTypePlugin,
        placeholderPlugin,
        listPlugin,
        hyperlinkPlugin,
        tablesPlugin,
        textFormattingPlugin,
        tasksAndDecisionsPlugin
      ],
      this.props,
      this.providerFactory
    );
    this.registerEditorForActions(editor);
    this.setState({ editor });

    if (!editor.editorView.hasFocus()) {
      editor.editorView.focus();
    }

    moveCursorToTheEnd(editor.editorView);
  };

  registerEditorForActions(editor) {
    if (this.context && this.context.editorActions) {
      this.context.editorActions._privateRegisterEditor(
        editor.editorView,
        editor.contentTransformer
      );
    }
  }

  unregisterEditorFromActions() {
    if (this.context && this.context.editorActions) {
      this.context.editorActions._privateUnregisterEditor();
    }
  }

  render() {
    const { editor } = this.state;
    const { editorView, contentComponents, eventDispatcher } = editor;

    return (
      <EditorStylesWrapper>
        <Chromeless
          onUiReady={this.initEditor}
          editorView={editorView}
          providerFactory={this.providerFactory}
          contentComponents={contentComponents}
          eventDispatcher={eventDispatcher}
          popupsMountPoint={this.props.popupsMountPoint}
        />
      </EditorStylesWrapper>
    );
  }
}
