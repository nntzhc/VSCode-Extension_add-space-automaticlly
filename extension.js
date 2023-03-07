/*
 * @Author: nntzhc 1553090730@qq.com
 * @Date: 2023-03-07 23:36:04
 * @LastEditors: nntzhc 1553090730@qq.com
 * @LastEditTime: 2023-03-08 01:47:35
 * @FilePath: \add-space-automaticlly\extension.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const vscode = require('vscode');

function onDidChangeTextDocument(event) {
  let document = event.document;
  let editor = vscode.window.activeTextEditor;

  if (editor && editor.document === document) {
    let lastLine = document.lineAt(document.lineCount - 1);
    let lastChar = lastLine.text.charAt(lastLine.text.length - 1);

    if (lastChar === ';') {
      let selection = editor.selection;
      let text = document.getText(selection);
      let newText = text.replace(/([+\-*\/=])(?=\S)/g, ' $1 ');

      editor.edit(editBuilder => {
        editBuilder.replace(selection, newText);
      });
    }
  }
}

function activate(context) {
  console.log('The extension has been activated!');

  let disposable2 = vscode.workspace.onDidChangeTextDocument(onDidChangeTextDocument);
  context.subscriptions.push(disposable2);
  vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;
    const document = editor.document;
    const text = document.getText();
    const lastCharacter = text.charAt(text.length - 2);
    const currentCharacter = text.charAt(text.length - 1);
    const range = new vscode.Range(editor.selection.start, editor.selection.end);
    if (lastCharacter === ";" && /[\+\-\=\*\/]/.test(currentCharacter)) {
        editor.edit(editBuilder => {
            editBuilder.replace(range, ` ${currentCharacter} `);
        });
    }
});

}

function deactivate() {
  console.log('The extension has been deactivated!');
}

module.exports = {
  activate,
  deactivate
};
