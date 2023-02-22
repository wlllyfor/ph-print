// 插入 link 标签
export function insertLinkLabel(ifrWindow: Window) {
  let linkNodes = document.getElementsByTagName("link");
  for (let i = 0; i < linkNodes.length; i++) {
    ifrWindow.document.head.appendChild(linkNodes[i]);
  }
}

// 插入 style 标签
export function insertStyleLabel(ifrWindow: Window) {
  let styleNodes = Array.from(document.getElementsByTagName("style"));
  for (let i = 0; i < styleNodes.length; i++) {
    const item = styleNodes[i].cloneNode(true);
    ifrWindow.document.head.appendChild(item);
  }
}

// 插入特殊样式
// 在一些特殊情况下，有些样式会出问题，传入样式字符串去修正
export function insertSpecialStyle(ifrWindow: Window, specialCssStr: string) {
  let specialStyleNode = document.createElement("style");
  specialStyleNode.setAttribute("type", "text/css");
  specialStyleNode.innerHTML = specialCssStr;
  ifrWindow.document.head.appendChild(specialStyleNode);
}
