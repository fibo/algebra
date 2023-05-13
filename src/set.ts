export type AlgebraSet<Element> = {
  eq(a: Element, b: Element): boolean
  includes(arg: Element): arg is Element
}
