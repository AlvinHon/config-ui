import { Accordion, AccordionDetails, AccordionSummary, AppBar, Button, List, Paper, Toolbar, Typography } from "@mui/material";
import ConfigFieldSearch from "./ConfigFieldSearch";
import ConfigSection from "../models/ConfigSection";
import ConfigFieldItem from "./ConfigFieldItem";

export default function ConfigList(
    { configSections }: { configSections: ConfigSection[] }
) {


    const exportConfig = () => {
        // TODO
    }

    const exportJSON = () => {
        // TODO
    }

    const exportYAML = () => {
        // TODO
    }

    return (
        <>
            <Paper style={{ maxHeight: "100%", overflow: 'auto' }}>
                {configSections.length === 0 ? (
                    <></>
                ) : (
                    <>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Button color="primary" onClick={exportConfig}>Export Config</Button>
                                <Button color="primary" onClick={exportJSON}>Export JSON</Button>
                                <Button color="primary" onClick={exportYAML}>Export YAML</Button>
                                <Typography sx={{ flexGrow: 1 }}></Typography>
                                <ConfigFieldSearch />
                            </Toolbar>
                        </AppBar>
                        <List>
                            {configSections.map((configSection, index) => (
                                <Accordion key={configSection.name + index}>
                                    <AccordionSummary
                                        expandIcon={<Typography>🔽</Typography>}
                                    >
                                        <Typography variant="h5">
                                            {configSection.name}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        {configSection.fields.map((configField, index) => (
                                            <div key={configField.fieldLabel + index}>
                                                <ConfigFieldItem configField={configField} />
                                            </div>
                                        ))}
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </List>
                    </>
                )}
            </Paper>
        </>
    )
}