
export const sampleTemplate =
  `Unit:
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
`;