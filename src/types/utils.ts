declare module "*.svg" {
  import { FunctionalComponent, RenderableProps } from "preact"
  const content: FunctionalComponent<{ className?: string }>
  export default content
}
