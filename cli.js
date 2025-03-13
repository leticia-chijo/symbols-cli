"use strict"

import { execSync } from "child_process"
import fs from "fs"
import path from "path"

const REPO_URL = "https://github.com/leticia-chijo/symbols-grid-selection.git"
const COMPONENT_PATH = "src/components.js"

const DEFAULT_ROWS = 8
const DEFAULT_COLS = 16

// Repo cloning
const initProject = () => {
  if (fs.existsSync("symbols-grid-selection")) {
    console.log("Project already exists. Delete the folder to clone again.")
    return
  }

  console.log("Cloning the repository...")
  execSync(`git clone ${REPO_URL}`, { stdio: "inherit" })
  console.log("Repository cloned successfully!")
}

// Copies component file and changes cols and rows amount
const createComponent = (cols, rows) => {
  const componentFile = path.join("symbols-grid-selection", COMPONENT_PATH)

  if (!fs.existsSync(componentFile)) {
    console.error("Component file not found. Make sure the repository is cloned.")
    return
  }

  let componentCode = fs
    .readFileSync(componentFile, "utf-8")
    .replace(/const\s+COLS\s*=\s*\d+/, `const COLS = ${cols}`)
    .replace(/const\s+ROWS\s*=\s*\d+/, `const ROWS = ${rows}`)

  const outputPath = path.join(process.cwd(), `GridSelection-${cols}x${rows}.js`)
  fs.writeFileSync(outputPath, componentCode)
  console.log(`Component created successfully: GridSelection-${cols}x${rows}.js`)
}

// Execution
const args = process.argv.slice(2)

if (args.length === 0) {
  console.log("Usage: node cli.js <command> [options]")
} else {
  const command = args[0]
  if (command === "init") {
    initProject()
  } else if (command === "create") {
    const cols = parseInt(args[1]) || DEFAULT_COLS
    const rows = parseInt(args[2]) || DEFAULT_ROWS
    createComponent(cols, rows)
  } else {
    console.log(`Unknown command: ${command}`)
  }
}
