export class ErrorCannotDivideByZero extends TypeError {
    constructor() {
        super("Cannot divide by zero");
    }
}
export class ErrorElementDimension extends TypeError {
    constructor() {
        super("Element dimension is not compatible");
    }
}
export class ErrorElementHasNoInverse extends TypeError {
    constructor() {
        super("Element has no inverse");
    }
}
export class ErrorInvalidDimension extends TypeError {
    constructor() {
        super("Invalid dimension");
    }
}
