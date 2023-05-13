import { AlgebraGroup } from "./group.js";
export type AlgebraRing<Element> = AlgebraGroup<Element> & {
    one: Element;
    mul(a: Element, b: Element): Element;
    inv(a: Element, b: Element): Element;
};
