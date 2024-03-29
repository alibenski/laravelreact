<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width">

        <title>{{ config('app.name') }}</title>

        <link rel="stylesheet" href="/css/app.css" type="text/css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </head>
    <body style="height:100vh; background-image:url('/images/bgConecta.png'); background-size:cover">
        <div id="index"></div>

        <script src="/js/app.js"></script>
    </body>
</html>
