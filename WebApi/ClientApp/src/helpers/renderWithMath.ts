import katex from "katex";
import "katex/dist/katex.min.css";

const renderWithMath = (htmlContent: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, "text/html");

  doc.querySelectorAll(".math-formula").forEach((element) => {
    const latex = element.getAttribute("data-latex");
    if (latex) {
      try {
        katex.render(latex, element as HTMLElement, {
          throwOnError: false,
        });
      } catch (e) {
        console.error("Lỗi render công thức:", e);
      }
    }
  });

  return doc.body.innerHTML;
};

export default renderWithMath;
