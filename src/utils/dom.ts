/**
 * 插入 DOM 节点
 * 需要传入打印的元素的父节点的 class 集合，不然可能会导致页面打印出来样式有缺失
 *
 * upNodesClassName: ['root', 'a', 'b']
 */

export function insertDomNodes(
  ifrWindow: Window,
  domId: string,
  upNodesClassName: string[],
  ignoreDomList: string[]
) {
  const originNode = document.getElementById(domId);

  if (!originNode) {
    throw new Error(`Element with ID '${domId}' not found`);
  }

  const node = originNode.cloneNode(true);

  let firstNode = document.createElement("div");
  firstNode.setAttribute("class", upNodesClassName[0]);

  let standardNode = document.createElement("div");
  // 172mm是A4去除了页边距的宽度
  standardNode.setAttribute("style", "width: 172mm");
  ifrWindow.document.body.appendChild(standardNode);
  // 类似于操作链表，把头节点赋值给临时节点，操作临时节点，最后返回头节点即可
  let tempNode = firstNode;
  upNodesClassName.slice(1).forEach((item) => {
    let div = document.createElement("div");
    div.setAttribute("class", item);
    tempNode.appendChild(div);
    tempNode = tempNode.childNodes[0] as HTMLDivElement;
  });
  tempNode.appendChild(node);
  // 把需要忽略的节点隐藏起来，不打印
  Array.isArray(ignoreDomList) &&
    ignoreDomList.length > 0 &&
    ignoreDomList.forEach((item) => {
      const nodes = firstNode.getElementsByClassName(item);
      nodes?.[0]?.setAttribute("style", "display:none;");
    });

  /**
   * 根据比例缩放表格
   */
  const standard = standardNode.offsetWidth;
  const scale = originNode?.getBoundingClientRect().width! / standard; // 650是A4在IE上的宽度
  // if (firstNode.querySelector('col').)
  Array.from(firstNode.querySelectorAll("col")).forEach((col) => {
    let width = col.getAttribute("width");
    if (width) {
      let calc = parseFloat(width) / scale;
      col.setAttribute("width", (calc < 36 ? 36 : calc).toFixed(0));
    }
  });
  ifrWindow.document.body.removeChild(standardNode);
  ifrWindow.document.body.appendChild(firstNode);
}
