import React, { useEffect, useRef, useState } from "react";
import suneditor from "suneditor";
import "suneditor/dist/css/suneditor.min.css";
import { en } from "suneditor/src/lang";
import katex from "katex";
import "katex/dist/katex.min.css";
import "mathlive";

// Import các plugin có sẵn
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  image,
  link,
  list,
  math,
  paragraphStyle,
  table,
  textStyle,
  video,
} from "suneditor/src/plugins";
import { useDebouncedCallback } from "use-debounce";

interface SunEditorCore {
  context: {
    mathPopupHandler?: () => void;
  };
  history: {
    reset: (reset: boolean) => void;
  };
}

interface SunEditorInstance {
  getContents: () => string;
  setContents: (content: string) => void;
  destroy: () => void;
  core: SunEditorCore;
  onBlur?: (e: Event) => void;
  onChange?: (content: string) => void;
  insertImage: (files: FileList) => void;
  insertHTML: (html: string) => void;
  getImagesInfo: () => Array<{ index: number; delete: () => void }>;
}

interface Props {
  contents?: string;
  height?: string;
  onSave?: (contents: string) => void;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

const SunEditorComponent: React.FC<Props> = ({
  contents,
  onSave,
  onBlur,
  onChange,
  height = "200px",
}) => {
  const editorRef = useRef<SunEditorInstance | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isReady, setIsReady] = useState(false);
  const debouncedOnChange = useDebouncedCallback((value: string) => {
    onChange?.(value);
  }, 500); // debounce 500ms
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isReady || !textareaRef.current) return;

    const editor = suneditor.create(textareaRef.current, {
      lang: en,
      iframe: false,
      plugins: [
        align,
        font,
        fontColor,
        fontSize,
        formatBlock,
        hiliteColor,
        horizontalRule,
        image,
        link,
        list,
        math,
        paragraphStyle,
        table,
        textStyle,
        video,
      ],
      buttonList: [
        ["undo", "redo"],
        ["font", "fontSize", "formatBlock"],
        ["paragraphStyle", "blockquote"],
        ["bold", "underline", "italic", "strike", "subscript", "superscript"],
        ["fontColor", "hiliteColor", "textStyle", "removeFormat"],
        ["align", "horizontalRule", "list", "lineHeight"],
        ["table", "link", "image", "video"],
        ["math"],
        ["codeView", "fullScreen", "showBlocks", "preview"],
      ],
      defaultStyle:
        "font-family: Times News Roman, sans-serif; font-size: 14px;",
      katex: {
        src: katex,
        options: {
          throwOnError: false,
          displayMode: true,
        },
      },
      callBackSave: onSave,
      height: height,
      minHeight: "100px",
      imageMultipleFile: true,
    }) as unknown as SunEditorInstance;

    editor.onChange = (content) => {
      debouncedOnChange(content);
    };

    editor.onBlur = () => {
      const value = editor.getContents();
      onBlur?.(value);
    };

    editor.core.context.mathPopupHandler = () => {};

    editorRef.current = editor;

    return () => {
      try {
        editor.destroy();
      } catch (error) {
        console.error("Error destroying editor:", error);
      }
    };
  }, [isReady, debouncedOnChange]);

  useEffect(() => {
    if (editorRef.current && contents !== undefined) {
      try {
        if (contents !== editorRef.current.getContents()) {
          editorRef.current.setContents(contents);
        }
      } catch (error) {
        console.error("Error setting editor contents:", error);
      }
    }
  }, [isReady, contents]);

  return (
    <div className="sun-editor-container">
      <textarea ref={textareaRef} style={{ display: "none" }} />
    </div>
  );
};

export default SunEditorComponent;
