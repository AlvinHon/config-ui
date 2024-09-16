class ConfigValue {
    // The actual value is encapsulated in the `value` field in type `any`
    // so that it supports nested config value.
    value: any;
    constructor(value: any) {
        this.value = value;
    }

    formatToString(): string {
        if (this.value === null) {
            return "null";
        } else if (Array.isArray(this.value)) {
            return this.value
                .map((v) => {
                    if (v instanceof ConfigValue) {
                        return v.formatToString();
                    } else {
                        return v.toString();
                    }
                })
                .join(", ");
        } else {
            return this.value.toString();
        }
    }
}

export default ConfigValue;