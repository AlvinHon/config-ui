# Config UI `(In Progress)`

This is a web application to allow users to create config file by interacting with User Interface. The web application is now deployed at Github Pages [here](https://alvinhon.github.io/config-ui/)!

Users can define a template in `yaml` format. This template specifies how the UI will be rendered to answer questions like:
- what are the fields in the config
- what are their input types
- is it optional or required
- what are the possible values of the field
- etc.

Take the below template as example for creating an UI for linux unit service file.

```yaml
Unit:
  Description:
    type: string
    required: true
    description: Service description
Service:
  ExecStart:
    type: string
    required: true
    description: Commands that are executed when this service is started.
  Restart:
    type: string
    description: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached.
    options: ["no", "on-success", "on-failure", "on-abnormal", "on-watchdog", "on-abort", "always"]
    default: no
Install:
  WantedBy:
    type: string
    required: true
```

Steps to apply it to the Config UI:
1. Click `Open Template`. A form will be opened.
1. Paste the template to the text area in the form.
1. Click the gray area to close the form.
1. Customize the values by interacting with the UI.
1. Click `Export to config`, `Export to json` or `Export to yaml` to download the configuration file with the customized values.