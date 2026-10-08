# Re-export the editable Excalidraw source and compose the fictional Telegram
# panel with the original workflow. No image generator or live financial data.
param([string]$OutputDirectory)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
$sourceMediaPath = Join-Path $projectRoot 'public/assets/projects'
$mediaPath = if ($OutputDirectory) { [System.IO.Path]::GetFullPath($OutputDirectory) } else { $sourceMediaPath }
New-Item -ItemType Directory -Path $mediaPath -Force | Out-Null
$catalogJson = & node --input-type=module -e "import { pathToFileURL } from 'node:url'; const { myProjects } = await import(pathToFileURL(process.argv[1])); console.log(JSON.stringify(myProjects));" (Join-Path $projectRoot 'src/components/constants/index.js')
if ($LASTEXITCODE -ne 0) { throw 'Could not read the project media catalog' }
$catalog = $catalogJson | ConvertFrom-Json
$botMedia = $catalog | Where-Object key -eq 'botGastos'
$proajuMedia = $catalog | Where-Object key -eq 'proajuCleaner'
$sourcePath = Join-Path $projectRoot 'assets-source/projects/Proaju-CDACleaner.excalidraw'

function Get-Color([string]$hex) {
    if ($hex -eq '#1e1e1e') { $hex = '#cdd6f4' }
    return [System.Drawing.ColorTranslator]::FromHtml($hex)
}
function Draw-Text($graphics, [string]$text, [float]$size, [string]$color, [float]$x, [float]$y, [float]$width, [float]$height, [bool]$center = $false) {
    $font = [System.Drawing.Font]::new('Segoe UI', $size, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
    $brush = [System.Drawing.SolidBrush]::new((Get-Color $color))
    $format = [System.Drawing.StringFormat]::new()
    if ($center) { $format.Alignment = [System.Drawing.StringAlignment]::Center; $format.LineAlignment = [System.Drawing.StringAlignment]::Center }
    $graphics.DrawString($text, $font, $brush, [System.Drawing.RectangleF]::new($x, $y, $width, $height), $format)
    $font.Dispose(); $brush.Dispose(); $format.Dispose()
}

$source = Get-Content -Raw -Encoding utf8 -LiteralPath $sourcePath | ConvertFrom-Json
foreach ($element in $source.elements) {
    if ($element.type -eq 'text' -and $element.text -match '-80%') {
        $element.text = "Logs & Auditoria`nRedução de`ntrabalho manual"
        $element.originalText = $element.text
    }
}
$source.appState.viewBackgroundColor = '#11111b'
if (-not $OutputDirectory) { $source | ConvertTo-Json -Depth 100 | Set-Content -Encoding utf8 -LiteralPath $sourcePath }
$frame = $source.elements | Where-Object type -eq 'frame' | Select-Object -First 1
$bitmap = [System.Drawing.Bitmap]::new($proajuMedia.imageWidth, $proajuMedia.imageHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.Clear((Get-Color '#11111b'))
$graphics.ScaleTransform([float]($proajuMedia.imageWidth / 2789), [float]($proajuMedia.imageHeight / 1799))
$graphics.TranslateTransform([float](-$frame.x + 10), [float](-$frame.y + 20))
$elements = @($source.elements | Where-Object { -not $_.isDeleted -and $_.type -ne 'frame' })
$byId = @{}
foreach ($element in $elements) { $byId[$element.id] = $element }
foreach ($element in $elements | Where-Object type -ne 'text') {
    $pen = [System.Drawing.Pen]::new((Get-Color $element.strokeColor), [float]$element.strokeWidth)
    $box = [System.Drawing.RectangleF]::new($element.x, $element.y, $element.width, $element.height)
    $fill = $null
    if ($element.backgroundColor -ne 'transparent') { $fill = [System.Drawing.SolidBrush]::new((Get-Color $element.backgroundColor)) }
    switch ($element.type) {
        'rectangle' {
            if ($fill) { $graphics.FillRectangle($fill, $box) }
            $graphics.DrawRectangle($pen, $box.X, $box.Y, $box.Width, $box.Height)
        }
        'diamond' {
            $points = [System.Drawing.PointF[]]@(
                [System.Drawing.PointF]::new($box.X + $box.Width/2, $box.Y),
                [System.Drawing.PointF]::new($box.Right, $box.Y + $box.Height/2),
                [System.Drawing.PointF]::new($box.X + $box.Width/2, $box.Bottom),
                [System.Drawing.PointF]::new($box.X, $box.Y + $box.Height/2)
            )
            if ($fill) { $graphics.FillPolygon($fill, $points) }
            $graphics.DrawPolygon($pen, $points)
        }
        'arrow' {
            $points = [System.Drawing.PointF[]]@($element.points | ForEach-Object { [System.Drawing.PointF]::new(($element.x + $_[0]), ($element.y + $_[1])) })
            $pen.CustomEndCap = [System.Drawing.Drawing2D.AdjustableArrowCap]::new(5, 7)
            $graphics.DrawLines($pen, $points)
        }
        default { throw "Unsupported Excalidraw primitive: $($element.type)" }
    }
    $pen.Dispose()
    if ($fill) { $fill.Dispose() }
}
$textPlacements = @()
foreach ($element in $elements | Where-Object type -eq 'text') {
    $x = $element.x - 40; $y = $element.y; $width = $element.width + 80; $height = $element.height + 10
    if ($element.containerId -and $byId.ContainsKey($element.containerId)) {
        $container = $byId[$element.containerId]
        if ($container.type -eq 'arrow') {
            $points = @($container.points)
            $distances = @(); $total = 0.0
            for ($i = 1; $i -lt $points.Count; $i++) {
                $distance = [Math]::Sqrt([Math]::Pow(($points[$i][0] - $points[$i-1][0]), 2) + [Math]::Pow(($points[$i][1] - $points[$i-1][1]), 2))
                $distances += $distance; $total += $distance
            }
            $remaining = $total / 2
            for ($i = 0; $i -lt $distances.Count; $i++) {
                if ($remaining -le $distances[$i]) {
                    $fraction = $remaining / $distances[$i]
                    $x = $container.x + $points[$i][0] + ($points[$i+1][0] - $points[$i][0]) * $fraction - $width/2
                    $y = $container.y + $points[$i][1] + ($points[$i+1][1] - $points[$i][1]) * $fraction - $height/2
                    break
                }
                $remaining -= $distances[$i]
            }
            $cover = [System.Drawing.SolidBrush]::new((Get-Color '#11111b'))
            $graphics.FillRectangle($cover, [float]($x-4), [float]($y-2), [float]($width+8), [float]($height+4)); $cover.Dispose()
        } elseif ($container.backgroundColor -ne 'transparent') {
            $x = $container.x + 6; $y = $container.y + 4; $width = $container.width - 12; $height = $container.height - 8
        }
    }
    $textPlacements += @{ Element = $element; X = $x; Y = $y; Width = $width; Height = $height }
}
foreach ($placement in $textPlacements) {
    $element = $placement.Element
    Draw-Text $graphics $element.text $element.fontSize $element.strokeColor $placement.X $placement.Y $placement.Width $placement.Height ($element.textAlign -eq 'center')
}
$bitmap.Save((Join-Path $mediaPath 'Proaju-CDACleaner.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose(); $bitmap.Dispose()

# Preserve the original workflow as an editable composition input.
$workflowPath = Join-Path $projectRoot 'assets-source/projects/bot-n8n-workflow.png'
if (-not (Test-Path -LiteralPath $workflowPath)) { throw 'The original bot workflow is required for re-export' }
$workflow = [System.Drawing.Image]::FromFile($workflowPath)
$bitmap = [System.Drawing.Bitmap]::new($botMedia.imageWidth, $botMedia.imageHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.Clear((Get-Color '#06091f'))
$graphics.ScaleTransform([float]($botMedia.imageWidth / 2200), [float]($botMedia.imageHeight / 960))
$panel = [System.Drawing.SolidBrush]::new((Get-Color '#161a31'))
$graphics.FillRectangle($panel, 24, 24, 480, 912)
Draw-Text $graphics 'Telegram' 28 '#ffffff' 48 52 440 50
Draw-Text $graphics 'Conversa ilustrativa / Illustrative chat' 18 '#33c2cc' 48 104 440 56
function Draw-Bubble([string]$message, [float]$y, [float]$height, [string]$color) {
    $brush = [System.Drawing.SolidBrush]::new((Get-Color $color))
    $graphics.FillRectangle($brush, 48, $y, 432, $height)
    Draw-Text $graphics $message 24 '#ffffff' 68 ($y+16) 392 ($height-24)
    $brush.Dispose()
}
Draw-Bubble "Gastei R$ 25,00 no almoço." 198 90 '#282b4b'
Draw-Bubble "Despesa: R$ 25,00`nCategoria: Alimentação`nDescrição: Almoço`n`nConfirma o registro?" 312 220 '#1f1e39'
Draw-Bubble 'Sim, pode registrar.' 556 90 '#282b4b'
Draw-Bubble "Registrado no Google Sheets.`n`nPosso consultar seus gastos também." 670 158 '#1f1e39'
Draw-Text $graphics 'Dados fictícios / Fictional data' 18 '#b9bbcc' 48 868 440 50
Draw-Text $graphics 'n8n · Workflow atual / Current workflow' 32 '#ffffff' 548 58 1604 60
Draw-Text $graphics 'Google Sheets: despesas / expenses     ·     PostgreSQL: memória / memory' 23 '#57db96' 548 126 1604 50
$graphics.DrawImage($workflow, [System.Drawing.Rectangle]::new(536, 212, 1640, 706))
$bitmap.Save((Join-Path $mediaPath 'bot-n8n.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$panel.Dispose(); $workflow.Dispose(); $graphics.Dispose(); $bitmap.Dispose()
Write-Output "Exported PROAJU ($($proajuMedia.imageWidth) x $($proajuMedia.imageHeight)) and bot split ($($botMedia.imageWidth) x $($botMedia.imageHeight))."
if (-not $OutputDirectory) {
    & node (Join-Path $PSScriptRoot 'generate-project-thumbnails.mjs')
    if ($LASTEXITCODE -ne 0) { throw 'Thumbnail generation failed' }
}
