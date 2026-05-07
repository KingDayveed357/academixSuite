<?php

namespace App\Models;

use App\Models\Concerns\BelongsToSchool;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OnboardingSetting extends Model
{
    use HasFactory, BelongsToSchool;

    protected $fillable = ['school_id', 'key', 'value'];

    public function school()
    {
        return $this->belongsTo(School::class);
    }
}
