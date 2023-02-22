// 所有图片加载完之后，再打印
export async function onAllImgLoaded(
  root: HTMLElement | HTMLImageElement
): Promise<HTMLImageElement[]> {
  const imgNodes =
    root instanceof HTMLImageElement ? [root] : root.querySelectorAll("img");

  let imgArr = Array.from(imgNodes).filter((img) => {
    const isNull = img.getAttribute("src") === "";
    const isWrongBase64Url =
      (img.getAttribute("src")?.indexOf("data:image/png;64") ?? -1) > -1;
    return !isNull && !isWrongBase64Url;
  });

  return (await Promise.all(
    imgArr.map(async (img) => {
      try {
        return await new Promise<HTMLImageElement>((resolve) => {
          img.addEventListener("load", () => {
            resolve(img);
          });
          // 即使加载出错，也 resolve 出去，不然某一张图片没加载出来就会导致整个流程受阻，加载出错的图片有默认占位符
          img.addEventListener("error", () => {
            resolve(img);
          });
        });
      } catch (e) {
        console.log(e, "img load error");
      }
    })
  )) as HTMLImageElement[];
}
