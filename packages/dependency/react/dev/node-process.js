import path from "path";
import { processDtsFiles, __dirname, processDirectory } from "./proccess-types-files.js";

const dtsProcess = (path_) => processDtsFiles(`./${path_}`, (content, filePath) => {

    const distFolder = path.resolve(__dirname, `../${path_}`)
    // two backs because filepath  contains two paths front to path_
    const resolveFilePath = path.resolve(distFolder, '../..', filePath)

    const distRelativeResolve = `${path.relative(resolveFilePath, distFolder).replace("..", '').replace("\\", '').replaceAll('\\', '/') || '.'}/`

    return content.replaceAll("'@/", `'${distRelativeResolve}`).replaceAll('"@/', `"${distRelativeResolve}`)
})

await dtsProcess('./dist/esm')
await dtsProcess('./dist/cjs')