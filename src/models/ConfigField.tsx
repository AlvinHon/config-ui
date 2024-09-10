import { ConfigValue } from "./ConfigValue";
import { ConfigValueType, possibleValueTypes } from "./ConfigValueType";

class ConfigField {
    fieldType: ConfigValueType;
    fieldLabel: string;
    required: boolean;
    defaultValue: ConfigValue;
    options: ConfigValue[];
    description: string;

    constructor(params: {
        fieldType: string,
        fieldLabel: string,
        required?: boolean,
        defaultValue?: ConfigValue,
        options?: ConfigValue[],
        description?: string
    }) {
        this.fieldType = params.fieldType;
        this.fieldLabel = params.fieldLabel;
        this.required = params.required ?? false;
        this.defaultValue = params.defaultValue ?? null;
        this.options = params.options ?? [];
        this.description = params.description ?? "";
    }

    /**
     * yamlObject is the parsed YAML object from the library `yaml`.
     */
    static fromYamlObject(yamlKey: string, yamlObject: any): ConfigField {

        // yamlObject should be an object
        if (yamlObject === null || typeof yamlObject !== "object") {
            throw new Error("Invalid YAML object");
        }

        const value = yamlObject[yamlKey];
        if (value === undefined || value === null) {
            throw new Error("Invalid YAML value");
        }

        // type is required. it should be one of the possible types.
        if (value.type === undefined || !possibleValueTypes().includes(value.type)) {
            throw new Error("Invalid type. Possible types include: " + possibleValueTypes().join(", "));
        }

        try {
            const configFieldObj = { fieldLabel: yamlKey, fieldType: value['type'], ...value };
            return new ConfigField(configFieldObj);
        } catch {
            throw new Error("Invalid Input Format");
        }
    }
}

export default ConfigField;