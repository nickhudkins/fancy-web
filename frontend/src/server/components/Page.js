import React from 'react';

const analyticsSnippet = (googleAnalyticsId) => (
`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '${googleAnalyticsId}', 'auto'); ga('send', 'pageview');`);

export const Page = ({ data, googleAnalyticsId, markup = '', assets, head }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const analytics = isProduction && googleAnalyticsId !== 'UA-XXXXXXX-X' &&
    <script
      dangerouslySetInnerHTML={{ __html: analyticsSnippet(googleAnalyticsId) }}
    />;
  return (
    <html lang="en">
      <head>
        { head && head.title.toComponent() }
        { head && head.meta.toComponent() }
        { isProduction && <link rel="stylesheet" href={ assets.styles.main }></link> }
        { analytics }
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
        {data &&
          <script
            id="preloadedData"
            type="application/json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/\//g, '\\/') }}
          ></script>
        }
        <script src={assets.javascript['common.js']}></script>
        <script src={assets.javascript.main}></script>
      </body>
    </html>
  );
};
