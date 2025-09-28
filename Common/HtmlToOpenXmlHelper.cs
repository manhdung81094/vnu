using HtmlAgilityPack;
using DocumentFormat.OpenXml.Wordprocessing;
using DocumentFormat.OpenXml;

public static class HtmlToOpenXmlHelper
{
    public static List<OpenXmlElement> ConvertHtml(string html)
    {
        var doc = new HtmlDocument();
        doc.LoadHtml(html ?? "");

        var result = new List<OpenXmlElement>();

        foreach (var node in doc.DocumentNode.ChildNodes)
        {
            if (node.Name == "table")
            {
                result.Add(ConvertTable(node));
            }
            else
            {
                var paras = ConvertNodeToParagraphs(node);
                result.AddRange(paras);
            }
        }

        return result;
    }


    private static List<Paragraph> ConvertNodeToParagraphs(HtmlNode node)
    {
        var paragraphs = new List<Paragraph>();

        if (node.Name == "p" || node.Name == "#text")
        {
            var para = new Paragraph();
            AppendRuns(para, node);
            paragraphs.Add(para);
        }
        else if (node.Name == "ul" || node.Name == "ol")
        {
            foreach (var li in node.SelectNodes("./li"))
            {
                var para = new Paragraph();
                var runProps = CreateRunProperties();
                if (node.Name == "ul")
                {
                    para.Append(new Run(runProps.CloneNode(true), new Text("• ") { Space = SpaceProcessingModeValues.Preserve }));
                }
                else
                {
                    para.Append(new Run(runProps.CloneNode(true), new Text("- ") { Space = SpaceProcessingModeValues.Preserve }));
                }
                AppendRuns(para, li);
                paragraphs.Add(para);
            }
        }
        else
        {
            foreach (var child in node.ChildNodes)
            {
                paragraphs.AddRange(ConvertNodeToParagraphs(child));
            }
        }

        return paragraphs;
    }

    private static void AppendRuns(Paragraph para, HtmlNode node)
    {
        foreach (var child in node.ChildNodes)
        {
            var run = new Run();
            var runProps = CreateRunProperties();
            ApplyFormatting(runProps, child);

            if (child.NodeType == HtmlNodeType.Text)
            {
                string text = child.InnerText.Replace("\u00A0", " ").Replace("&nbsp;", " ");
                run.Append(runProps);
                run.Append(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
                para.Append(run);
            }
            else
            {
                AppendChildRuns(para, child, runProps);
            }
        }
    }

    private static void AppendChildRuns(Paragraph para, HtmlNode node, RunProperties inheritedProps)
    {
        foreach (var child in node.ChildNodes)
        {
            var run = new Run();
            var runProps = (RunProperties)inheritedProps.CloneNode(true);
            ApplyFormatting(runProps, child);

            if (child.NodeType == HtmlNodeType.Text)
            {
                string text = child.InnerText.Replace("\u00A0", " ").Replace("&nbsp;", " ");
                run.Append(runProps);
                run.Append(new Text(text) { Space = SpaceProcessingModeValues.Preserve });
                para.Append(run);
            }
            else
            {
                AppendChildRuns(para, child, runProps);
            }
        }
    }


    private static void ApplyFormatting(RunProperties props, HtmlNode node)
    {
        var name = node.Name.ToLower();
        if (name == "strong" || name == "b")
            props.Bold = new Bold();
        if (name == "em" || name == "i")
            props.Italic = new Italic();
        if (name == "u")
            props.Underline = new Underline() { Val = UnderlineValues.Single };
    }

    private static RunProperties CreateRunProperties()
    {
        return new RunProperties(
            new RunFonts() { Ascii = "Times New Roman", HighAnsi = "Times New Roman" },
            new FontSize() { Val = "24" } // 13pt
        );
    }

    private static Table ConvertTable(HtmlNode tableNode)
    {
        var table = new Table();

        // Add table properties if needed
        table.Append(new TableProperties(
            new TableBorders(
                new TopBorder { Val = BorderValues.Single, Size = 4 },
                new BottomBorder { Val = BorderValues.Single, Size = 4 },
                new LeftBorder { Val = BorderValues.Single, Size = 4 },
                new RightBorder { Val = BorderValues.Single, Size = 4 },
                new InsideHorizontalBorder { Val = BorderValues.Single, Size = 4 },
                new InsideVerticalBorder { Val = BorderValues.Single, Size = 4 }
            )
        ));

        foreach (var rowNode in tableNode.SelectNodes("./tr"))
        {
            var row = new TableRow();
            foreach (var cellNode in rowNode.SelectNodes("./th|./td"))
            {
                var cell = new TableCell();

                var cellParas = ConvertNodeToParagraphs(cellNode);
                foreach (var para in cellParas)
                {
                    cell.Append(para);
                }

                row.Append(cell);
            }
            table.Append(row);
        }

        return table;
    }

    public static List<Paragraph> ConvertHtmlToParagraphs(string html)
    {
        var paragraphs = new List<Paragraph>();
        var doc = new HtmlAgilityPack.HtmlDocument();
        doc.LoadHtml(html);

        foreach (var node in doc.DocumentNode.ChildNodes)
        {
            var para = new Paragraph();

            var run = new Run();
            var runProps = new RunProperties(
                new RunFonts() { Ascii = "Times New Roman" },
                new FontSize() { Val = "24" } // 13pt
            );

            run.Append(runProps);

            void ProcessNode(HtmlAgilityPack.HtmlNode n, Run parentRun)
            {
                if (n.NodeType == HtmlAgilityPack.HtmlNodeType.Text)
                {
                    parentRun.Append(new Text(n.InnerText) { Space = SpaceProcessingModeValues.Preserve });
                }
                else if (n.Name == "strong" || n.Name == "b")
                {
                    var boldRunProps = new RunProperties(runProps.OuterXml);
                    boldRunProps.Bold = new Bold();
                    var boldRun = new Run(boldRunProps);
                    foreach (var child in n.ChildNodes) ProcessNode(child, boldRun);
                    para.Append(boldRun);
                }
                else
                {
                    foreach (var child in n.ChildNodes) ProcessNode(child, parentRun);
                }
            }

            ProcessNode(node, run);
            para.Append(run);
            paragraphs.Add(para);
        }
        return paragraphs;
    }
}
