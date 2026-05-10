<?php

return [
    'free' => [
        'max_students'   => 50,
        'max_staff'      => 1,
        'can_export_pdf' => false,
        'can_export_csv' => false,
        'can_view_history' => false, // previous terms
    ],
    'growth' => [
        'max_students'   => 500,
        'max_staff'      => 5,
        'can_export_pdf' => true,
        'can_export_csv' => true,
        'can_view_history' => true,
    ],
    'school' => [
        'max_students'   => -1, // unlimited
        'max_staff'      => -1,
        'can_export_pdf' => true,
        'can_export_csv' => true,
        'can_view_history' => true,
    ],
];
