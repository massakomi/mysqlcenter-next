$prompt = @(
"Choose operation (type a number)`n"
"1 - npm start`n"
"2 - npm run build`n"
) -join ' '

$operation = Read-Host $prompt

if ($operation -eq '1')
{
    npm start
}

if ($operation -eq '2')
{
    npm run build
}

Start-Sleep 1