import { ConfigValueType } from "./ConfigValueType";

class ConfigPrimitiveValue {
    value: ConfigValueType;
    constructor(value: ConfigValueType) {
        this.value = value;
    }
    static fromType(value: any, valueType: ConfigValueType): ConfigPrimitiveValue {
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

export default ConfigPrimitiveValue;
export type { ConfigValue };