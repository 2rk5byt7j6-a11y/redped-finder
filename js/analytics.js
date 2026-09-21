(function () {
  "use strict";

  const GA_MEASUREMENT_ID = "G-8VKNXG3CZ3";
  const FINDER_ANALYTICS_DEBUG = false;
  const FINDER_VERSION = "1";
  const ALLOWED_PARENT_ORIGINS = new Set([
    "https://redped.de",
    "https://www.redped.de"
  ]);
  const ALLOWED_EVENTS = new Set([
    "finder_view",
    "finder_start",
    "finder_step",
    "finder_result",
    "finder_product_click"
  ]);
  const ALLOWED_PARAMS = new Set([
    "brand",
    "motor",
    "motor_family",
    "connector",
    "sensor",
    "magnet_type",
    "abs",
    "display",
    "step_number",
    "step_name",
    "selection",
    "result",
    "compatible",
    "result_count",
    "product",
    "destination",
    "product_url"
  ]);

  let analyticsConsent = null;
  let analyticsInitialized = false;
  let finderReady = false;
  let finderViewSent = false;
  let queuedEvents = [];

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });

  function debugLog(eventName, params) {
    if (!FINDER_ANALYTICS_DEBUG) return;
    console.log("[RedPed Finder Analytics]", eventName, params);
  }

  function normalizeString(value) {
    return String(value)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 100);
  }

  function productPath(value) {
    try {
      const url = new URL(String(value), window.location.origin);
      return url.pathname.slice(0, 200);
    } catch (error) {
      return "";
    }
  }

  function cleanParams(params) {
    const clean = {};

    Object.entries(params || {}).forEach(([key, value]) => {
      if (!ALLOWED_PARAMS.has(key) || value === undefined || value === null) return;

      if (key === "product_url") {
        const path = productPath(value);
        if (path) clean[key] = path;
        return;
      }

      if (typeof value === "boolean") {
        clean[key] = value;
        return;
      }

      if (typeof value === "number" && Number.isFinite(value)) {
        clean[key] = value;
        return;
      }

      const normalized = normalizeString(value);
      if (normalized) clean[key] = normalized;
    });

    return {
      ...clean,
      finder_version: FINDER_VERSION,
      finder_hostname: window.location.hostname
    };
  }

  function ensureAnalytics() {
    if (analyticsInitialized) return;
    analyticsInitialized = true;

    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      send_page_view: false,
      cookie_domain: "redped.de",
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      page_location: `${window.location.origin}${window.location.pathname}`,
      page_path: window.location.pathname
    });

    const isLocalPreview = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`
    );
    if (!isLocalPreview && !existingScript) {
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
      document.head.append(script);
    }
  }

  function dispatchEvent(eventName, params) {
    window.gtag("event", eventName, {
      ...params,
      send_to: GA_MEASUREMENT_ID
    });
  }

  function flushQueuedEvents() {
    if (!finderReady || analyticsConsent !== true) return;
    const pending = queuedEvents;
    queuedEvents = [];
    pending.forEach(({ eventName, params }) => {
      if (eventName === "finder_view" && finderViewSent) return;
      dispatchEvent(eventName, params);
    });
  }

  function trackFinderEvent(eventName, params = {}) {
    if (!ALLOWED_EVENTS.has(eventName)) return;

    const clean = cleanParams(params);
    debugLog(eventName, clean);

    if (analyticsConsent === false) {
      return;
    }

    if (!finderReady || analyticsConsent === null) {
      queuedEvents.push({ eventName, params: clean });
    } else if (analyticsConsent === true) {
      ensureAnalytics();
      dispatchEvent(eventName, clean);
    }
  }

  function sendFinderView() {
    if (!finderReady || finderViewSent || analyticsConsent !== true) return;
    finderViewSent = true;
    trackFinderEvent("finder_view");
  }

  function setConsent(granted) {
    analyticsConsent = granted === true;

    if (!analyticsConsent) {
      queuedEvents = [];
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
      return;
    }

    ensureAnalytics();
    sendFinderView();
    flushQueuedEvents();
  }

  function markReady() {
    finderReady = true;
    sendFinderView();
    flushQueuedEvents();
  }

  function requestParentConsent() {
    if (window.parent === window) return;
    window.parent.postMessage(
      { source: "redped-finder", type: "request-analytics-consent" },
      "*"
    );
  }

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent) return;
    if (!ALLOWED_PARENT_ORIGINS.has(event.origin)) return;
    if (
      event.data?.source !== "redped-shop" ||
      event.data?.type !== "analytics-consent" ||
      typeof event.data?.granted !== "boolean"
    ) {
      return;
    }
    setConsent(event.data.granted);
  });

  window.trackFinderEvent = trackFinderEvent;
  window.RedPedFinderAnalytics = {
    markReady,
    requestConsent: requestParentConsent,
    setConsent
  };

  requestParentConsent();
  window.addEventListener("load", requestParentConsent, { once: true });
})();
