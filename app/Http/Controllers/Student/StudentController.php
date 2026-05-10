<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Services\PlanService;
use App\Support\Tenancy\TenantContext;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function __construct(
        private readonly PlanService $planService,
        private readonly TenantContext $tenantContext
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Students/Index', [
            'students' => Student::orderBy('last_name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Students/Create');
    }

    public function store(Request $request)
    {
        $school = $this->tenantContext->get();

        if ($this->planService->studentLimitReached($school)) {
            return back()->withErrors(['plan' => 'Student limit reached on your current plan.']);
        }

        $data = $request->validate([
            'first_name'   => ['required', 'string', 'max:255'],
            'last_name'    => ['required', 'string', 'max:255'],
            'admission_no' => ['required', 'string', 'max:255', 'unique:students,admission_no'],
        ]);

        Student::create($data);
        
        // Activation Hook
        if (is_null($school->first_student_added_at)) {
            $school->update(['first_student_added_at' => now()]);
        }
        
        return redirect()->route('students.index')->with('success', 'Student registered successfully.');
    }
}
