@component('mail::message')
# Someone is trying to reach you!

Click on the button below to check who this person is!

@component('mail::button', ['url' => ''])
Connect
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
