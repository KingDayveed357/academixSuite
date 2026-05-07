import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import PageMeta from "../../../components/common/PageMeta";
import AppLayout from "../../../layouts/AppLayout";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import Label from "../../../components/form/Label";
import Input from "../../../components/form/input/InputField";
import Select from "../../../components/form/Select";
import TextArea from "../../../components/form/input/TextArea";

export default function CreateStudent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call, then redirect to the index page
    console.log("Submitting student data:", formData);
    // In a real Inertia flow, this would be: router.post('/admin/students', formData);
    router.visit('/students');
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last Name */}
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
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
                onChange={(value) => handleSelectChange("gender", value)}
              />
            </div>

            {/* Grade */}
            <div>
              <Label htmlFor="grade">Grade / Class</Label>
              <Select
                options={[
                  { value: "grade_9", label: "Grade 9" },
                  { value: "grade_10", label: "Grade 10" },
                  { value: "grade_11", label: "Grade 11" },
                  { value: "grade_12", label: "Grade 12" },
                ]}
                placeholder="Assign a class"
                onChange={(value) => handleSelectChange("grade", value)}
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
                value={formData.parentName}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="parentPhone">Phone Number</Label>
              <Input
                id="parentPhone"
                name="parentPhone"
                placeholder="+1 234 567 8900"
                value={formData.parentPhone}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="parentEmail">Email Address</Label>
              <Input
                id="parentEmail"
                name="parentEmail"
                type="email"
                placeholder="guardian@example.com"
                value={formData.parentEmail}
                onChange={handleChange}
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="address">Residential Address</Label>
              <TextArea
                id="address"
                name="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
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
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white transition-colors rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
            >
              Enroll Student
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

CreateStudent.layout = (page: React.ReactNode) => <AppLayout children={page} />;
