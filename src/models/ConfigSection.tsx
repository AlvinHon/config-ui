import ConfigField from "./ConfigField";

class ConfigSection {
    name: string;
    fields: ConfigField[];

    constructor(name: string, fields: ConfigField[]) {
        this.name = name;
        this.fields = fields;
    }

    /**
     * yamlObject is the parsed YAML object from the library `yaml`.
     */
    static fromYamlObject(yamlKey: string, yamlObject: any): ConfigSection {
        // yamlObject should be an object
        if (yamlObject === null || typeof yamlObject !== "object") {
            throw new Error("Invalid YAML object");
        }

        // yamlKey should be a string with length > 0
        if (yamlKey === null || typeof yamlKey !== "string" || yamlKey.length === 0) {
            throw new Error("Invalid YAML key");
        }

        // yamlKey should be a key in yamlObject
        const fieldValue = yamlObject[yamlKey];
        if (fieldValue === undefined || fieldValue === null) {
            throw new Error("Invalid YAML value");
        }

        const fields = Object.entries(fieldValue).map(([fieldKey,]) => {
            try {
                return ConfigField.fromYamlObject(fieldKey, fieldValue);
            } catch (error) {
                throw new Error("Fail at field: " + fieldKey + " - " + error);
            }
        });

        return new ConfigSection(yamlKey, fields);
    }

    toConfigString(): string {
        return "[" + this.name + "]\n" +
            this.fields
                .map((field) => field.toConfigString())
                .filter((fieldString) => fieldString !== null)
                .join("\n");
    }
}

export default ConfigSection;