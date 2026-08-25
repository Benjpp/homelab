<!DOCTYPE html>
<html lang="es" class="h-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="{{ mix('css/app.css') }}">
</head>
<body class="h-100 bg-light"> 

<div class="container h-100">
    <div class="row d-flex justify-content-center align-items-start mt-5 h-100">
        <div class="col-xl-6 col-lg-8 col-md-9">
            <div class="card shadow"> 
                <div class="card-body p-4">
                    <form>
                        <div class="text-center mb-4">
                            <h3 class="font-weight-normal">Login</h3>
                        </div>
                        <div class="form-outline mb-3"> 
                            <label class="form-label" for="inputEmail">Username</label>
                            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" />
                        </div>
                    
                        <div class="form-outline mb-3">
                            <label class="form-label" for="inputPassword">Password</label>
                            <input type="password" id="inputPassword" class="form-control" />
                        </div>
                    
                        <div class="text-center pt-1 mb-2">
                            <button class="btn btn-primary btn-block w-100" type="button" id="loginButton">Enter</button>
                        </div>
                    </form>    
                </div>
            </div>
        </div>    
    </div>
</div>

<script src="{{ mix('js/app.min.js') }}"></script>
</body>
</html>