function loadStyle(fullhref: string) : Promise<boolean> {
  return new Promise((resolve, reject) => {
    const existingLinkTags = document.getElementsByTagName('link');
    for (let i = 0; i < existingLinkTags.length; i += 1) {
      const tag = existingLinkTags[i];
      const dataHref = tag.getAttribute('data-href') || tag.getAttribute('href');
      if (tag.rel === 'stylesheet' && (dataHref === fullhref)) {
        resolve(true);
        return;
      }
    }

    const existingStyleTags = document.getElementsByTagName('style');
    for (let i = 0; i < existingStyleTags.length; i += 1) {
      const tag = existingStyleTags[i];
      const dataHref = tag.getAttribute('data-href');
      if (dataHref === fullhref) {
        resolve(true);
        return;
      }
    }

    const linkTag = document.createElement('link');
    linkTag.rel = 'stylesheet';
    linkTag.type = 'text/css';
    (linkTag as any).timeout = 60;

    const releaseMem = () => {
      // avoid mem leaks in IE.
      linkTag.onload = null;
      linkTag.onerror = null;
    };

    let timeout = null;

    const onSuccess = () => {
      releaseMem();
      clearTimeout(timeout);
      resolve(true);
    };

    const onFail = () => {
      releaseMem();
      clearTimeout(timeout);
      linkTag.parentNode.removeChild(linkTag);
      const err = new Error(`Loading CSS failed.\n(${fullhref})`);
      reject(err);
    };

    timeout = setTimeout(() => {
      onFail();
    }, 60000);

    linkTag.onload = onSuccess;
    linkTag.onerror = onFail;
    linkTag.href = fullhref;

    const head = document.getElementsByTagName('head')[0];
    head.appendChild(linkTag);
  });
}

function loadMultiStyles(fullhrefs: string[]) : Promise<boolean[]> {
  const promises = fullhrefs.map(loadStyle);
  return Promise.all(promises);
}

export {
  loadStyle,
  loadMultiStyles,
};
