<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Lost And Found IDs</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Scripts -->
    <script type="text/javascript" src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link type="text/css" href="{{ asset('css/app.css') }}" rel="stylesheet">

    <script>
        {{--const APP_URL = {!! json_encode(url('/')) !!};--}}
        const BASE_URL = "{{ env('APP_URL') }}";

        const APP_URL = {!! json_encode(url('/')) !!};
        console.log(APP_URL)
    </script>

    <script>
        const ASSETS_URL = {!! json_encode(asset('/dummy.png')) !!};
        console.log(ASSETS_URL)

        const STORAGE_URL = {!! json_encode(asset('ble.png')) !!}
        console.log(STORAGE_URL);
    </script>
</head>

<body>
<div id="example"></div>
</body>
</html>
