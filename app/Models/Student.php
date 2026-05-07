<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'admission_no', 'first_name', 'last_name', 'status'];
}
