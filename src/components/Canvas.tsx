import React, { useState, useRef } from 'react';
import { Button, TextField, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import { FormatBold, FormatItalic, FormatUnderlined, Undo, Redo, Add } from '@mui/icons-material';

interface CanvasText {
    id: string;
    text: string;
    x: number;
    y: number;
    fontSize: number;
    fontFamily: string;
    fontStyle: {
        bold: boolean;
        italic: boolean;
        underline: boolean;
    };
}

const Canvas: React.FC = () => {
    const [canvasTexts, setCanvasTexts] = useState<CanvasText[]>([]);
    const [inputText, setInputText] = useState<string>('');
    const [fontSize, setFontSize] = useState<number>(16);
    const [fontFamily, setFontFamily] = useState<string>('Arial');
    const [fontStyle, setFontStyle] = useState({
        bold: false,
        italic: false,
        underline: false
    });
    const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
    const [undoStack, setUndoStack] = useState<CanvasText[][]>([]);
    const [redoStack, setRedoStack] = useState<CanvasText[][]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);

    const saveCurrentState = (currentTexts: CanvasText[]) => {
        setUndoStack(prev => [...prev, currentTexts]);
        setRedoStack([]); // Clear redo stack when a new action is performed
    };

    const handleAddText = () => {
        if (!inputText.trim()) return;
        const newText: CanvasText = {
            id: `text-${Date.now()}`,
            text: inputText,
            x: 100,
            y: 100,
            fontSize: fontSize,
            fontFamily: fontFamily,
            fontStyle: { ...fontStyle }
        };
        saveCurrentState(canvasTexts);
        setCanvasTexts([...canvasTexts, newText]);
        setInputText('');
    };

    const handleUndo = () => {
        if (undoStack.length === 0) return;
        setRedoStack(prev => [...prev, canvasTexts]);
        const lastState = undoStack[undoStack.length - 1];
        setUndoStack(prev => prev.slice(0, -1));
        setCanvasTexts(lastState);
    };

    const handleRedo = () => {
        if (redoStack.length === 0) return;
        setUndoStack(prev => [...prev, canvasTexts]);
        const nextState = redoStack[redoStack.length - 1];
        setRedoStack(prev => prev.slice(0, -1));
        setCanvasTexts(nextState);
    };

    const handleTextDrag = (id: string, event: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        saveCurrentState(canvasTexts);
        const updateTextPosition = (e: MouseEvent) => {
            setCanvasTexts(texts => texts.map(t => t.id === id ? { ...t, x: e.clientX - canvasRect.left, y: e.clientY - canvasRect.top } : t));
        };
        const stopDragging = () => {
            document.removeEventListener('mousemove', updateTextPosition);
            document.removeEventListener('mouseup', stopDragging);
        };
        document.addEventListener('mousemove', updateTextPosition);
        document.addEventListener('mouseup', stopDragging);
        setSelectedTextId(id);
    };

    const updateSelectedTextStyle = (styleUpdate: Partial<CanvasText>) => {
        if (selectedTextId) {
            saveCurrentState(canvasTexts);
            setCanvasTexts(texts => texts.map(t => t.id === selectedTextId ? { ...t, ...styleUpdate } : t));
        }
    };

    const handleStyleToggle = (styleName: keyof CanvasText['fontStyle']) => {
        const newFontStyle = { ...fontStyle, [styleName]: !fontStyle[styleName] };
        setFontStyle(newFontStyle);
        if (selectedTextId) {
            updateSelectedTextStyle({
                fontStyle: {
                    ...fontStyle,
                    [styleName]: !fontStyle[styleName]
                }
            });
        }
    };

    const handleFontSizeChange = (increment: boolean) => {
        const newFontSize = increment ? fontSize + 2 : Math.max(8, fontSize - 2);
        setFontSize(newFontSize);
        if (selectedTextId) { updateSelectedTextStyle({ fontSize: newFontSize }); }
    };

    const handleFontFamilyChange = (family: string) => {
        setFontFamily(family);
        if (selectedTextId) { updateSelectedTextStyle({ fontFamily: family }); }
    };

    const fontFamilies = ['Arial', 'Times New Roman', 'Courier New', 'Verdana', 'Georgia'];

    return (
        <div className="flex flex-col min-h-screen p-4 bg-gray-100">
            {/* Undo/Redo Section */}
            <div className="flex justify-center mb-4">
                <Tooltip title="Undo">
                    <IconButton onClick={handleUndo} disabled={undoStack.length === 0}>
                        <Undo />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Redo">
                    <IconButton onClick={handleRedo} disabled={redoStack.length === 0}>
                        <Redo />
                    </IconButton>
                </Tooltip>
            </div>

            {/* Canvas */}
            <div ref={canvasRef} className="w-[500px] h-[500px] mx-auto bg-white border-2 border-gray-300 relative">
                {canvasTexts.map((textItem) => (
                    <div
                        key={textItem.id}
                        onMouseDown={(e) => handleTextDrag(textItem.id, e)}
                        style={{
                            position: 'absolute',
                            left: `${textItem.x}px`,
                            top: `${textItem.y}px`,
                            fontSize: `${textItem.fontSize}px`,
                            fontFamily: textItem.fontFamily,
                            fontWeight: textItem.fontStyle.bold ? 'bold' : 'normal',
                            fontStyle: textItem.fontStyle.italic ? 'italic' : 'normal',
                            textDecoration: textItem.fontStyle.underline ? 'underline' : 'none',
                            cursor: 'move',
                            border: textItem.id === selectedTextId ? '2px solid blue' : 'none'
                        }}
                    >
                        {textItem.text}
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-4 space-x-4">
                <Select
                    value={fontFamily}
                    onChange={(e) => handleFontFamilyChange(e.target.value as string)}
                    variant="outlined"
                >
                    {fontFamilies.map((family) => (
                        <MenuItem key={family} value={family}>{family}</MenuItem>
                    ))}
                </Select>

                <Button variant="outlined" onClick={() => handleFontSizeChange(false)} > - </Button>
                <span>{fontSize}</span>
                <Button variant="outlined" onClick={() => handleFontSizeChange(true)}> + </Button>

                {/* Font Style Toggles */}
                <Tooltip title="Bold">
                    <IconButton
                        color={fontStyle.bold ? 'primary' : 'default'}
                        onClick={() => handleStyleToggle('bold')}
                    >
                        <FormatBold />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Italic">
                    <IconButton
                        color={fontStyle.italic ? 'primary' : 'default'}
                        onClick={() => handleStyleToggle('italic')}
                    >
                        <FormatItalic />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Underline">
                    <IconButton
                        color={fontStyle.underline ? 'primary' : 'default'}
                        onClick={() => handleStyleToggle('underline')}
                    >
                        <FormatUnderlined />
                    </IconButton>
                </Tooltip>
            </div>

            {/* Text Input Section */}
            <div className="flex justify-center mt-4 space-x-2">
                <TextField
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    label="Enter Text"
                    variant="outlined"
                    fullWidth
                    className="max-w-md"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddText}
                    startIcon={<Add />}
                >
                    Add Text
                </Button>
            </div>
        </div>
    );
};

export default Canvas;