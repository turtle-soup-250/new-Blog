import { shallowRef, markRaw } from "vue";
interface ProjectItem {
  id: number;
  title: string;
  type: string;
  about: string;
  label: string[];
  url: string;
}

// 数据层
const projectData: ProjectItem[] = [
  {
    id: 0,
    title: "文件管理TUI应用",
    type: "TUI",
    label: ["rust", "tui", "开源", "ratat"],
    about:
      "一个以rust的TUI框架ratatui开发的一个学习项目,主打高性能,体积小,以及占用低,但内置组件偏少,推荐追求极致性能的人学习",
    url: "",
  },
  {
    id: 1,
    title: "静态项目博客",
    type: "前端",
    label: ["vue", "ts", "闭源", "css"],
    about:
      "一个以vue框架开发的一个个人博客,用于储存我的项目,及其介绍,用于公开学习与提意见,使用git在cloudflare更新,因为是个人,所以闭源",
    url: "https://github.com/turtle-soup-250/new-Blog",
  },
];

export const PROJECT_CONTENT = shallowRef(markRaw(projectData));
