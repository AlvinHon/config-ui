import { CardContent, Checkbox, InputLabel, List, ListItem, Stack, TextField, Typography } from "@mui/material";
import ConfigField from "../models/ConfigField";
import { useEffect, useState } from "react";
import { formatConfigValueString } from "../models/ConfigValue";

export default function ConfigFieldItem(
    { configField }: { configField: ConfigField }
) {
    const [textValue, setTextValue] = useState("");
    const [isEnable, setIsEnable] = useState(false);

    useEffect(() => {
        configField.userInput = textValue;
    }, [textValue, configField]);

    return (
        <>
            <CardContent
                sx={{
                    backgroundColor: '#f9f9f9',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                <Stack direction="column" gap={1} spacing={2}>

                    {/* Input Field - CheckBox and Input Text */}
                    <Stack direction="row">
                        {!configField.required && (
                            <Checkbox
                                value={isEnable}
                                onChange={(e) => {
                                    if (!e.target.checked) {
                                        setTextValue("");
                                    }
                                    setIsEnable(e.target.checked)
                                }}
                            />
                        )}
                        <TextField
                            label={
                                configField.fieldLabel
                                + " (" + configField.fieldType
                                + (configField.multiple ? " array" : "")
                                + ")"
                            }
                            value={textValue}
                            onChange={(e) => { setTextValue(e.target.value) }}
                            multiline={configField.multiple ? true : false}
                            fullWidth
                            disabled={!configField.required && !isEnable}
                        />
                    </Stack>

                    {/* Input Description - Display Text */}
                    <Typography variant="body2">
                        {configField.description}
                    </Typography>

                    {/* Default Value - Display Text */}
                    {configField.default && (
                        <Stack direction="row" spacing={2}>
                            <InputLabel>
                                Default value:
                            </InputLabel>
                            <Typography variant="body2">
                                {formatConfigValueString(configField.default)}
                            </Typography>
                        </Stack>
                    )}

                    {/* Possible Values - Display Options in a List */}
                    {configField.options.length > 0 && (

                        <Stack direction="row" spacing={2}>
                            <InputLabel>
                                Possible values:
                            </InputLabel>
                            <List
                                sx={{
                                    position: 'relative',
                                    flex: 1,
                                    maxHeight: 80,
                                    overflow: 'auto',
                                }}
                            >
                                {configField.options.map((option, index) => (
                                    <ListItem
                                        key={configField.fieldLabel + "option" + index}
                                        disableGutters
                                    >
                                        {formatConfigValueString(option)}
                                    </ListItem>
                                ))}
                            </List>
                        </Stack>
                    )}
                </Stack>

            </CardContent>
        </>
    )
}