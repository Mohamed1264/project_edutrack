import { BriefcaseBusiness, KeyRound, Mail, User, Wand, Phone } from "lucide-react";
import { useForm, router } from '@inertiajs/react';
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { formsHook } from "../../../utils/Hooks/formsHook";
import { RatioField } from "../../../Components/form/RatioField";
import { CustomSelect } from "../../../Components/form/CustomSelect";
import { DateField } from "../../../Components/form/Fields";
import { TextField, PasswordField } from "../../../Components/form/Inputs";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import { useState } from "react";
import { calculateAge } from "../../../utils/calcAge";
import { generateStrongPassword } from "../../../utils/generatePassword";
import Layout from '../../../layouts/Layout';
import { CustomSelect2 } from "../../../Components/form/CustomSelect2";
import HumanResources from "../../admin/HumanResources/HumanResources";
import HumanRessourcesNav from "../../admin/Indexes/HumanRessources";

export default function EditUser({ user, teacher, account }) {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    fullName: user.full_name,
    birthDate: user.birth_date,
    gender: user.gender,
    email: user.email,
    matricule: user.user_key,
    password: account.original_password,
    phone: user.phone_number,
    role: String(user.role_id), // Ensure it's a string for comparisons
    type:  account.teacher_type_id,
  };


  const validation = {
    fullName: {
        message: 'The name should not contain invalid symbols or numbers',
        regex: /^[A-Za-z]+\.?\s[A-Za-z]+([-'’][A-Za-z]+)*(\s[A-Za-z]+([-'’][A-Za-z]+)*)*$/,
      },
      
    birthDate: {
      message: 'The age should be between 18 and 65',
      validateFunc: (birthDate) => {
        const age = calculateAge(birthDate);
        return age >= 18 && age <= 65;
      },
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email, enter a valid professional email',
      },      
    phone: {
      message: 'Invalid phone number',
      regex: /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/,
    },
    password: {
      message: 'Password must be at least 8 characters, include uppercase, lowercase, number, and symbol',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
    },
  };

  const {
    values,
    errors,
    handleChange,
    handleFocus,
    handleSubmit,
    resetForm,
    isSubmitDisabled,
  } = formsHook(initialValues, validation, 'add');

  const onSubmit = () => {
    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmAddingOpen(false);
    setIsLoading(true);

    const payload = {
      full_name: values.fullName,
      birth_date: values.birthDate,
      gender: values.gender,
      email: values.email,
      user_key: values.matricule,
      password: values.password,
      phone_number: values.phone,
      role: values.role,
      type: values.type || '',
    };
    console.log(payload);

    router.put(`/humanResources/${user.user_key}`, payload, {
      onSuccess: () => {
        setIsLoading(false);
        console.log('User updated successfully!');
        resetForm();
      },
      onError: (errors) => {
        setIsLoading(false);
        console.error('Validation errors from backend:', errors);
      },
    });
  };

  const handleClose = () => {
    setIsConfirmAddingOpen(false);
  };

  return (
    <HumanRessourcesNav>
     

      <Form
        submitBtnTitle={isLoading ? 'Updating...' : 'Update User'}
        submitFunction={handleSubmit(onSubmit)}
        maxWidth="md:max-w-3xl pb-4 mt-5"
        disabled={isLoading}
      >
        <div className="w-full space-y-4">

          {/* Personal Information */}
          <FormContainer title="Personal Information" icon={User}>
            <TextField
              error={errors.fullName}
              name="fullName"
              label="Full Name"
              value={values.fullName}
              placeHolder="User's full name"
              icon={User}
              handleChange={handleChange}
              handleFocus={handleFocus}
            />
            <DateField
              name="birthDate"
              label="Birth Date"
              handleChange={handleChange}
              error={errors.birthDate}
              value={values.birthDate}
              handleFocus={handleFocus}
            />
            <RatioField
              name="gender"
              label="Gender"
              items={['Male', 'Female']}
              handleChange={handleChange}
              value={values.gender}
            />
            <TextField
              type="tel"
              error={errors.phone}
              name="phone"
              label="Professional Phone"
              value={values.phone}
              handleChange={handleChange}
              handleFocus={handleFocus}
              placeHolder="User's professional phone"
              icon={Phone}
            />
          </FormContainer>

          {/* Professional Information */}
          <FormContainer title="Professional Information" icon={BriefcaseBusiness}>
            <div className="flex gap-2 w-full">
              <TextField
                error={errors.matricule}
                name="matricule"
                label="Matricule"
                value={values.matricule}
                handleChange={handleChange}
                handleFocus={handleFocus}
                disabled={true}
                placeHolder="User's Matricule"
                icon={KeyRound}
              />
              <TextField
                type="email"
                error={errors.email}
                name="email"
                label="Professional Email"
                value={values.email}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder="User's professional email"
                icon={Mail}
              />
            </div>

            <CustomSelect2
              name="role"
              label="Role"
              value={values.role}
              handleChange={handleChange}
              options={[
                { value: '3', label: 'Teacher' },
                { value: '2', label: 'Absence Manager' },
              ]}
            />

            {values.role === '3' && (
              <CustomSelect2
                name="type"
                label="Type of Teacher"
                value={values.type}
                handleChange={handleChange}
                options={teacher.map((t) => ({
                  value: t.id,
                  label: t.teacher_type,
                }))}
              />
            )}

            <div className="flex gap-2 w-full items-center">
              <PasswordField
                error={errors.password}
                name="password"
                label="Password"
                value={values.password}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder="Enter password"
              />
              <button
                type="button"
                className="px-4 py-2.5 rounded-md flex items-center flex-1 w-full min-w-56 h-10 gap-2 text-sm font-medium translate-y-5 dark:bg-purple-950/50 dark:hover:bg-purple-900 dark:text-gray-50 dark:border-purple-600 border"
                onClick={() => handleChange('password', generateStrongPassword())}
              >
                <Wand size={18} className="dark:text-purple-500" />
                Generate Password
              </button>
            </div>
          </FormContainer>
        </div>
      </Form>

      <ConfirmAddModal
        isOpen={isConfirmAddingOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
        itemName={values.role || 'user'}
        confirmText={`Confirm updating ${values.role || 'user'}`}
        cancelText="Cancel update"
      />
    </HumanRessourcesNav>
  );
}