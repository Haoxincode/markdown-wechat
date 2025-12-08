/**
 * 任务列表插件 - 将 GitHub 风格的任务列表转换为微信兼容格式
 */
export function processTaskList(html: string): string {
  // 未选中的任务
  html = html.replace(
    /<li>\[ \] (.*?)<\/li>/gi,
    '<p class="task-list-list uncheck" style="list-style-type: none;"><i class="icon_uncheck"></i><span>$1</span></p>'
  )

  // 已选中的任务
  html = html.replace(
    /<li>\[x\] (.*?)<\/li>/gi,
    '<p class="task-list-list checked" style="list-style-type: none;"><i class="icon_check"></i>$1</p>'
  )

  return html
}
