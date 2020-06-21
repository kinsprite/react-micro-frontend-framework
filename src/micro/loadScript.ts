function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // start chunk loading
    const script = document.createElement('script');
    script.charset = 'utf-8';
    (script as any).timeout = 120;

    script.src = src;

    const releaseMem = () => {
      // avoid mem leaks in IE.
      script.onload = null;
      script.onerror = null;
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
      script.parentNode.removeChild(script);
      const err = new Error(`Loading JS failed.\n(${src})`);
      reject(err);
    };

    timeout = setTimeout(() => {
      onFail();
    }, 120000);

    script.onerror = onFail;
    script.onload = onSuccess;
    document.head.appendChild(script);
  });
}

function loadMultiScripts(multiSrcs: string[]): Promise<boolean[]> {
  const promises = multiSrcs.map(loadScript);
  return Promise.all(promises);
}

export {
  loadScript,
  loadMultiScripts,
};
