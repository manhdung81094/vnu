using System.Text;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Wordprocessing;
using HtmlAgilityPack;

namespace Common
{
    public static class WordHelper
    {
        public static Table CreateTable<T>(
            List<T> data,
            List<string> headers,
            Func<T, List<string>> mapRowData)
        {
            Table table = new Table();

            // Bảng có viền
            TableProperties tblProps = new TableProperties(
                new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct }, // 100%
                new TableBorders(
                    new TopBorder { Val = BorderValues.Single, Size = 4 },
                    new BottomBorder { Val = BorderValues.Single, Size = 4 },
                    new LeftBorder { Val = BorderValues.Single, Size = 4 },
                    new RightBorder { Val = BorderValues.Single, Size = 4 },
                    new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4 },
                    new InsideVerticalBorder { Val = BorderValues.Single, Size = 4 }
                )
            );
            table.AppendChild(tblProps);

            // Hàng tiêu đề
            TableRow headerRow = new TableRow();
            foreach (var header in headers)
            {
                var cell = new TableCell();

                // Center alignment for header cell
                var cellProps = new TableCellProperties(
                    new TableCellVerticalAlignment { Val = TableVerticalAlignmentValues.Center }
                );
                cell.Append(cellProps);

                // Paragraph with center alignment
                var para = new Paragraph(
                    new ParagraphProperties(
                        new Justification { Val = JustificationValues.Center }
                    )
                );

                // Font: Times New Roman, size 13
                var runProps = new RunProperties(
                    new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                    new FontSize() { Val = "24" } // 13pt * 2
                );

                // Split header by \n and add line breaks
                var lines = header.Split('\n');
                for (int i = 0; i < lines.Length; i++)
                {
                    para.Append(new Run(runProps.CloneNode(true), new Text(lines[i]) { Space = SpaceProcessingModeValues.Preserve }));
                    if (i < lines.Length - 1)
                        para.Append(new Run(runProps.CloneNode(true), new Break()));
                }

                cell.Append(para);
                headerRow.Append(cell);
            }
            table.Append(headerRow);

            // Các dòng dữ liệu
            foreach (var item in data)
            {
                TableRow row = new TableRow();
                var values = mapRowData(item);
                foreach (var value in values)
                {
                    // Use the same font and size for data cells
                    var runProps = new RunProperties(
                        new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                        new FontSize() { Val = "24" }
                    );
                    var run = new Run(runProps, new Text(value ?? "") { Space = SpaceProcessingModeValues.Preserve });
                    var para = new Paragraph(run);
                    row.Append(new TableCell(para));
                }
                table.Append(row);
            }

            return table;
        }

        private static TableCell CreateCell(string text, bool isHeader = false)
        {
            var runProps = new RunProperties(
                new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                new FontSize() { Val = "24" } // 13pt * 2
            );

            var run = new Run(runProps, new Text(text ?? ""));

            var para = new Paragraph(run);

            if (isHeader)
            {
                para.ParagraphProperties = new ParagraphProperties(
                    new Justification() { Val = JustificationValues.Center }
                );
            }

            return new TableCell(para);
        }

        public static void InsertTableAtPlaceholder(Body body, Table table, string placeholder)
        {
            var placeholderPara = body.Descendants<Paragraph>()
                .FirstOrDefault(p => p.InnerText.Contains(placeholder));

            if (placeholderPara == null)
                throw new Exception($"Không tìm thấy placeholder {placeholder}");

            var parent = placeholderPara.Parent;

            if (parent == null)
                throw new Exception($"Placeholder {placeholder} không có Parent.");

            parent.InsertBefore(table, placeholderPara);
            placeholderPara.Remove();
        }

        public static string BuildParagraph<T>(List<T> items, Func<T, string> mapItem)
        {
            StringBuilder sb = new StringBuilder();
            foreach (var item in items)
            {
                var line = mapItem(item);

                // Clean up: bỏ \r, trim, chuyển \r\n -> \n
                line = line.Replace("\r", "").Trim();
                sb.AppendLine($"{line}");
            }
            return sb.ToString();
        }

        public static void ReplaceParagraphAtPlaceholder(Body body, string placeholder, string content)
        {
            foreach (var para in body.Descendants<Paragraph>().ToList())
            {
                var fullText = string.Join("", para.Descendants<Text>().Select(t => t.Text));

                if (fullText.Contains(placeholder))
                {
                    para.RemoveAllChildren<Run>();

                    var lines = content.Split('\n');

                    foreach (var line in lines)
                    {
                        var newPara = new Paragraph();

                        // Clone pPr nếu có
                        if (para.ParagraphProperties != null)
                        {
                            newPara.ParagraphProperties = (ParagraphProperties)para.ParagraphProperties.CloneNode(true);

                            // ❗ Remove Justification cũ nếu có
                            var jc = newPara.ParagraphProperties.Elements<Justification>().FirstOrDefault();
                            if (jc != null)
                            {
                                jc.Remove();
                            }

                            // Gắn Justification LEFT mới
                            newPara.ParagraphProperties.Append(new Justification() { Val = JustificationValues.Left });
                        }
                        else
                        {
                            newPara.ParagraphProperties = new ParagraphProperties(
                                new Justification() { Val = JustificationValues.Left }
                            );
                        }

                        var runProps = new RunProperties(
                            new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                            new FontSize() { Val = "24" }
                        );

                        var run = new Run(
                            runProps,
                            new Text(line) { Space = SpaceProcessingModeValues.Preserve }
                        );

                        newPara.Append(run);

                        para.Parent.InsertBefore(newPara, para);
                    }

                    para.Remove();
                    break;
                }
            }
        }

        public static Paragraph CreateChuongCell(string chuongNoiDung, List<(string noiDung, string hoatDongGv)> subs)
        {
            var para = new Paragraph();

            // Bold chuong.noi_dung
            var boldRunProps = new RunProperties(
                new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                new FontSize() { Val = "24" },
                new Bold()
            );
            para.Append(new Run(boldRunProps.CloneNode(true), new Text(chuongNoiDung ?? "") { Space = SpaceProcessingModeValues.Preserve }));
            para.Append(new Run(new Break())); // New line after bold

            // Each sub: noi_dung + hoat_dong_gv, handle \n
            foreach (var (noiDung, hoatDongGv) in subs)
            {
                var text = (noiDung ?? "") + (string.IsNullOrEmpty(hoatDongGv) ? "" : " " + hoatDongGv);
                var lines = text.Split('\n');
                for (int i = 0; i < lines.Length; i++)
                {
                    para.Append(new Run(
                        new RunProperties(
                            new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                            new FontSize() { Val = "24" }
                        ),
                        new Text(lines[i]) { Space = SpaceProcessingModeValues.Preserve }
                    ));
                    if (i < lines.Length - 1)
                        para.Append(new Run(new Break()));
                }
                para.Append(new Run(new Break())); // New line after each sub
            }

            return para;
        }
        public static Table CreateTableWithParagraphs(
            List<List<OpenXmlElement>> data,
            List<string> headers,
            List<int> columnWidths // thêm tham số width cho từng cột
        )
        {
            var table = new Table();

            TableProperties tblProps = new TableProperties(
                new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct },
                new TableBorders(
                    new TopBorder { Val = BorderValues.Single, Size = 4 },
                    new BottomBorder { Val = BorderValues.Single, Size = 4 },
                    new LeftBorder { Val = BorderValues.Single, Size = 4 },
                    new RightBorder { Val = BorderValues.Single, Size = 4 },
                    new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4 },
                    new InsideVerticalBorder { Val = BorderValues.Single, Size = 4 }
                )
            );
            table.AppendChild(tblProps);

            // 🟢 Thêm TableGrid
            var tableGrid = new TableGrid();
            foreach (var colWidth in columnWidths)
            {
                tableGrid.Append(new GridColumn() { Width = colWidth.ToString() });
            }
            table.Append(tableGrid);

            // Header Row
            var headerRow = new TableRow();
            for (int i = 0; i < headers.Count; i++)
            {
                var cell = new TableCell(
                    new TableCellProperties(
                        new TableCellWidth() { Width = columnWidths[i].ToString(), Type = TableWidthUnitValues.Dxa }
                    )
                );

                var para = new Paragraph(
                    new ParagraphProperties(new Justification { Val = JustificationValues.Center }),
                    new Run(
                        new RunProperties(
                            new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                            new FontSize() { Val = "24" },
                            new Bold()
                        ),
                        new Text(headers[i]) { Space = SpaceProcessingModeValues.Preserve }
                    )
                );
                cell.Append(para);
                headerRow.Append(cell);
            }
            table.Append(headerRow);

            // Data Rows
            foreach (var row in data)
            {
                var tableRow = new TableRow();
                for (int i = 0; i < row.Count; i++)
                {
                    var cell = new TableCell(
                        new TableCellProperties(
                            new TableCellWidth() { Width = columnWidths[i].ToString(), Type = TableWidthUnitValues.Dxa }
                        )
                    );
                    cell.Append(row[i].CloneNode(true));
                    tableRow.Append(cell);
                }
                table.Append(tableRow);
            }

            return table;
        }


        public static Paragraph CreateParagraphWithFont(string text)
        {
            var para = new Paragraph();
            var runProps = new RunProperties(
                new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
                new FontSize() { Val = "24" }
            );
            var lines = (text ?? "").Split('\n');
            for (int i = 0; i < lines.Length; i++)
            {
                para.Append(new Run(runProps.CloneNode(true), new Text(lines[i]) { Space = SpaceProcessingModeValues.Preserve }));
                if (i < lines.Length - 1)
                    para.Append(new Run(new Break()));
            }
            return para;
        }

        public static Paragraph CreateTableCellFromHtml(string html)
        {
            var cell = new Paragraph();
            var elements = HtmlToOpenXmlHelper.ConvertHtml(html);
            foreach (var el in elements)
            {
                if (el is Paragraph para)
                {
                    cell.Append(para);
                }
                else if (el is Table tbl)
                {
                    cell.Append(tbl);
                }
            }
            return cell;
        }
        public static void ReplaceParagraphWithElements(Body body, string placeholder, IEnumerable<OpenXmlElement> newElements)
        {
            var para = body.Descendants<Paragraph>()
                           .FirstOrDefault(p => p.InnerText.Contains(placeholder));

            if (para != null)
            {
                var parent = para.Parent;
                foreach (var newEl in newElements)
                {
                    parent.InsertBefore(newEl.CloneNode(true), para);
                }
                para.Remove();
            }
        }
        public static void ReplaceParagraphWithParagraph(Body body, string placeholder, Paragraph newParagraph)
        {
            var para = body.Descendants<Paragraph>()
                           .FirstOrDefault(p => p.InnerText.Contains(placeholder));

            if (para != null)
            {
                var parent = para.Parent;
                parent.InsertBefore(newParagraph.CloneNode(true), para);
                para.Remove();
            }
            else
            {
                throw new Exception($"Không tìm thấy placeholder {placeholder}");
            }
        }

    }
}
