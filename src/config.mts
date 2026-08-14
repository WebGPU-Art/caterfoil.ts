import queryString from "query-string";
import isMobilejs from "ismobilejs";

export let coneBackScale = 0.5;

export let isMobile = isMobilejs(window.navigator).any; // TODO test

/** query string */
export const parsedQuery = queryString.parse(location.search);

const phiParsed = parseFloat((parsedQuery["phi"] as string) || "");
export let viewerLookMixAngle = Number.isFinite(phiParsed) ? Math.max(0, Math.min(phiParsed, Math.PI / 2)) : Math.PI / 4;

export let threshold = parseFloat((parsedQuery["threshold"] as string) || "0.016");
