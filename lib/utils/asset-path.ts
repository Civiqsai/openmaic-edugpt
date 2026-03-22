/**
 * Prepend the Next.js basePath to static asset paths.
 * Use for all <img src="..."> and other static asset references.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string): string {
  if (!basePath || !path.startsWith('/')) return path;
  if (path.startsWith(basePath + '/')) return path;
  return `${basePath}${path}`;
}
