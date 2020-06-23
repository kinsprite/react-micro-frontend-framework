interface MetadataExtra {
  defaultRoute?: string;
  [key: string]: any;
}

interface MetadataApp {
  id: string;
  dependencies: string[], // NOT implement yet
  entries: string[],
  routes: string[],
  render: string, // render ID
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
