$prompt = @(
"Choose operation (type a number)`n"
"1 - npm start`n"
"2 - npm run dev`n"
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

Start-Sleep 1