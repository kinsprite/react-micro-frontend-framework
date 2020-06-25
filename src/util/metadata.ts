interface MetadataExtra {
  defaultRoute?: string;
  [key: string]: any;
}

export interface MetadataRender {
  renderId: string, // 'root' or others string. 'root' will render on root's router switch
  routePath: string, // as 'path' in 'react-router'
  componentKey: string, // component key which registered by registerApp()
}

interface MetadataApp {
  id: string;
  dependencies: string[], // NOT implement yet
  entries: string[],
  renders: MetadataRender[],
}

interface Metadata {
  apps: MetadataApp[],
  extra: MetadataExtra,
}

export function getMetadata() : Metadata {
  return (window as any).rmfMetadataJSONP || {};
}

export function getMetadataApps() : MetadataApp[] {
  return getMetadata().apps || [];
}

export function getMetadataExtra() : MetadataExtra {
  return getMetadata().extra || {};
}
