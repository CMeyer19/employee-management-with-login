Start-Process -FilePath 'dotnet' -WorkingDirectory 'D:\Playground\employee-management-with-login\server\EmployeeApi\EmployeeApiService' -ArgumentList 'run'
Start-Process -FilePath 'dotnet' -WorkingDirectory 'D:\Playground\employee-management-with-login\server\Security\SecurityService' -ArgumentList 'run'
Start-Process -FilePath 'dotnet' -WorkingDirectory 'D:\Playground\employee-management-with-login\server\SignalR\SignalR' -ArgumentList 'run'
Start-Process -FilePath "D:\Program Files\nodejs\npm.cmd" -WorkingDirectory 'D:\Playground\employee-management-with-login\web\employee-management-ui' -ArgumentList 'start'