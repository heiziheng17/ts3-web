const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

console.log('开始构建...');

const htmlPath = path.join(__dirname, 'public', 'index.html');
let html = fs.readFileSync(htmlPath, 'utf-8');

const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let match;
let count = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  const originalCode = match[1];
  
  if (originalCode.trim().length < 100) continue;
  
  console.log(`混淆第 ${++count} 段脚本...`);
  
  const obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: false,
    disableConsoleOutput: false,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false,
    selfDefending: false,
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayCallsTransformThreshold: 0.75,
    stringArrayEncoding: ['base64'],
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 2,
    stringArrayWrappersChainedCalls: true,
    stringArrayWrappersParametersMaxCount: 4,
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.75,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  }).getObfuscatedCode();
  
  html = html.replace(originalCode, '\n' + obfuscatedCode + '\n');
}

const outputPath = path.join(__dirname, 'public', 'index.html');
fs.writeFileSync(outputPath, html, 'utf-8');

console.log(`构建完成！混淆了 ${count} 段脚本`);
