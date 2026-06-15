export interface IOpenSourceIssue {
  /** Issue number, e.g. 143238 */
  number: number
  /** Owner/repo the issue lives in (may differ from the PR's repo) */
  repo: string
  /** Direct link to the resolved issue */
  url: string
}

export interface IOpenSourceLink {
  /** Short label, e.g. "pub.dev" or "Changelog" */
  label: string
  /** Destination URL */
  url: string
}

export interface IOpenSourcePullRequest {
  /** Pull request number, e.g. 3697 */
  number: number
  /** Short title of the contribution */
  title: string
  /** What the change did and why it mattered */
  description: string
  /** Direct link to the merged PR */
  url: string
  /** Issue(s) this PR resolved, if any (auto-closed via "Fixes #N") */
  resolves?: IOpenSourceIssue[]
}

export interface IOpenSourceContribution {
  /** Friendly project name, e.g. "Sentry Dart/Flutter SDK" */
  name: string
  /** Repository slug, e.g. "getsentry/sentry-dart" */
  repo: string
  /** Link to the repository */
  repoUrl: string
  /** One-line description of the project */
  description: string
  /** Headline stat for credibility, e.g. "1M+ pub.dev downloads" */
  stat?: string
  /** Release the contributions shipped in, e.g. "v9.21.0" */
  shippedIn?: string
  /** Extra links shown when the card is expanded (pub.dev, changelog, etc.) */
  links?: IOpenSourceLink[]
  /** Merged pull requests */
  pullRequests: IOpenSourcePullRequest[]
}

/**
 * Open-source contributions shown on the homepage.
 *
 * This is intentionally a local typed list rather than a Strapi collection:
 * contributions are low-frequency and the rendering component takes plain
 * props, so moving this to a CMS later only means swapping the data source.
 */
export const openSourceContributions: IOpenSourceContribution[] = [
  {
    name: 'Flutter',
    repo: 'flutter/packages',
    repoUrl: 'https://github.com/flutter/packages',
    description:
      "Flutter's first-party plugins and packages, maintained by the core Flutter team at Google. Contributed a documentation fix, reviewed and merged by the path_provider maintainers.",
    shippedIn: 'path_provider 2.1.6',
    links: [
      { label: 'pub.dev', url: 'https://pub.dev/packages/path_provider' },
      {
        label: 'Changelog',
        url: 'https://pub.dev/packages/path_provider/changelog',
      },
    ],
    pullRequests: [
      {
        number: 11793,
        title: 'Document getDownloadsDirectory null vs. UnsupportedError',
        description:
          'Clarified the path_provider dartdoc so callers know getDownloadsDirectory returns null on supported platforms where no directory exists, versus throwing UnsupportedError on platforms that have no concept of a downloads directory. Approved by stuartmorgan-g and bparrishMines.',
        url: 'https://github.com/flutter/packages/pull/11793',
        resolves: [
          {
            number: 143238,
            repo: 'flutter/flutter',
            url: 'https://github.com/flutter/flutter/issues/143238',
          },
        ],
      },
    ],
  },
  {
    name: 'Supabase Flutter SDK',
    repo: 'supabase/supabase-flutter',
    repoUrl: 'https://github.com/supabase/supabase-flutter',
    description:
      'Official Flutter SDK for Supabase (realtime, auth, postgrest, storage). Contributed a realtime stability fix, merged by the maintainers.',
    links: [
      { label: 'pub.dev', url: 'https://pub.dev/packages/supabase_flutter' },
    ],
    pullRequests: [
      {
        number: 1365,
        title: 'Suppress InvalidJWTToken on channel rejoin',
        description:
          "RealtimeChannel.subscribe() registered an async 'ok' handler that called setAuth without a try/catch, so an expired cached token threw an uncaught FormatException (InvalidJWTToken) when a channel rejoined after the device woke from a long background. Wrapped the call to swallow the benign error on rejoin.",
        url: 'https://github.com/supabase/supabase-flutter/pull/1365',
        resolves: [
          {
            number: 1363,
            repo: 'supabase/supabase-flutter',
            url: 'https://github.com/supabase/supabase-flutter/issues/1363',
          },
        ],
      },
    ],
  },
  {
    name: 'Sentry Dart/Flutter SDK',
    repo: 'getsentry/sentry-dart',
    repoUrl: 'https://github.com/getsentry/sentry-dart',
    description:
      'Official crash-reporting SDK for Dart & Flutter. Contributed two production fixes, both merged and shipped to users.',
    stat: '1M+ pub.dev downloads',
    shippedIn: 'v9.21.0',
    links: [
      { label: 'pub.dev', url: 'https://pub.dev/packages/sentry_flutter' },
      {
        label: 'Changelog',
        url: 'https://pub.dev/packages/sentry_flutter/changelog',
      },
    ],
    pullRequests: [
      {
        number: 3697,
        title: 'runZonedGuarded error propagation',
        description:
          'Fixed an async zone-error handler where rethrown exceptions were silently dropped — restoring uncaught-error reporting for Flutter apps.',
        url: 'https://github.com/getsentry/sentry-dart/pull/3697',
      },
      {
        number: 3698,
        title: 'Web diagnostic logging',
        description:
          'Split log output into platform-specific implementations so Web routes to console.* instead of dart:developer.',
        url: 'https://github.com/getsentry/sentry-dart/pull/3698',
      },
    ],
  },
]
