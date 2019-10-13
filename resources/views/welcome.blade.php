<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Lost And Found IDs</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Scripts -->
    <script type="text/javascript" src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link type="text/css" href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script>
        const APP_URL = {!! json_encode(url('/')) !!};
    </script>

    <script>
        const ASSETS_URL = {!! json_encode(asset('/dummy.png')) !!};
        console.log(APP_URL)
    </script>
</head>

<body>
<div id="example"></div>
</body>
</html>
