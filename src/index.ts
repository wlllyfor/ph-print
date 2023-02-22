import { removeOldIframe, createNewIframe } from "./utils/index";
import { insertDomNodes } from "./utils/dom";
import {
  insertLinkLabel,
  insertStyleLabel,
  insertSpecialStyle,
} from "./utils/style";
import { onAllImgLoaded } from "./utils/imgs";
import { DEFAULT_HACK_STYLE } from "./constant/hack-style";

interface PhPrintOptions {
  ignoreDomList: string[];
  upNodesClassName: string[];
  useWaterMark: boolean;
  waterMarkTextList: string[];
  specialCssStr: string;
  iframeId: string;
}

function phPrint(
  domId: string,
  options: PhPrintOptions = {
    ignoreDomList: [],
    upNodesClassName: [""],
    useWaterMark: false,
    waterMarkTextList: [],
    specialCssStr: DEFAULT_HACK_STYLE,
    iframeId: "",
  }
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const {
        ignoreDomList,
        waterMarkTextList,
        specialCssStr,
        iframeId,
        upNodesClassName,
      } = options;

      removeOldIframe(iframeId);

      const ifrWindow = createNewIframe(iframeId).contentWindow!;

      console.log("step1 -> create iframe done");

      insertLinkLabel(ifrWindow);

      console.log("step2 -> insert linkLabel done");

      insertStyleLabel(ifrWindow);

      console.log("step3 -> insert styleLabel done");

      insertSpecialStyle(ifrWindow, specialCssStr + DEFAULT_HACK_STYLE);

      console.log("step4 -> style correct done");

      insertDomNodes(ifrWindow, domId, upNodesClassName, ignoreDomList);

      console.log("step5 -> insert dom done");

      onAllImgLoaded(ifrWindow?.document.body)
        .then((datas) => {
          console.log("step6 -> all img loaded");
          resolve();
          ifrWindow?.print();
        })
        .catch((e) => {
          console.log(e, "img load error");
        });
    } catch (e) {
      reject(e);
    }
  });
}

export default phPrint;
