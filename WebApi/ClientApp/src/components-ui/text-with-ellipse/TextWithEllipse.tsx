import { Box, TextProps } from '@primer/react';
import React, { useState } from 'react';
interface ITextWithEllipseProps extends TextProps {
    text: string,
    lineNumber?: number,
    allowToggleText?: boolean
}
const TextWithEllipse = (props: ITextWithEllipseProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { text, lineNumber } = props;
    const toggleText = () => {
        if (props.allowToggleText)
            setIsExpanded((prev) => !prev);
    };
    return (
        <Box sx={{ whiteSpace: "pre-line" }}>
            {!isExpanded ? (
                <Box onClick={toggleText}
                    style={{
                        display: "-webkit-box",
                        WebkitLineClamp: lineNumber, // Sử dụng số dòng được truyền vào
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        cursor: "pointer",
                    }}
                    sx={{
                        ...props.sx,
                    }}
                >
                    {text}
                </Box>
            ) : (
                <Box onClick={toggleText}>
                    {text}
                    {/* <span style={{ color: "blue", cursor: "pointer" }}>Ẩn</span> */}
                </Box>
            )}
        </Box>
    );
};

export default TextWithEllipse;