function preload(fullhref: string, as: string) : void {
  const existingLinkTags = document.getElementsByTagName('link');

  for (let i = 0; i < existingLinkTags.length; i += 1) {
    const tag = existingLinkTags[i];
    const dataHref = tag.getAttribute('data-href') || tag.getAttribute('href');
    if (tag.rel === 'preload' && tag.as === as && (dataHref === fullhref)) {
      return;
    }
  }

  const linkTag = document.createElement('link');
  linkTag.rel = 'preload';
  linkTag.as = as;
  (linkTag as any).timeout = 60;

  linkTag.href = fullhref;
  document.head.appendChild(linkTag);
}

function preloadStyle(fullhref: string) : void {
  preload(fullhref, 'style');
}

function preloadMultiStyles(fullhrefs: string[]) : void {
  fullhrefs.map(preloadStyle);
}

function preloadScript(fullhref: string) : void {
  preload(fullhref, 'script');
}

function preloadMultiScripts(fullhrefs: string[]) : void {
  fullhrefs.map(preloadScript);
}

export {
  preloadStyle,
  preloadMultiStyles,
  preloadScript,
  preloadMultiScripts,
};
