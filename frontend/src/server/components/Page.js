import React from 'react';

export const Page = ({ data, markup = '', assets, head }) => {
  const production = process.env.NODE_ENV === 'production';
  return (
    <html lang="en">
      <head>
        { head && head.title.toComponent() }
        { head && head.meta.toComponent() }
        { production && <link rel="stylesheet" href={ assets.styles.main }></link> }
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
