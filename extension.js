const vscode = require('vscode');

function activate(context) {
  console.log('The extension has been activated!');

  let disposable = vscode.commands.registerCommand('extension.addSpaceAroundOperator', () => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    let document = editor.document;
    let selection = editor.selection;

    let text = document.getText(selection);
    let newText = text.replace(/([+\-*\/=])/g, ' $1 ');

    editor.edit(editBuilder => {
      editBuilder.replace(selection, newText);
    });
  });

  context.subscriptions.push(disposable);
}

function deactivate() {
  console.log('The extension has been deactivated!');
}

module.exports = {
  activate,
  deactivate
};
