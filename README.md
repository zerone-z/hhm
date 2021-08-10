# hhm

## 运行

使用 [Visual Studio Code](https://code.visualstudio.com/) 工具打开项目。
安装如下插件：

 - [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
 - [Debugger for Microsoft Edge](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-edge)

Live Server 安装好以后，可以在 VS Code 右下角有个看到 **Go Live** 小按钮。点它，Live Server 会创建一个本地的开发服务器，并弹出一个浏览器窗口。地址类似 **http://127.0.0.1:5500**，记住这里的端口号。下面会用到。
回到 VS Code ，依次点击： 运行图标（Run and Debug） -> 创建 **launch.json** 文件， 或者点击 **设置** 图标去编辑 **launch.json** 文件。在 **launch.json** 中增加如下配置：

```json
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问：https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "HHM Debugger",
      "type": "edge",
      "request": "launch",
      "url": "http://localhost:5500", // 这里的 5500 端口号要与 Live Server 提供的端口号保持一致
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

ps: 这里的 **url** 字段中的端口号 **5500** 要与 **Live Server** 提供的端口号保持一致。

然后使用 ***Run and Debug** 运行该配置 **HHMDebugger** ，执行调试。
### 保持只打开一个浏览器窗口

在使用 **Live Server** 和 **Run and Debug** 你会发现会打开两个窗口。为避免该情况发生，需要增加如下配置： 

#### Live Server 配置

打开 VS Code 的首选项，搜索 **Live Server** 。  
找到 **Chrome Debugging Attahment** ，点击编辑设置，将 **liveServer.settings.ChromeDebuggingAttachment** 的 **false** 改为 **true** 。
设置 **Custom Browser** 值为 **Microsoft Edge** 。
设置完成后，你会在 Settings.json 中看到如下配置：

```json
"liveServer.settings.ChromeDebuggingAttachment": true,
"liveServer.settings.CustomBrowser": "Microsoft Edge"
```

或者设置 **AdvanceCustomBrowserCmdLine** 。

```json
"liveServer.settings.AdvanceCustomBrowserCmdLine": "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge --remote-debugging-port=9222"
```

#### launch.json 配置  

打开 **launch.json** 文件，在页面中找到 **Aadd Configuration...** 按钮并点击。在配置项中选择 **Edge: Attach** 和 **Edge: Launch** 。将得到如下配置保存设置：

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Edge",
      "port": 9222,
      "request": "attach",
      "type": "pwa-msedge",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Launch Edge",
      "request": "launch",
      "type": "pwa-msedge",
      "url": "http://localhost:5500",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

ps： url 的端口号 **5500** 要与 **Live Server** 提供的端口号保持一致。

修改完成以后，重启 **Live Server** 服务，然后启动 **Run and Debug** 调试。
