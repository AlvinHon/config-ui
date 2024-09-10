type ConfigValueType = string | number | boolean;

function possibleValueTypes(): string[] {
    return ["string", "number", "boolean"]
}

export { possibleValueTypes }
export type { ConfigValueType };