import { AppBar, Button, List, Paper, Toolbar, Typography } from "@mui/material";
import ConfigFieldSearch from "./ConfigFieldSearch";
import ConfigSection from "../models/ConfigSection";

export default function ConfigList(
    { configSections }: { configSections: ConfigSection[] }
) {
    return (
        <>
            <Paper style={{ maxHeight: "100%", overflow: 'auto' }}>
                {configSections.length === 0 ? (
                    <></>
                ) : (
                    <>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Button color="primary">Export Config</Button>
                                <Button color="primary">Export JSON</Button>
                                <Button color="primary">Export YAML</Button>
                                <Typography sx={{ flexGrow: 1 }}></Typography>
                                <ConfigFieldSearch />
                            </Toolbar>
                        </AppBar>
                        <List>
                            {configSections.map((configSection, index) => (
                                <div key={configSection.name + index}>
                                    {configSection.name}
                                </div>
                            ))}
                        </List>
                    </>
                )}
            </Paper>
        </>
    )
}