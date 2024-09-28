$prompt = @(
"Choose operation (type a number)`n"
"1 - npm start hidden`n"
"2 - npm stop (port 3000)`n"
"3 - npm run dev`n"
"4 - next lint`n"
"5 - npm start (opened)`n"
"6 - npm build`n"
) -join ' '

$operation = Read-Host $prompt

if ($operation -eq '1')
{
    Start-Process npm -ArgumentList "run start" -WindowStyle Hidden
}

if ($operation -eq '2')
{
    function Kill-PortProcess {
        param (
            [int]$Port
        )
        try {
            $processId = (Get-NetTCPConnection -LocalPort $Port | Select-Object -ExpandProperty OwningProcess)
            if ($processId) {
                Stop-Process -Id $processId -Force
                Write-Host "Process with ID $processId that was using port $Port has been terminated."
            } else {
                Write-Host "No process is using port $Port."
            }
        } catch {
            Write-Host "An error occurred: $_"
        }
    }
    Kill-PortProcess -Port 3000
}

if ($operation -eq '3')
{
    npm run dev
}

if ($operation -eq '4')
{
    next lint --no-cache
}

if ($operation -eq '5')
{
    Start-Process npm -ArgumentList "run start"
}

if ($operation -eq '6')
{
    Start-Process npm -ArgumentList "run build"
}

Start-Sleep 3
