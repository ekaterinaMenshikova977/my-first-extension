import * as vscode from 'vscode';
// Вызывается при активации расширения

export function activate(context: vscode.ExtensionContext) {
    console.log('Расширение "my-first-extension" активировано');

    // Регистрируем команду
    const countWordsDisposable = vscode.commands.registerCommand(
        'my-first-extension.countWords',
        () => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const text = editor.document.getText();
                const trimmedText = text.trim();
                if (trimmedText.length === 0) {
                    vscode.window.showInformationMessage(
                        'В текущем документе нет слов.'
                    );
                    return;
                } else {
                    const wordCount = trimmedText.split(/\s+/).length;
                    vscode.window.showInformationMessage(
                        `В текущем документе ${wordCount} слов.`
                    );
                }
            }
            else {
                vscode.window.showInformationMessage(
                    'Нет активного редактора.'
                );
            }
        }
    );
    // Добавляем в подписки, чтобы ресурс освободился при деактивации
    context.subscriptions.push(countWordsDisposable);
}

// Вызывается при деактивации расширения
export function deactivate() {
    console.log('Расширение "my-first-extension" деактивировано');
}