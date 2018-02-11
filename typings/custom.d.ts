declare module "*.svg" {
  import { SFC, ReactSVGElement } from 'react'

  const content: SFC<{className: string}>;
  export default content;
}