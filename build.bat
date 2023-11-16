if not exist ".\.vscode\" mkdir .\.vscode

( 
echo    {
echo    // Use IntelliSense to learn about possible attributes.
echo    // Hover to view descriptions of existing attributes.
echo    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
echo    "version": "0.2.0",
echo   "configurations": [
echo            {
echo                "name": "Python: Flask",
echo                "type": "python",
echo                "request": "launch",
echo                "module": "flask",
echo                "env": {
echo                    "FLASK_APP": "app.py",
echo                    "FLASK_DEBUG": "1"
echo                },
echo                "args": [
echo                    "run",
echo                    "--no-debugger",
echo                    "--no-reload"
echo                ],
echo                "jinja": true,
echo                "justMyCode": true
echo            }
echo        ]
echo    }
) > .\.vscode\launch.json


conda env create -f environment.yml --prefix env