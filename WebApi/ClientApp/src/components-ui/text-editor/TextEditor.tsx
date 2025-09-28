import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Quill from "quill";

// Đăng ký font tùy chỉnh
const Font = Quill.import("formats/font") as any;
Font.whitelist = ["arial", "times-new-roman", "comic-sans", "courier-new"];
Quill.register(Font, true);

// Đăng ký size tùy chỉnh
const Size = Quill.import("formats/size") as any;
Size.whitelist = ["small", "normal", "large", "huge"];
Quill.register(Size, true);

// Cấu hình toolbar
const modules = {
  toolbar: [
    // [{ font: Font.whitelist }],
    // [{ size: Size.whitelist }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, false] }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

// Định dạng hỗ trợ
const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "header",
  "align",
  "list",
  "bullet",
  "link",
  "image",
  "video",
];

interface TextEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
  initialValue = "",
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        placeholder="Nhập nội dung..."
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default TextEditor;
