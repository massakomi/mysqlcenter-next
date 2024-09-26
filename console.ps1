$prompt = @(
"Choose operation (type a number)`n"
"1 - npm start`n"
"2 - npm run dev`n"
"3 - next lint`n"
) -join ' '

$operation = Read-Host $prompt

if ($operation -eq '1')
{
    npm start
}

if ($operation -eq '2')
{
    npm run dev
}

if ($operation -eq '3')
{
    next lint --no-cache
}

Start-Sleep 1