type ConfigValueType = "string" | "number" | "boolean";

function possibleValueTypes(): ConfigValueType[] {
    return ["string", "number", "boolean"]
}

export { possibleValueTypes }
export type { ConfigValueType };