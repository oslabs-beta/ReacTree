import $89yE2$react, {useContext as $89yE2$useContext, useMemo as $89yE2$useMemo, useState as $89yE2$useState, useLayoutEffect as $89yE2$useLayoutEffect} from "react";

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $704cf1d3b684cc5c$var$defaultContext = {
    prefix: String(Math.round(Math.random() * 10000000000)),
    current: 0
};
const $704cf1d3b684cc5c$var$SSRContext = /*#__PURE__*/ (0, $89yE2$react).createContext($704cf1d3b684cc5c$var$defaultContext);
function $704cf1d3b684cc5c$export$9f8ac96af4b1b2ae(props) {
    let cur = (0, $89yE2$useContext)($704cf1d3b684cc5c$var$SSRContext);
    let value = (0, $89yE2$useMemo)(()=>({
            // If this is the first SSRProvider, start with an empty string prefix, otherwise
            // append and increment the counter.
            prefix: cur === $704cf1d3b684cc5c$var$defaultContext ? "" : `${cur.prefix}-${++cur.current}`,
            current: 0
        }), [
        cur
    ]);
    return /*#__PURE__*/ (0, $89yE2$react).createElement($704cf1d3b684cc5c$var$SSRContext.Provider, {
        value: value
    }, props.children);
}
let $704cf1d3b684cc5c$var$canUseDOM = Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
function $704cf1d3b684cc5c$export$619500959fc48b26(defaultId) {
    let ctx = (0, $89yE2$useContext)($704cf1d3b684cc5c$var$SSRContext);
    // If we are rendering in a non-DOM environment, and there's no SSRProvider,
    // provide a warning to hint to the developer to add one.
    if (ctx === $704cf1d3b684cc5c$var$defaultContext && !$704cf1d3b684cc5c$var$canUseDOM) console.warn("When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return (0, $89yE2$useMemo)(()=>defaultId || `react-aria${ctx.prefix}-${++ctx.current}`, [
        defaultId
    ]);
}
function $704cf1d3b684cc5c$export$535bd6ca7f90a273() {
    let cur = (0, $89yE2$useContext)($704cf1d3b684cc5c$var$SSRContext);
    let isInSSRContext = cur !== $704cf1d3b684cc5c$var$defaultContext;
    let [isSSR, setIsSSR] = (0, $89yE2$useState)(isInSSRContext);
    // If on the client, and the component was initially server rendered,
    // then schedule a layout effect to update the component after hydration.
    if (typeof window !== "undefined" && isInSSRContext) // This if statement technically breaks the rules of hooks, but is safe
    // because the condition never changes after mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    (0, $89yE2$useLayoutEffect)(()=>{
        setIsSSR(false);
    }, []);
    return isSSR;
}




export {$704cf1d3b684cc5c$export$9f8ac96af4b1b2ae as SSRProvider, $704cf1d3b684cc5c$export$619500959fc48b26 as useSSRSafeId, $704cf1d3b684cc5c$export$535bd6ca7f90a273 as useIsSSR};
//# sourceMappingURL=module.js.map
