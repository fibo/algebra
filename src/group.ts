import { AlgebraSet } from "./set.js"

export type AlgebraGroup<Element> = AlgebraSet<Element> & {
  zero: Element
  add(a: Element, b: Element): Element
  neg(a: Element): Element
}
