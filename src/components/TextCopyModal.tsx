import { Box, Button, Modal, TextField } from "@mui/material";
import { useState } from "react";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    maxWidth: 800,
    border: '2px solid #000',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function TextCopyModal(
    { text, open, setOpen }: { text: string, open: boolean, setOpen: (open: boolean) => void }
) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setCopied(false)
                setOpen(false)
            }}
        >
            <Box sx={{ ...style }} width="50%">
                <TextField
                    value={text}
                    autoComplete="off"
                    autoCorrect="off"
                    fullWidth
                    multiline
                    rows={10}
                    sx={{ mb: 2 }}
                    aria-readonly
                />
                <Button onClick={copyToClipboard} disabled={copied}>{copied ? "Copied" : "Copy"}</Button>
            </Box>
        </Modal>
    )
}