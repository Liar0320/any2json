import { XMLAdapater } from "../src";

describe("test fileType.xml", () => {
  test("test fileType.xml", async () => {
    const adapater = new XMLAdapater();
    const resultText = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xxx>
  <ccc name="app_name">应用列表</ccc>
  <string name="app_deleting">卸载中...</string>
  <string name="app_delete_success">卸载成功! </string>
  <string name="app_delete_failed">卸载失败! </string>
</xxx>
    `;

    const resultJson = await adapater.toJSON(resultText);
    console.log("🚀 -> file: XMLAdapater.spec.ts:11 -> test -> resultJson:", resultJson);
    expect(resultJson).toStrictEqual({
      resources: {
        string: [
          { _: "转到主屏幕", $: { name: "abc_action_bar_home_description" } },
          { _: "转到上一层级", $: { name: "abc_action_bar_up_description" } },
          { _: "更多选项", $: { name: "abc_action_menu_overflow_description" } },
        ],
      },
    });

    const resultString = adapater.fromJSON(resultJson!);
    expect(resultString).toEqual(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<resources>
  <string name="abc_action_bar_home_description">转到主屏幕</string>
  <string name="abc_action_bar_up_description">转到上一层级</string>
  <string name="abc_action_menu_overflow_description">更多选项</string>
</resources>`);
  });
});
