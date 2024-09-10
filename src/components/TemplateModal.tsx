import { Box, Divider, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { parse } from 'yaml'
import ConfigSection from "../models/ConfigSection";

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

type TemplateSelection = "sample";

function parseTemplate(templateText: string): ConfigSection[] {
    let parseResult = null;
    // parse the YAML text
    try {
        parseResult = parse(templateText);
    } catch {
        throw new Error("Fail to parse YAML");

    }

    if (parseResult === null || typeof (parseResult) !== "object") {
        throw new Error("Invalid YAML object");

    }

    // convert the parsed YAML object to ConfigField objects
    let configSections: ConfigSection[] = [];
    for (const key in parseResult) {
        let configSection;
        try {
            configSection = ConfigSection.fromYamlObject(key, parseResult);
        } catch (error) {
            throw new Error("Fail at section: " + key + " - " + error);
        }
        configSections.push(configSection);
    }

    return configSections;
}

export default function TemplateModal(
    { open, setOpen, setConfigSections }: {
        open: boolean,
        setOpen: (open: boolean) => void,
        setConfigSections: (configFields: ConfigSection[]) => void
    }
) {
    const [templateSelection,] = useState<TemplateSelection>("sample");
    const [templateText, setTemplateText] = useState("");
    const [errorMsg, setErrorMsg] = useState("");


    useEffect(() => {
        if (templateText === "") {
            setConfigSections([]);
            setErrorMsg("");
            return;
        }

        let parsed, errorText = "";
        try {
            parsed = parseTemplate(templateText);
            setConfigSections(parsed);
        } catch (error) {
            errorText = "" + error;
        }

        setErrorMsg(errorText);
    }, [templateText, setConfigSections]);

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <Box sx={{ ...style }} width="50%">
                <Select fullWidth sx={{ mb: 2 }} value={templateSelection} >
                    <MenuItem value="sample">Sample template</MenuItem>
                </Select>
                <Divider sx={{ mb: 2 }} />
                <TextField
                    error={errorMsg.length > 0}
                    helperText={errorMsg}
                    value={templateText}
                    onChange={(e) => setTemplateText(e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    fullWidth
                    multiline
                    rows={10}
                    sx={{ mb: 2 }}
                />
            </Box>


        </Modal>
    )
}