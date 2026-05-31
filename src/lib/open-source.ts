export interface IOpenSourcePullRequest {
  /** Pull request number, e.g. 3697 */
  number: number
  /** Short title of the contribution */
  title: string
  /** What the change did and why it mattered */
  description: string
  /** Direct link to the merged PR */
  url: string
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
    name: 'Sentry Dart/Flutter SDK',
    repo: 'getsentry/sentry-dart',
    repoUrl: 'https://github.com/getsentry/sentry-dart',
    description:
      'Official crash-reporting SDK for Dart & Flutter. Contributed two production fixes, both merged and shipped to users.',
    stat: '1M+ pub.dev downloads',
    shippedIn: 'v9.21.0',
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
