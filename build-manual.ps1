$root        = "C:\Users\LIONHEART\Documents\Lionheart Docs (Vlad)\Bots\POE 2 Leveling"
$electronSrc = "$root\node_modules\electron\dist"
$unpacked    = "$root\app"
$appRes      = "$unpacked\resources\app"

Write-Host "Step 1: Clean output folder..."
Remove-Item -Recurse -Force $unpacked -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force $unpacked | Out-Null

Write-Host "Step 2: Copy Electron binaries..."
Copy-Item "$electronSrc\*" $unpacked -Recurse -Force

Write-Host "Step 3: Rename electron.exe..."
Rename-Item "$unpacked\electron.exe" "POE2 Leveling Guide.exe" -Force

Write-Host "Step 4: Copy built app files..."
New-Item -ItemType Directory -Force "$appRes\out" | Out-Null
Copy-Item "$root\out\*" "$appRes\out\" -Recurse -Force
Copy-Item "$root\package.json" "$appRes\package.json" -Force

Write-Host "Step 5: Copy runtime node_modules..."
$nmDst = "$appRes\node_modules"
New-Item -ItemType Directory -Force $nmDst | Out-Null
$prodDeps = @(
    "@electron-toolkit",
    "chokidar", "readdirp", "anymatch", "picomatch",
    "braces", "fill-range", "to-regex-range", "is-number",
    "is-binary-path", "binary-extensions",
    "is-glob", "is-extglob",
    "glob-parent", "normalize-path",
    "zustand",
    "tesseract.js", "tesseract.js-core",
    "regenerator-runtime", "bmp-js", "idb-keyval", "is-url",
    "node-fetch", "wasm-feature-detect", "zlibjs",
    "tr46", "webidl-conversions", "whatwg-url"
)
foreach ($dep in $prodDeps) {
    $depSrc = "$root\node_modules\$dep"
    if (Test-Path $depSrc) {
        Copy-Item $depSrc "$nmDst\$dep" -Recurse -Force
        Write-Host "  Copied $dep"
    }
}

Write-Host ""
Write-Host "Build complete!"
$exe = "$unpacked\POE2 Leveling Guide.exe"
if (Test-Path $exe) {
    $size = [math]::Round((Get-Item $exe).Length / 1MB, 1)
    Write-Host "Executable: $exe ($size MB)"
} else {
    Write-Host "ERROR: exe not found"
}
