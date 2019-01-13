export function el<T = HTMLElement>(name: string): T {
  return (document.createElement(name) as unknown) as T;
}
