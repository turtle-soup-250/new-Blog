import { PROJECT_CONTENT } from "./Project";
export const HAVBAR_ROUTER_LINK = [
  { id: 0, content: "主页", name: "Home" },
  { id: 1, content: "项目", name: "Project" },
  { id: 2, content: "介绍", name: "About" },
  { id: 3, content: "工具", name: "Tools" },
  { id: 4, content: "更多", name: "More" },
];
export const PROJECT_COUNT = PROJECT_CONTENT.value.length;
export const MIT_COUNT = 1
export const UPDATE_TIME = "08.24";
export const CARD_CONTENT = [
  {
    id: 0,
    title: "项目总数",
    num: PROJECT_COUNT,
    content: "所有的开源项目分享",
    name: "Project",
  },
  {
    id: 1,
    title: "开源数量",
    num: MIT_COUNT,
    content: "所有的文章数量",
    name: "Article",
  },
  {
    id: 2,
    title: "更新时间",
    num: UPDATE_TIME,
    content: "上次的博客更新日期",
    name: "",
  },
];
