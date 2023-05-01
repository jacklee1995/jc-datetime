import path from 'path'
import fs from 'fs'
import { copyFile, mkdir, writeFile  } from 'fs/promises'
import { src, watch, dest, series, parallel } from "gulp";
// import concat from "gulp-concat" // 合并文件插件
import uglify from "gulp-uglify" // 压缩文件
import rename from "gulp-rename" // 重命名插件
import ts from "gulp-typescript" // typescript 编译插件
import { deleteAsync } from "del" // 清理旧文件
import consola from "consola"

const baseDir = __dirname;
consola.info(`[build info] baseDir is:\n${baseDir}`)

const rootDir = path.resolve(__dirname, '..')
consola.info(`[build info] rootDir is:\n${rootDir}`)

const productDir = path.resolve(baseDir,'dist','jc-datetime');
consola.info(`[build info] productDir is:\n${productDir}`)

// 清除旧文件
async function clearOldFiles(): Promise<void> {
  await deleteAsync(["dist/**/*"]);
  return;
}

// 编译 ts 文件为 js 文件
function buildTypescript():NodeJS.ReadWriteStream {
  return src("./src/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: false,
        removeComments: false,
        declaration: true,
        target:"es2017",
        module:"commonjs",
        outDir: './dist',
        lib:["DOM","ES2015","ES2016","ES2017","ES2018","ES2022"],
        // moduleResolution: 'node',
        declarationDir: './dist/types'
      })
    )
    .pipe(dest("./dist/temp"));
}

function buildJSIndex():NodeJS.ReadWriteStream {
  return src("dist/temp/*.js")
    .pipe(dest("./dist/jc-datetime/"))
    .pipe(uglify()) 
    .pipe(dest("./dist/jc-datetime/"))
}

function moveJsToDist(){
  return parallel([
    ()=>{
      return src("./dist/temp/console/*.js")
      .pipe(uglify())
      .pipe(dest("./dist/jc-datetime/console/"))
    },
    ()=>{
      return src("./dist/temp/converters/*.js")
      .pipe(uglify())
      .pipe(dest("./dist/jc-datetime/converters/"))
    },
    ()=>{
      return src("./dist/temp/core/*.js")
      .pipe(uglify())
      .pipe(dest("./dist/jc-datetime/core/"))
    },
    ()=>{
      return src("./dist/temp/types/*.js")
      .pipe(uglify())
      .pipe(dest("./dist/jc-datetime/types/"))
    },
    ()=>{
      return src("./dist/temp/utils/*.js")
      .pipe(uglify())
      .pipe(dest("./dist/jc-datetime/utils/"))
    },
  ])
}

// 转移声明文件
const copyTypesDefinitions = ():NodeJS.ReadWriteStream => {
  return src("./dist/temp/**/*.d.ts")
    .pipe(dest("./dist/jc-datetime/"))
}

function readJson(filepath: string) {
  console.log("filepath =",filepath);
  
  return JSON.parse(fs.readFileSync(filepath).toString())
}


const copyPackageJson = () => {
  return new Promise(
    () => {
      const jsonObj = readJson(path.join(__dirname, 'package.json'));
      const jsonObjProduct = readJson(path.join(__dirname, 'package.production.json'));
      for (const iterator in jsonObjProduct) {
        jsonObj[iterator] = jsonObjProduct[iterator];
      }
      writeFile(path.join(productDir, 'package.json'), JSON.stringify(jsonObj,null,2));
    }
  )
}

const copyTsConfigJson = () => {
  return new Promise(
    () => {
      const jsonObj = readJson(path.join(__dirname, 'tsconfig.json'));
      const jsonObjProduct = readJson(path.join(__dirname, 'tsconfig.production.json'));
      for (const iterator in jsonObjProduct) {
        jsonObj[iterator] = jsonObjProduct[iterator];
      }
      
      writeFile(path.join(productDir, 'tsconfig.json'), JSON.stringify(jsonObj,null,2));
    }
  )
}


// 用于转移 package.json、README.md 以及声明文件
export const  copyFiles = async () => {
  await mkdir(productDir, { recursive: true });
  Promise.all([
    copyPackageJson(),
    copyTsConfigJson(),
    copyFile(
      path.resolve(rootDir, 'README.md'),
      path.resolve(productDir, 'README.md')
    ),
    copyFile(
      path.resolve(rootDir, 'LICENSE'),
      path.resolve(productDir, 'LICENSE')
    )
  ])
}
// 注册监视任务
function watchChanges() {
  // 开启监听
  watch([
    "./src/**/**",
    "./*.ts",
    "./tsconfig.json",
    "LICENSE",
    "package.json",
    "readme.md"
  ], series(
    buildTypescript, 
    buildJSIndex, 
    moveJsToDist(),
    copyFiles, 
    copyTypesDefinitions
  ));
}

// 注册默认任务
const build = series([
  clearOldFiles, // 启动时先删除旧文件
  series([
    buildTypescript, // 编译 ts 为 js
    buildJSIndex, // 合并 js
    moveJsToDist(),
  ]),
  copyFiles,
  copyTypesDefinitions,
  watchChanges, // 监视改变
]);

export default build;
