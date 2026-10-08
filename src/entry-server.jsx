import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App.jsx";
import { PRERENDER_ROUTES, SITE_URL, headTags } from "./lib/seo.js";

export { PRERENDER_ROUTES, SITE_URL, headTags };

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
