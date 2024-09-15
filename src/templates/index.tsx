import { sampleTemplate } from "./sample";
import { systemdTemplate } from "./systemd";

export type TemplateSelection = "sample" | "systemd";

export const Templates = {
    "sample": sampleTemplate,
    "systemd": systemdTemplate
}