/*
 * @Author: nntzhc 1553090730@qq.com
 * @Date: 2023-03-07 23:36:04
 * @LastEditors: nntzhc 1553090730@qq.com
 * @LastEditTime: 2023-03-08 03:05:32
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
        const document = editor.document;
        const text = document.getText();
        const updatedText = text.replace(/([+\-*/%=])/g, " $1 ");
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(text.length)
        );
        editor.edit((editBuilder) => {
          editBuilder.replace(fullRange, updatedText);
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
