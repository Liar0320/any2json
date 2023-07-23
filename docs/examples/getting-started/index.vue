<template>
  <div class="space-y-4">
    <div class="flex justify-between">
      <a class="btn" target="_blank" @click="handleDownloadTpl('any2json.ini')">any2json.ini</a>
      <a class="btn btn-neutral" target="_blank" @click="handleDownloadTpl('any2json.xml')">any2json.xml</a>
      <a class="btn btn-primary" target="_blank" @click="handleDownloadTpl('any2json.json')">any2json.json</a>
      <a class="btn btn-secondary" target="_blank" @click="handleDownloadTpl('any2json.xlsx')">any2json.xlsx</a>
    </div>
    <div class="form-control">
      <label class="label">
        <span class="label-text-alt">support xml json ini xlsl</span>
      </label>
      <input placeholder="支持xml json ini xlsl" class="file-input file-input-bordered file-input-primary w-full max-w-xs" type="file" @change="onchange" />
    </div>
    <div class="divider"></div>
    <div class="flex justify-center">
      <div class="overflow-x-auto h-96">
        <table class="table table-xs">
          <thead>
            <tr>
              <th>Index</th>
              <th>FieldName</th>
              <th>FieldValue</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in input">
              <td>{{ index + 1 }}</td>
              <td>
                {{ item.name }}
              </td>
              <td>
                {{ item.value }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <textarea class="textarea w-full min-h-[250px]" v-model="input" placeholder="place select file or past json"></textarea> -->
    </div>
    <div class="divider">Download file</div>
    <div class="form-control">
      <div class="flex">
        <select class="select" v-model="ext">
          <option value="xml">xml</option>
          <option value="ini">ini</option>
          <option value="xlsx">xlsx</option>
          <option value="json">json</option>
        </select>

        <!-- <input class="input flex-1" v-model="JSONtextValue" placeholder="Please input fileName" /> -->
      </div>
    </div>
    <button class="btn btn-primary w-full" @click="handleDownload(fileName)">
      <span>download file</span> <span class="normal-case">{{ fileNameWithExt }}</span>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { createAny2JSON, downloadFile, FieldData } from "any2json-v2";
import { computed, ref } from "vue";

const input = ref<FieldData[]>([
  {
    name: "Language",
    value: "简体中文",
    module: "resource",
    tag: "string",
  },
  {
    name: "OK",
    value: "确定",
    module: "resource",
    tag: "string",
  },
  {
    name: "Apply",
    value: "应用",
    module: "resource",
    tag: "string",
  },
  {
    name: "Cancel",
    value: "取消",
    module: "resource",
    tag: "string",
  },
  {
    name: "Close",
    value: "关闭",
    module: "resource",
    tag: "string",
  },
  {
    name: "Save",
    value: "保存",
    module: "resource",
    tag: "string",
  },
]);
const fileName = ref("any2json");
const ext = ref("xml");
function onchange(e: Event) {
  const file: File = (e.target as any).files[0];
  const transferService = createAny2JSON(file);

  transferService.toJSON(file).then((res) => {
    console.log("🚀 -> file: index.vue:73 -> transferService.toJSON -> res:", res);
    input.value = res;
  });
}

const fileNameWithExt = computed(() => {
  return fileName.value + `.${ext.value}`;
});

const JSONtextValue = computed<string>(() => {
  return input.value ? JSON.stringify(input.value, null, 4) : "";
});

function handleDownload(fileName: string) {
  let content = input.value;
  downloadFile(fileName + `.${ext.value}`, content);
}

function handleDownloadTpl(fileName: string) {
  const a = document.createElement("a");
  a.download = fileName;
  a.href = `/static/${fileName}`;
  a.click();
  URL.revokeObjectURL(a.href);
}
</script>
