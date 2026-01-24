// scripts/build.js

const fs = require('fs-extra'); // 使用 fs-extra 方便地处理文件操作
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

// 定义源目录和输出目录
const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

async function build() {
  console.log('开始构建...');

  // 1. 清理并创建空的 dist 目录
  await fs.emptyDir(distDir);
  console.log('dist 目录已清理。');

  // 2. 复制所有文件从 src 到 dist
  await fs.copy(srcDir, distDir);
  console.log('所有文件已复制到 dist。');

  // 3. 查找并混淆 dist 目录中的 JavaScript 文件
  const jsFile = path.join(distDir, 'main.js'); // 假设你的JS文件叫 main.js

  if (fs.existsSync(jsFile)) {
    console.log('正在混淆 main.js...');
    const originalCode = fs.readFileSync(jsFile, 'utf8');

    // 混淆选项 (可以根据需求调整，这是中等强度的配置)
    const obfuscationResult = JavaScriptObfuscator.obfuscate(originalCode, {
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: true, // 禁用 console 输出
      identifierNamesGenerator: 'hexadecimal',
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true, // 让代码变得难以格式化和重命名
      simplify: true,
      splitStrings: true,
      splitStringsChunkLength: 10,
      stringArray: true,
      stringArrayEncoding: ['base64'],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 4,
      stringArrayWrappersType: 'function',
      transformObjectKeys: true,
      unicodeEscapeSequence: false
    });

    // 将混淆后的代码写回文件
    fs.writeFileSync(jsFile, obfuscationResult.getObfuscatedCode());
    console.log('main.js 混淆完成！');
  }

  console.log('构建成功！产物已生成在 dist 目录。');
}

// 安装依赖 fs-extra
// npm install --save-dev fs-extra
build().catch(err => {
  console.error('构建失败:', err);
  process.exit(1);
});
