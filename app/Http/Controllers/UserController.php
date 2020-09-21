<?php

namespace App\Http\Controllers;

use App\User;
use App\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public $successStatus = 200;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function showUserSkills()
    {
        $user = Auth::user();
        $userSkills = [];

        foreach ($user->childskills as $childskill) {
            $userSkills[] = $childskill;
        }
        return response()->json($userSkills);
    }

    /** 
     * details api 
     * 
     * @return \Illuminate\Http\Response 
     */
    public function details()
    {
        $userId = Auth::id();
        $userWithSkills = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->with('languages')
            ->first();
        return response()->json(['success' => $userWithSkills], $this->successStatus);
    }

    public function insertUser(Request $request)
    {
        DB::transaction(function () use ($request) {

            $userId = 1;
            if (User::count() > 0) {
                $userId = User::max('id') + 1;
            }
            $name = ($request->firstName) . " " . ($request->familyName);

            DB::insert('INSERT INTO users (id, name,firstname,lastname,gender,email,created_at,password)
            VALUES (?,?,?,?,?,?,now(),?)', [
                $userId, $name, $request->firstName, $request->familyName,
                $request->userGender, $request->email, 'notManagedYet'
            ]);

            foreach ($request->state["checked"] as $skillId) {

                DB::insert('INSERT INTO childskill_user (user_id, childskill_id)
                    VALUES (?,?)', [$userId, $skillId]);
            }
        });
    }

    public function updateUserProfile(Request $request)
    {
        $user = Auth::user();
        $input = [
            'gender' => $request->state["gender"],
            'phone' => $request->state["phone"],
            'firstname' => $request->state["fields"]["firstname"],
            'lastname' => $request->state["fields"]["lastname"],
            'email' => $request->state["fields"]["email"],
            'dob' => $request->state["fields"]["dob"],
            'bio' => $request->state["fields"]["bio"],
            'shadow' => $request->state["checkbox"]["shadow"],
            'mentor' => $request->state["checkbox"]["mentor"],
            'mentee' => $request->state["checkbox"]["mentee"],
            'host' => $request->state["checkbox"]["host"],
            'volunteer' => $request->state["checkbox"]["volunteer"],
            'organization_id' => $request->state["organization"]["value"],
            'station_id' => $request->state["station"]["value"],
        ];
        $filteredInput = array_filter(
            $input,
            function ($v) {
                return !is_null($v);
            }
        );
        $user->update($filteredInput);
        $user->update([
            'name' => $user->firstname . ' ' . $user->lastname
        ]);
        if (is_null($request->state["fields"]["bio"])) {
            $user->update([
                'bio' => null
            ]);
        }
        $language = $request->state["language"];
        $this->updateUserLanguage($user, $language);

        $selected = $request->state["selected"];
        $selectedSkills = [];
        if ($selected) {
            foreach ($selected as $skill) {
                if (array_key_exists("type", $skill)) {
                    $selectedSkills[] = [
                        'value' => $skill["value"],
                        'type' => $skill["type"],
                    ];
                } else {
                    $selectedSkills[] = [
                        'value' => $skill["value"],
                        'type' => 'tag',
                    ];
                }
            }
        }
        $dataSkills = $this->updateUserSkills($user, $selectedSkills);

        $selectedDesired = $request->state["selectedDesired"];
        $desiredSkills = [];
        if ($selectedDesired) {
            foreach ($selectedDesired as $dskill) {
                if (array_key_exists("type", $dskill)) {
                    $desiredSkills[] = [
                        'value' => $dskill["value"],
                        'type' => $dskill["type"],
                    ];
                } else {
                    $desiredSkills[] = [
                        'value' => $dskill["value"],
                        'type' => 'tag',
                    ];
                }
            }
        }
        $dataDesiredSkills = $this->updateDesiredUserSkills($user, $desiredSkills);

        $userId = Auth::id();
        $userWithSkills = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->with('languages')
            ->first();
        return response()->json($userWithSkills);
    }

    public function updateUserLanguage($user, $language)
    {
        $languageArray = [];
        foreach ($language as $key => $value) {
            if ($key === "Arabic" && $value === true) {
                $languageArray[] = 1;
            }
            if ($key === "Chinese" && $value === true) {
                $languageArray[] = 2;
            }
            if ($key === "English" && $value === true) {
                $languageArray[] = 3;
            }
            if ($key === "French" && $value === true) {
                $languageArray[] = 4;
            }
            if ($key === "Russian" && $value === true) {
                $languageArray[] = 5;
            }
            if ($key === "Spanish" && $value === true) {
                $languageArray[] = 6;
            }
        }
        $user->languages()->sync($languageArray);
    }

    public function updateUserSkills($user, $selectedSkills)
    {
        $integerSkillValue = [];
        $stringSkillValue = [];
        foreach ($selectedSkills as $skillValue) {
            if (is_int($skillValue["value"])) {
                $integerSkillValue[] = [
                    "id" => $skillValue["value"],
                    "type" => $skillValue["type"],
                ];
            } else {
                $stringSkillValue[] = ["skillname" => $skillValue["value"]];
            }
        }

        foreach ($integerSkillValue as $v) {
            if ($v["type"] === "child") {
                $skillId = $v["id"];
                $user->childskills()->sync($skillId, false);
            }
            if ($v["type"] === "tag") {
                $tagSkillId = $v["id"];
                $user->tagskills()->sync($tagSkillId, false);
            }
        }

        $idTag = [];
        foreach ($stringSkillValue as $arrayValue) {
            // check if entry is duplicate before inserting
            $idTag[] = Tag::insertGetId($arrayValue);
        }

        $skillTagId = $idTag;
        $user->tagskills()->sync($skillTagId, false);

        return $selectedSkills;
    }

    public function updateDesiredUserSkills($user, $desiredSkills)
    {
        $integerDesiredSkillValue = [];
        $stringDesiredSkillValue = [];
        foreach ($desiredSkills as $desiredSkillValue) {
            if (is_int($desiredSkillValue["value"])) {
                $integerDesiredSkillValue[] = [
                    "id" => $desiredSkillValue["value"],
                    "type" => $desiredSkillValue["type"],
                ];
            } else {
                $stringDesiredSkillValue[] = ["skillname" => $desiredSkillValue["value"]];
            }
        }

        foreach ($integerDesiredSkillValue as $dv) {
            if ($dv["type"] === "child") {
                $dskillId = $dv["id"];
                $user->desiredskills()->sync($dskillId, false);
            }
            if ($dv["type"] === "tag") {
                $dtagSkillId = $dv["id"];
                $user->desiredtagskills()->sync($dtagSkillId, false);
            }
        }

        $idTag = [];
        foreach ($stringDesiredSkillValue as $arrayValue) {
            // check if entry is duplicate before inserting
            $idTag[] = Tag::insertGetId($arrayValue);
        }

        $skillTagId = $idTag;
        $user->desiredtagskills()->sync($skillTagId, false);

        return $desiredSkills;
    }

    public function deleteUserSkill(Request $request)
    {
        $user = Auth::user();
        $skillId = $request->skillId;
        if ($request->skillType === 'cskill') {
            $user->childskills()->detach($skillId);
        }
        if ($request->skillType === 'tskill') {
            $user->tagskills()->detach($skillId);
        }
        if ($request->skillType === 'dcskill') {
            $user->desiredskills()->detach($skillId);
        }
        if ($request->skillType === 'dtskill') {
            $user->desiredtagskills()->detach($skillId);
        }
        $userId = Auth::id();
        $data = User::where('id', $userId)
            ->with('childskills')
            ->with('desiredskills')
            ->with('tagskills')
            ->with('desiredtagskills')
            ->with('stations')
            ->with('organizations')
            ->with('languages')
            ->first();
        return response()->json($data);
    }

    public function storeImage(Request $request)
    {
        // $this->validate($request, [
        //     'file' => 'mimes:jpg,jpeg,png|max:8000',
        // ]);

        $image_64 = $request->get('file'); //your base64 encoded data
        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);

        // find substring fro replace here eg: data:image/png;base64,

        $image = str_replace($replace, '', $image_64);
        $image = str_replace(' ', '+', $image);
        $imageName = Str::random(10) . '.' . $extension;

        Storage::disk('public')->put($imageName, base64_decode($image));

        // save in database
        $userId = Auth::id();
        $user = User::where('id', $userId)->first();
        $user->update(['photo' => $imageName]);

        return response()->json($user);
    }
}
