using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml;
using HtmlToOpenXml;
using DocumentFormat.OpenXml.Packaging;

public static class OpenXmlHelper
{
    public static Paragraph ConvertHtmlToSingleParagraph(HtmlConverter converter, string html)
    {
        var elements = converter.Parse(html);

        var combined = new Paragraph();

        foreach (var block in elements)
        {
            if (block is Paragraph para)
            {
                foreach (var run in para.Elements<Run>())
                {
                    // Tạo Run mới, gán font + size
                    var runProps = new RunProperties(
                        new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                        new FontSize() { Val = "24" } // 13pt * 2
                    );

                    // Copy nội dung gốc
                    var newRun = new Run(runProps.CloneNode(true));
                    foreach (var child in run.ChildElements)
                    {
                        newRun.Append(child.CloneNode(true));
                    }

                    combined.Append(newRun);
                }

                // Sau mỗi đoạn <p> thì thêm xuống dòng
                combined.Append(new Run(new Break()));
            }
        }

        return combined;
    }


}
