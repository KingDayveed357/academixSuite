<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeeType extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'name', 'code', 'is_recurring'];
}
