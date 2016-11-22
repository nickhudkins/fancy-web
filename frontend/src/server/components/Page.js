import React from 'react';
import config from '../../../config';

const analyticsSnippet = ({ googleAnalyticsId }) => {
  return (
  `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', '${googleAnalyticsId}', 'auto'); ga('send', 'pageview');`
  );
};

const pageConfig = ({ apiEndpoint }) => (
  `__API_ENDPOINT__ = "${apiEndpoint}";`
);

export const Page = ({ data, markup = '', assets, head }) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const analytics = isProduction && config.googleAnalyticsId !== 'UA-XXXXXXX-X' && (
    <script dangerouslySetInnerHTML={{ __html: analyticsSnippet(config) }} />
  );
  return (
    <html lang="en">
      <head>
        { head && head.title.toComponent() }
        { head && head.meta.toComponent() }
        <script dangerouslySetInnerHTML={{ __html: pageConfig(config) }}></script>
        { assets.style && <style dangerouslySetInnerHTML={{ __html: assets.style }}></style> }
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
        <script src="https://cdn.ravenjs.com/3.0.4/raven.min.js"></script>
        <script src={assets.javascript.vendor}></script>
        <script src={assets.javascript.app}></script>
      </body>
    </html>
  );
};
