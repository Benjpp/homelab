<!DOCTYPE html>
<html lang="es" class="h-100">
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Lab</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body>
    <div class="banner bg-dark text-white p-2 rounded-0 mb-4">
        <div class="container">
            <nav class="navbar">
                <li class="nav-item">
                    <a class="nav-link active d-flex align-items-center gap-2" aria-current="page" href="/user">
                        <i class="fa-solid fa-user"></i>
                        <span> Users </span>
                    </a>
                </li>
            </nav>
        </div>
    </div>

</body>
</html>

