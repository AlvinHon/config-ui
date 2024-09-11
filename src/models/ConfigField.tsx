import ConfigPrimitiveValue, { ConfigValue } from "./ConfigValue";
import { ConfigValueType, possibleValueTypes } from "./ConfigValueType";

class ConfigField {
    fieldType: ConfigValueType;
    fieldLabel: string;
    multiple: boolean;
    required: boolean;
    default: ConfigValue;
    options: ConfigValue[];
    description: string;
    private userInputValue: ConfigValue | null = null;

    constructor(params: {
        fieldType: string,
        fieldLabel: string,
        multiple?: boolean,
        required?: boolean,
        default?: ConfigValue,
        options?: ConfigValue[],
        description?: string
    }) {
        this.fieldType = params.fieldType;
        this.fieldLabel = params.fieldLabel;
        this.multiple = params.multiple ?? false;
        this.required = params.required ?? false;
        this.default = params.default ?? null;
        this.options = params.options ?? [];
        this.description = params.description ?? "";
    }

    set userInput(valueString: string) {
        console.log(valueString);
        if (valueString === "" || valueString === null) {
            this.userInputValue = null;
            return;
        }

        if (this.multiple) {
            this.userInputValue = valueString
                .split("\n")
                .map((v) => v.trim())
                .filter((v) => v !== "")
                .map((v) => new ConfigPrimitiveValue(v));
        } else {
            this.userInputValue = new ConfigPrimitiveValue(valueString);
        }
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
            const configFieldObj = {
                fieldLabel: yamlKey,
                fieldType: value['type'],
                ...value
            };
            return new ConfigField(configFieldObj);
        } catch {
            throw new Error("Invalid Input Format");
        }
    }
}

export default ConfigField;