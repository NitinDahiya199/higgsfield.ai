"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * Analytics Component
 *
 * This component handles analytics integration.
 * Currently supports Google Analytics 4.
 *
 * To enable:
 * 1. Add NEXT_PUBLIC_GA_ID to your .env file
 * 2. Uncomment the Google Analytics section below
 *
 * For other analytics providers (Plausible, Mixpanel, etc.):
 * Add their scripts here following the same pattern
 */

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    // Initialize analytics on client side if needed
    if (typeof window !== "undefined" && gaId) {
      // Google Analytics initialization is handled by the Script component below
      // Add any additional client-side analytics initialization here
    }
  }, [gaId]);

  if (!gaId) {
    // Analytics not configured - return null in production, or show a placeholder in dev
    if (process.env.NODE_ENV === "development") {
      console.log("Analytics: No GA_ID configured. Add NEXT_PUBLIC_GA_ID to enable.");
    }
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Add other analytics providers here */}
      {/* 
      Example: Plausible Analytics
      <Script
        strategy="afterInteractive"
        data-domain="yourdomain.com"
        src="https://plausible.io/js/script.js"
      />
      */}

      {/* 
      Example: Mixpanel
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(b=mQuery(b.split("o")[1]))&&b.split(a).length>1&&b.split(a)[1].split("&")[0]}l=c("e",g);i=c("i",g);if(l&&i){b[a].identify(i,{email:l});b[a].people.set({$email:l,$name:l})}}catch(m){}var f,h,k;b.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file://"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\\/\\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";k=e.getElementsByTagName("script")[0];k.parentNode.insertBefore(b,k)}})(document,window.mixpanel||[]);
            mixpanel.init('YOUR_MIXPANEL_TOKEN');
          `,
        }}
      />
      */}
    </>
  );
}
