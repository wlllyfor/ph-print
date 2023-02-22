import { DEFAULT_IFRAME_ID } from "../constant/index";

// 删除旧的 iframe，保证唯一
export function removeOldIframe(iframeId: string = DEFAULT_IFRAME_ID) {
  const oldIframe = document.getElementById(iframeId);
  if (oldIframe) {
    oldIframe.remove();
  }
}

// 创建新的 iframe
export function createNewIframe(
  iframeId: string = DEFAULT_IFRAME_ID
): HTMLIFrameElement {
  const ifr: HTMLIFrameElement = document.createElement("iframe");
  ifr.setAttribute(
    "style",
    "visibility:hidden;width: 1400px;height: 820px;position: absolute;left: -1300px;"
  );
  ifr.setAttribute("id", iframeId);
  document.body.appendChild(ifr);
  return ifr;
}
