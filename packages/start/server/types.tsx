export type ManifestEntry = {
  type: string;
  href: string;
};

export const FETCH_EVENT = "$FETCH";

export type ContextMatches = {
  originalPath: string;
  pattern: string;
  path: string;
  params: unknown;
};

type TagDescription = {
  tag: string;
  props: Record<string, unknown>;
};

type RouterContext = {
  // router matches;
  matches: ContextMatches[][];
  // redirected url
  url: string;

  // server route fragments
  replaceOutletId: string;
  newOutletId: string;
  partial: boolean;
  nextRoute: any;
  prevRoute: any;
};

export type IslandManifest = {
  script: ManifestEntry;
  assets: ManifestEntry[];
};

declare global {
  interface Env {
    /**
     * BE CAREFUL WHILE USING. AVAILABLE IN PRODUCTION ONLY.
     */
    manifest?: Record<string, ManifestEntry[] | IslandManifest>;
    /**
     * BE CAREFUL WHILE USING. AVAILABLE IN PRODUCTION ONLY.
     */
    getStaticHTML?(path: string): Promise<Response>;
    /**
     * BE CAREFUL WHILE USING. AVAILABLE IN DEVELOPMENT ONLY.
     */
    __dev?: {
      /**
       * @warning
       */
      collectStyles?: (matches: string[]) => Promise<Record<string, string>>;
      manifest?: [{ path: string; componentPath: string; id: string }];
    };
  }
}

export interface FetchEvent {
  request: Request;
  env: Env;
  fetch(url: string, init: RequestInit): Promise<Response>;
}

export interface ServerFunctionEvent extends FetchEvent {
  $type: typeof FETCH_EVENT;
}

export interface PageEvent extends FetchEvent {
  prevUrl: string;
  responseHeaders: Headers;
  routerContext: RouterContext;
  tags: TagDescription[];
  setStatusCode(code: number): void;
  getStatusCode(): number;
  $type: typeof FETCH_EVENT;
  $islands: Set<string>;
}
