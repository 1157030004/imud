import ReactDOM from "react-dom";
import React, { Component } from "react";

// import Editorjs from "@editorjs/editorjs";
import EditorJs from "react-editor-js";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Checklist from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
// import SimpleImage from "@editorjs/simple-image";
// import LinkTool from "@editorjs/link";

export class CreatePost extends Component {
  render() {
    return (
      <EditorJs
        tools={{
          header: {
            class: Header,
            inlineToolbar: ["link"],
          },
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          image: {
            class: Image,
            config: {
              endpoints: {
                byFile: "http://localhost:5000/api/v1/posts/:id/photo", // Your endpoint that provides uploading by Url
              },
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          table: {
            class: Table,
            inlineToolbar: true,
          },
          Marker: {
            class: Marker,
            shortcut: "CTRL+SHIFT+M",
          },
          warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: "CTRL+SHIFT+W",
            config: {
              titlePlaceholder: "Title",
              messagePlaceholder: "Message",
            },
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          inlineCode: {
            class: InlineCode,
            shortcut: "CMD+SHIFT+M",
          },
          delimiter: Delimiter,
          code: Code,
          raw: Raw,
        }}
      />
    );
  }
}
export default CreatePost;
