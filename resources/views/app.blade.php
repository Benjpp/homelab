<!DOCTYPE html>
<html lang="es">
<link rel="StyleSheet" href="../css/app.css" type="text/css" />
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel con Webpack Mix</title>

</head>
<body>
    <div id="app">
        <h1>¡Hola desde Laravel con Vanilla JS y Webpack!</h1>
    </div>

    <!-- Script JS compilado -->
    <script src="{{ mix('js/app.js') }}"></script>
</body>
</html>