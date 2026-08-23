$url = "https://cdn.hstatic.net/200000717719/file/featherweight-champion-conor-mcg_25abaa6928824a1db74853647ff3bd48_1024x1024.jpg"
$out = "C:\Users\MALDEV01\Downloads\featherweight-champion-conor-mcg.jpg"

Invoke-WebRequest -Uri $url -OutFile $out
