<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class OrganizationController extends Controller
{
    public function getAllOrganizations()
    {
        $organizations = DB::table('organizations')->get();
        $data=[];
        foreach ($organizations as $org) {
            $data[] = [
                'label' => $org->name,
                'value' => $org->id
            ];  
        }
        return response()->json($data);
    }

    public function getAllCountries()
    {
        $countries = DB::table('stations')->get();
        $data=[];
        foreach ($countries as $country) {
            $data[] = [
                'label' => $country->name,
                'value' => $country->id
            ];  
        }
        return response()->json($data);
    }
}
