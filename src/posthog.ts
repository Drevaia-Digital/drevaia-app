// Cargar PostHog vía script tag (como Google Analytics)
// No agrega nada al bundle de JavaScript

export function loadPostHog() {
  if (typeof window === 'undefined') return;
  if ((window as any).posthog) return; // Evitar doble carga

  const POSTHOG_KEY = 'phc_mzCpnNat2hWi3syZRPCqnN3EWvem8tbUKsVSPuj3QhKK';
  const POSTHOG_HOST = 'https://us.i.posthog.com';

  // Crear el script tag
  const script = document.createElement('script');
  script.innerHTML = `
    !function(t,e){var o,n,p,r;e.__SV||window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeature getActiveMatchingSurveys getSurveys onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1}(document,window.posthog||[]);
    posthog.init('${POSTHOG_KEY}',{api_host:'${POSTHOG_HOST}',
      session_recording:{recordCrossOriginIframes:true},
      capture_pageview:true,capture_pageleave:true});
  `;
  document.head.appendChild(script);
}

// Cargar después de 3 segundos O al interactuar
let loaded = false;
const load = () => {
  if (loaded) return;
  loaded = true;
  loadPostHog();
};

setTimeout(load, 3000);
window.addEventListener('scroll', load, { once: true });
window.addEventListener('click', load, { once: true });