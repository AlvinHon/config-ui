import { Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import HeaderPaper from "./components/HeaderPaper";
import ConfigList from "./components/ConfigList";
import React from "react";
import TemplateModal from "./components/TemplateModal";
import ConfigSection from "./models/ConfigSection";

const mainTheme = createTheme({
  palette: {
    mode: 'light',
  }
});


function App() {
  const [configSections, setConfigSections] = React.useState<ConfigSection[]>([]);
  const [openTemplate, setOpenTemplate] = React.useState(false);

  return (

    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Container style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}>
        <Container sx={{ mb: 2 }}>
          <HeaderPaper setOpenTemplate={setOpenTemplate} />
        </Container>

        <Container sx={{ flex: 1 }} >
          <ConfigList configSections={configSections} />
        </Container>

        <TemplateModal
          open={openTemplate}
          setOpen={setOpenTemplate}
          setConfigSections={setConfigSections}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
