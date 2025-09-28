// MathEditorPopup.tsx
import React, { useState } from "react";
// import "mathlive/dist/mathlive.css";
import { MathfieldElement } from "mathlive";

// Đảm bảo MathLive được khai báo nếu dùng trong trình duyệt
if (typeof window !== "undefined" && !window.MathfieldElement) {
  window.MathfieldElement = MathfieldElement;
}

interface Props {
  initialLatex: string;
  onInsert: (latex: string) => void;
  onClose: () => void;
}

const MathEditorPopup: React.FC<Props> = ({
  initialLatex,
  onInsert,
  onClose,
}) => {
  const [latex, setLatex] = useState(initialLatex || "");

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        zIndex: 9999,
        width: "500px",
      }}
    >
      <h3>Nhập công thức toán học</h3>
      <math-field
        style={{ width: "100%", minHeight: "50px", fontSize: "1.2rem" }}
        virtualKeyboardMode="onfocus"
        onInput={(e) => setLatex((e.target as any).value)}
      >
        {latex}
      </math-field>
      <div
        style={{
          marginTop: "12px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
        }}
      >
        <button onClick={() => onInsert(latex)}>Chèn</button>
        <button onClick={onClose}>Hủy</button>
      </div>
    </div>
  );
};

export default MathEditorPopup;
