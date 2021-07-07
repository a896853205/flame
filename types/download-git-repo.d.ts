declare module 'download-git-repo' {
  /**
   * Download `repo` to `dest` and callback `fn(err)`.
   *
   * @param {String} repo
   * @param {String} dest
   * @param {Function} fn
   */
  export function download(
    repo: string,
    dest: string,
    fn: (err?: Error) => void
  );
  /**
   * Download `repo` to `dest` and callback `fn(err)`.
   *
   * @param {String} repo
   * @param {String} dest
   * @param {Object} opts
   * @param {Function} fn
   */
  export function download(
    repo: string,
    dest: string,
    opts: object,
    fn: (err?: Error) => void
  );
}
