import { BriefcaseBusiness, KeyRound, Mail, User, Wand ,Phone} from "lucide-react";
import { useForm , usePage, router ,Link} from '@inertiajs/react';
import { Form, FormContainer } from "../../../../Components/form/GlobalComponents";
import { formsHook } from "../../../../utils/Hooks/formsHook";
import { RatioField } from "../../../../Components/form/RatioField";
import { CustomSelect2 } from "../../../../Components/form/CustomSelect2";
import { DateField } from "../../../../Components/form/Fields";
import { TextField, PasswordField } from "../../../../Components/form/Inputs";
import ConfirmAddModal from "../../../../Components/Modals/ConfirmAdding";
import { useState } from "react";
import { calculateAge } from "../../../../utils/calcAge";
import { generateStrongPassword } from "../../../../utils/generatePassword";
import Layout from '../../../../layouts/Layout'
import { useEffect } from "react";      
export default function AddOneStudent({ groups }) {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);
  useEffect(() => {
    console.log(groups);
  }, [groups]);

  const [groupsList, setGroupsList] = useState([]);
  useEffect(() => {
    setGroupsList(
      groups.map(g => ({
        value: g.id,
        label: g.name
    }))
    );
  }, [groups]);
  
  const initialValues = {
    fullName: '',
    birthDate: '',
    gender: '',
    cef: '',
    email: '',
    password: '',
    phone:'',
    group :''
  };
  const {  post, reset,data,setData } = useForm(initialValues);

  const validation = {
    fullName: {
      message: 'The name should not contain symbols or numbers',
      regex: /^[A-Za-z]+(\s[A-Za-z]+)*$/
    },
    birthDate: {
      message: 'The age should be between 18 and 65',
      validateFunc: (birthDate) => {
        const age = calculateAge(birthDate);
        return age >= 18 && age <= 65;
      },
    },
    cef: {
      message: 'The cef should not contain symbols',
      regex: /^\d+$/
    },
    email: {
      regex: /^[a-zA-Z0-9][a-zA-Z0-9._%+-]*@ofppt-edu\.ma$/,
      message: 'Invalid email, enter professional email'
    },
    password: {
      message: 'Your password must be at least 8 characters long, and include lowercase and uppercase letters, numbers and symbols',
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/
    },
    confirmPassword: {
      message: 'The passwords do not match. Please make sure both password fields are identical.',
      check: 'password'
    }
  };

  const {
    values,
    errors,
    handleChange,
    handleFocus,
    handleSubmit,
    isSubmitDisabled
  } = formsHook(initialValues, validation, 'add');
  
  
  const onSubmit = () => {
    setIsConfirmAddingOpen(true);
  };
  
const handleConfirm = () => {
  setIsConfirmAddingOpen(false);

  const payload = {
    full_name: values.fullName,
    birth_date: values.birthDate,
    gender: values.gender,
    user_key: values.cef,
    email: values.email,
    password: values.password,
    phone_number: values.phone,
    group: values.group,

  };
  console.log(payload);


  router.post('/students', payload, {
    onSuccess: () => {
      console.log('Student added successfully!');
      // Optional: reset your custom form
      Object.keys(values).forEach(key => handleChange(key, ''));
    },
    onError: (errors) => {
      console.error('Validation errors from backend:', errors);
    }
  });
};

  const handleClose = () => {
    reset();
    setIsConfirmAddingOpen(false);
  };
  console.log(values.fullName);
  

  return (
    <Layout>
      
      <Form
        submitBtnTitle={'Add User'}
        submitFunction={handleSubmit(onSubmit)}
        maxWidth="md:max-w-3xl pb-4 mt-5">
        <div className="w-full space-y-4">
          

          {/* Personal Information */}
          <FormContainer title="Personal Information" icon={User}>
            <TextField 
              error={errors.fullName}
              name={'fullName'}
              label={'Full Name'}
              value={values.fullName}
              placeHolder={"User's full name"}
              icon={User}
              handleChange={handleChange}
              
              handleFocus={handleFocus}
            />
            <DateField 
              name={'birthDate'}
              label={'Birth Date'}
              handleChange={handleChange}
              error={errors.birthDate}
              value={values.birthDate}
              handleFocus={handleFocus}
            />
            <RatioField 
              name={'gender'}
              label={'Gender'}
              items={['Male','Female']}
              handleChange={handleChange}
              value={values.gender}
            />
            <TextField 
                type="tel"
                error={errors.phone}
                name={'phone'}
                label={'Professional Phone'}
                value={values.phone}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={"User's professional phone"}
                icon={Mail}
              />
          </FormContainer>

          {/* Professional Information */}
          <FormContainer title="Professional Information" icon={BriefcaseBusiness}>
            <div className='flex gap-2 w-full'>
              <TextField 
                error={errors.cef}
                name={'cef'}
                label={'Cef'}
                value={values.cef}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={"User's CEF"}
                icon={KeyRound}
              />
              <TextField 
                type="email"
                error={errors.email}
                name={'email'}
                label={'Professional Email'}
                value={values.email}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={"User's professional email"}
                icon={Mail}
              />
             
            </div>
            <CustomSelect2
              name="group"
              label="group"
              value={values.group}
              handleChange={handleChange}

              options={groupsList}  
            />
            

            <div className='flex gap-2 w-full items-center'>
              <PasswordField 
                error={errors.password}
                name={'password'}
                label={'Password'}
                value={values.password}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={"Enter password"}
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
        confirmText={`Confirm ${values.role || 'user'} adding`}
        cancelText="Cancel adding" 
      />
    </Layout>
  );
}
