import { AlgebraSet, AlgebraSetElement } from "./set.js";

export type AlgebraGroupElement<Element> = AlgebraSetElement<Element> & {
  add(b: Element): AlgebraGroupElement<Element>;
  sub(b: Element): AlgebraGroupElement<Element>;
  neg(): AlgebraGroupElement<Element>;
};

export type AlgebraGroup<Element> = Omit<AlgebraSet<Element>, "element"> & {
  element(arg: Element): AlgebraGroupElement<Element>;
  zero: Element;
  add(a: Element, b: Element): Element;
  sub(a: Element, b: Element): Element;
  neg(a: Element): Element;
};
