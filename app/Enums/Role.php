<?php

namespace App\Enums;

enum Role: string
{
    case SUPER_ADMIN = 'super_admin';
    case SCHOOL_OWNER = 'school_owner';
    case SCHOOL_ADMIN = 'school_admin';
    case BURSAR = 'bursar';
    // case TEACHER = 'teacher';
    // case PARENT = 'parent';
    // case STUDENT = 'student';
}
