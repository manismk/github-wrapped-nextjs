export default function Head({ params }) {
  return (
    <>
      <title>Github Wrapped</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <link rel="icon" href="/favicon.ico" />
      <meta
        name="description"
        content={`GithubWrapped 2022 -  Get your Total contriburtion, Active days, longest streak, Most active day, month and more`}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://githubwrapped.netlify.app/" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta propert="twitter:creator" content="@_manismk" />
      <meta
        property="twitter:url"
        content="https://githubwrapped.netlify.app/"
      />
      <meta property="twitter:title" content="Github Wrapped" />
      <meta
        property="twitter:description"
        content="GithubWrapped 2022 -  Get your Total contriburtion, Active days, longest streak, Most active day, month and more"
      />
      <meta
        name="twitter:image:src"
        content={`https://githubwrapped.netlify.app/api/og?username=${params.username}`}
      />
      <meta
        property="twitter:image"
        content={`https://githubwrapped.netlify.app/api/og?username=${params.username}`}
      />
      <meta
        property="og:image"
        content={`https://githubwrapped.netlify.app/api/og?username=${params.username}`}
      />
    </>
  );
}
