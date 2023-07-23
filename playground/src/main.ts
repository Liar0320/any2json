import { createAny2JSON } from "any2json-v2";

function onchange(e: Event) {
  const file: File = (e.target as any).files[0];
  const transferService = createAny2JSON(file);

  // parseFile.setFile(file);
  transferService.toJSON(file).then((res) => {
    console.log(res);

    transferService.download(res, file.name);
  });
}

// window.parseFile = parseFile;

window.onchange = onchange;
