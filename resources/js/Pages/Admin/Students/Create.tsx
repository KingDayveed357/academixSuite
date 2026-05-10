// import { useState } from "react";
// import { Link, router } from "@inertiajs/react";
// import PageMeta from "../../../components/common/PageMeta";
// import AppLayout from "../../../layouts/AppLayout";
// import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
// import Label from "../../../components/form/Label";
// import Input from "../../../components/form/input/InputField";
// import Select from "../../../components/form/Select";
// import TextArea from "../../../components/form/input/TextArea";

import { Link, router, useForm } from "@inertiajs/react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea";
import { usePlan } from "../../../hooks/usePlan";
import { AlertCircle, ArrowRight } from "lucide-react";
import route from "../../../utils/route";

export default function CreateStudent() {
  const plan = usePlan();
  const form = useForm({
    first_name: "",
    last_name: "",
    admission_no: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (plan.student_limit_reached) return;
    
    form.post(route('students.store'), {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <>
      <PageMeta title="Add New Student" description="Enroll a new student into the school system." />
      <PageBreadcrumb pageTitle="Add New Student" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Student Information
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {plan.student_limit_reached && (
            <div className="mb-8 flex items-start gap-4 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-xl">
              <AlertCircle className="size-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">Limit Reached</h4>
                <p className="text-sm text-rose-700 dark:text-rose-400 mt-1">
                  You have reached the 50-student limit for the Free plan. Upgrade to Growth for up to 500 students.
                </p>
                <Link 
                  href="/settings/billing" 
                  className="inline-flex items-center gap-1 mt-3 text-xs font-bold text-rose-800 dark:text-rose-300 underline underline-offset-4 decoration-rose-300 dark:decoration-rose-700"
                >
                  Upgrade anytime <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                placeholder="Enter first name"
                value={form.data.first_name}
                onChange={e => form.setData('first_name', e.target.value)}
                error={form.errors.first_name}
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                placeholder="Enter last name"
                value={form.data.last_name}
                onChange={e => form.setData('last_name', e.target.value)}
                error={form.errors.last_name}
              />
            </div>

            {/* Admission No */}
            <div>
              <Label htmlFor="admission_no">Admission No</Label>
              <Input
                id="admission_no"
                name="admission_no"
                placeholder="e.g. SCH-2024-001"
                value={form.data.admission_no}
                onChange={e => form.setData('admission_no', e.target.value)}
                error={form.errors.admission_no}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={form.data.dateOfBirth}
                onChange={e => form.setData('dateOfBirth', e.target.value)}
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                placeholder="Select gender"
                onChange={(value) => form.setData("gender", value)}
              />
            </div>
          </div>

          <div className="mt-8 mb-6 border-t border-gray-200 dark:border-gray-800"></div>

          <h4 className="mb-6 text-lg font-semibold text-gray-800 dark:text-white/90">
            Parent/Guardian Details
          </h4>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="parentName">Guardian Name</Label>
              <Input
                id="parentName"
                name="parentName"
                placeholder="Enter guardian's full name"
                value={form.data.parentName}
                onChange={e => form.setData('parentName', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="parentPhone">Phone Number</Label>
              <Input
                id="parentPhone"
                name="parentPhone"
                placeholder="+1 234 567 8900"
                value={form.data.parentPhone}
                onChange={e => form.setData('parentPhone', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="parentEmail">Email Address</Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                placeholder="guardian@example.com"
                value={form.data.parentEmail}
                onChange={e => form.setData('parentEmail', e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="address">Residential Address</Label>
              <TextArea
                id="address"
                name="address"
                placeholder="Enter full address"
                value={form.data.address}
                onChange={e => form.setData('address', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/students"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-theme-xs hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={form.processing || plan.student_limit_reached}
              className={`inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white transition-colors rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {form.processing ? 'Processing...' : 'Enroll Student'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

CreateStudent.layout = (page: React.ReactNode) => <AppLayout children={page} />;
