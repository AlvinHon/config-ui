import { ConfigValueType } from "./ConfigValueType";

class ConfigPrimitiveValue {
    value: ConfigValueType;
    constructor(value: ConfigValueType) {
        this.value = value;
    }
    static fromType(value: any, valueType: ConfigValueType): ConfigPrimitiveValue | null {
        if (value === null || value === undefined) {
            return null;
        }
        switch (valueType) {
            case "string":
                return new ConfigPrimitiveValue(value.toString());
            case "number":
                return new ConfigPrimitiveValue(Number(value));
            case "boolean":
                return new ConfigPrimitiveValue(Boolean(value));
            default:
                throw new Error("Invalid type");
        }
    }
}

type ConfigValue = ConfigPrimitiveValue | ConfigPrimitiveValue[] | null;

function formatConfigValueString(value: ConfigValue): string {
    if (value === null) {
        return "null";
    } else if (Array.isArray(value)) {
        return value.map((v) => formatConfigValueString(v)).join(", ");
    } else {
        return value.value.toString();
    }
}

export default ConfigPrimitiveValue;
export type { ConfigValue };
export { formatConfigValueString };