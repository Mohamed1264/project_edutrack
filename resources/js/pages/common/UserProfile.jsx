import { useState } from "react"
import ChangePassword from "../Forms/ChangePassword"
import { DateField } from "../../Components/form/Fields"
import { ModalProvider } from "../../utils/Context/ModalContext"
import { TextField } from "../../Components/form/Inputs"
import { RatioField } from "../../Components/form/RatioField"
import { Form, FormContainer } from "../../Components/form/GlobalComponents"
import { User, Mail, KeyRound } from "lucide-react"
import useForm from "../../utils/Hooks/useForm"
import { calculateAge } from "../../utils/calcAge"
import Layout from '../../layouts/Layout';

export default function UserProfile({ user, role, password }) {
   console.log(user)
  const [section, setSection] = useState('General Info')
  console.log(user)
  const initialValues = {
    matricule: user?.user_key || '',
    fullName: user?.full_name || '',
    birthDate: user?.birth_date || '',
    gender: user?.gender || '',
    email: user?.email || '',
    password: password || '', // keep empty for password fields
  }

  const validation = {
    fullName: {
      message: 'The name should not contain symbols or numbers',
      regex: /^[A-Za-z\s]+$/, // Added space to allow names with spaces
    },
    birthDate: {
      message: 'The age should be between 18 and 65',
      validateFunc: (birthDate) => {
        const age = calculateAge(birthDate)
        return age >= 18 && age <= 65
      },
    },
    matricule: {
      message: 'The matricule should not contain symbols',
      regex: /^[a-zA-Z0-9]+$/,
    },
    email: {
      regex: /^[a-zA-Z0-9._%+-]+@ofppt\.[a-zA-Z]{2,}$/,
      message: 'Invalid email, enter professional email',
    },
  }

  const { values, errors, handleChange, handleFocus, handleSubmit, isSubmitDisabled } = useForm(initialValues, validation, 'edit')

  const isDisabled = role !== 'Admin'

  const activeStyle = 'border-b-2 border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400 font-medium'
  const desactiveStyle = 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200'
  const getTheStyle = (s) => s === section ? activeStyle : desactiveStyle

  const Tab = ({ section }) => {
    return (
      <button
        onClick={() => setSection(section)}
        className={`px-4 py-2 text-sm ${getTheStyle(section)}`}
      >
        {section}
      </button>
    )
  }

  return (
   <Layout>
    <div className="select-none px-8">
      <h1 className="my-4 ml-2 text-gray-700 dark:text-gray-50 font-semibold text-lg">Welcome to your Profile</h1>
      <div className="flex items-center gap-2 mb-3 border-b border-gray-200 dark:border-gray-700">
        {['General Info'].map(section => <Tab key={section} section={section} />)}
      </div>

      
        <Form
          submitFunction={handleSubmit}
          submitBtnTitle={'Save'}
          submitBtnIsDisabled={isSubmitDisabled()}
          isBtnHidden={isDisabled}
          maxWidth="md:max-w-3xl pb-6"
        >
          <FormContainer title={'Your Information'} icon={User}>
            <TextField
              error={errors.fullName}
              name={'fullName'}
              label={'Full Name'}
              value={values.fullName}
              placeHolder={"Your full name"}
              icon={User}
              handleChange={handleChange}
              handleFocus={handleFocus}
              disabled={isDisabled}
            />

            <DateField
              name={'birthDate'}
              label={'Birth Date'}
              handleChange={handleChange}
              error={errors.birthDate}
              value={values.birthDate}
              handleFocus={handleFocus}
              disabled={isDisabled}
            />

            <RatioField
              name={'gender'}
              label={'Gender'}
              items={['Male', 'Female']}
              handleChange={handleChange}
              value={values.gender}
              disabled={isDisabled}
            />

            <div className='flex gap-10 w-full'>
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
                disabled={isDisabled}
              />
              <TextField
                error={errors.matricule}
                name={'matricule'}
                label={'Matricule'}
                value={values.matricule}
                handleChange={handleChange}
                handleFocus={handleFocus}
                placeHolder={"User's matricule"}
                icon={KeyRound}
                disabled={isDisabled}
              />
            </div>
          </FormContainer>
        </Form>
    </div>
    </Layout>

  )
}
