import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Selection } from "prosemirror-state";
import Chromeless from "@atlaskit/editor-core/dist/es5/ui/Appearance/Chromeless";
import EditorContext from "@atlaskit/editor-core/dist/es5/ui/EditorContext";
import { PortalProvider, PortalRenderer } from "@atlaskit/editor-core/dist/es5/ui/PortalProvider";
import { moveCursorToTheEnd } from "@atlaskit/editor-core/dist/es5/utils";
import { ProviderFactory } from "@atlaskit/editor-common";
import ReactEditorView from "@atlaskit/editor-core/dist/es5/create-editor/ReactEditorView";
import listPlugin from "@atlaskit/editor-core/dist/es5/plugins/lists";
import actionsPlugin from "./plugins/actions";
import imagesPlugin from "./plugins/images";

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
      font-family: "SFMono-Medium", "SF Mono", "Segoe UI Mono", "Roboto Mono", "Ubuntu Mono", Menlo,
        Courier, monospace;
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

    img {
      display: block;
      max-width: 100%;
    }
  }
`;

class ReactEditor extends ReactEditorView {
  getPlugins() {
    return super.getPlugins({}).concat([imagesPlugin, listPlugin, actionsPlugin]);
  }
}

export default class Editor extends React.Component {
  static contextTypes = {
    editorActions: PropTypes.object
  };

  state = { editor: {} };

  constructor(props) {
    super(props);
    this.providerFactory = new ProviderFactory();
  }

  onEditorCreated = editor => {
    this.registerEditorForActions(editor);
    if (!editor.view.hasFocus()) {
      editor.view.focus();
    }

    if (this.props.selection) {
      const selection = Selection.fromJSON(editor.view.state.doc, this.props.selection);
      const tr = editor.view.state.tr.setSelection(selection);
      editor.view.dispatch(tr.scrollIntoView());
    }
  };

  onEditorDestroyed = () => {
    this.unregisterEditorFromActions();
  };

  registerEditorForActions(editor) {
    if (this.context && this.context.editorActions) {
      this.context.editorActions._privateRegisterEditor(
        editor.view,
        editor.eventDispatcher,
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
        <EditorContext editorActions={this.editorActions}>
          <PortalProvider
            render={portalProviderAPI => (
              <React.Fragment>
                <ReactEditor
                  editorProps={{
                    defaultValue: this.props.defaultValue
                  }}
                  portalProviderAPI={portalProviderAPI}
                  providerFactory={this.providerFactory}
                  onEditorCreated={this.onEditorCreated}
                  onEditorDestroyed={this.onEditorDestroyed}
                  render={({ editor, view, eventDispatcher, config }) => (
                    <Chromeless
                      editorDOMElement={editor}
                      editorView={view}
                      providerFactory={this.providerFactory}
                      eventDispatcher={eventDispatcher}
                      popupsMountPoint={this.props.popupsMountPoint}
                      popupsBoundariesElement={document.body}
                      contentComponents={config.contentComponents}
                    />
                  )}
                />
                <PortalRenderer portalProviderAPI={portalProviderAPI} />
              </React.Fragment>
            )}
          />
        </EditorContext>
      </EditorStylesWrapper>
    );
  }
}
