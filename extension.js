/*
 * @Author: nntzhc 1553090730@qq.com
 * @Date: 2023-03-07 23:36:04
 * @LastEditors: nntzhc 1553090730@qq.com
 * @LastEditTime: 2023-03-08 09:46:15
 * @FilePath: \add-space-automaticlly\extension.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "addSpaceAroundOperator",
    function () {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
      const currentLine = editor.document.lineAt(editor.selection.active.line).text;
      const operators = ['+', '-', '*', '/', '=', '>', '<', '%', '&', '|', '^', '!'];
      let newLine = '';
      for (let i = 0; i < currentLine.length-1; i++) {
        const char = currentLine[i];
        const prevChar = currentLine[i - 1];
        const nextChar = currentLine[i + 1];
        if (operators.includes(char)) {
          if (prevChar !== ' ') {
            newLine += ' ';
          }
          newLine += char;
          if (nextChar !== ' ' && nextChar !== undefined) {
            newLine += ' ';
          }
        } else {
          newLine += char;
        }
      }
      editor.edit(editBuilder => {
        const start = new vscode.Position(editor.selection.active.line, 0);
        const end = new vscode.Position(editor.selection.active.line, currentLine.length);
        editBuilder.replace(new vscode.Range(start, end), newLine);
      });
    }
    }
  );

  context.subscriptions.push(disposable);

  // Create a semicolon completion item
  const semicolonCompletionItem = new vscode.CompletionItem(";");
  semicolonCompletionItem.command = {
    command: "addSpaceAroundOperator",
    title: "Add Space Around Operator",
  };

  // Register the semicolon completion item provider
  const documentSelector = { scheme: "file", language: "plaintext" };
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      documentSelector,
      {
        provideCompletionItems() {
          return [semicolonCompletionItem];
        },
      },
      ";"
    )
  );
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
