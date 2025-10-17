import { PencilRuler, Ruler, ArrowLeft } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import toast from 'react-hot-toast';
import { TextField } from "../../../Components/form/Inputs";
import { SelectField } from "../../../Components/form/Select";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { useState, useEffect } from "react";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import ConfirmUpdateModal from "../../../Components/Modals/ConfirmUpdate";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

export default function EditFiliere() {
  const { niveaux, filiere } = usePage().props;

  // Map niveaux to options for SelectField
  const niveauxOptions = niveaux.map(item => ({
    option: item.name, // label in dropdown
    value: item.id     // actual value
  }));

  // Form state managed by Inertia useForm, initialized with filiere data
  const { data, setData, put, processing, reset, errors: inertiaErrors } = useForm({
    niveau: filiere.parent_id || '',
    libel: filiere.name || ''
  });

  const [localErrors, setLocalErrors] = useState({});
  const [isConfirmUpdateOpen, setIsConfirmUpdateOpen] = useState(false);

  // Validation rules (same as your AddFiliere)
  const validations = {
    'libel': {
      message: 'The libel shouldn\'t contain symbols or numbers',
      regex: /^[A-Za-z\s]+$/ // allow spaces too
    }
  };

  const validateField = (name, value) => {
    if (validations[name]) {
      if (!validations[name].regex.test(value)) {
        setLocalErrors(prev => ({ ...prev, [name]: validations[name].message }));
        return false;
      }
    }
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
    return true;
  };

  const handleChange = (eOrName, value) => {
    if (typeof eOrName === 'string') {
      // SelectField change: handleChange('niveau', value)
      setData(eOrName, value);
      validateField(eOrName, value);
    } else {
      // Input change: handleChange(event)
      const { name, value } = eOrName.target;
      setData(name, value);
      validateField(name, value);
    }
  };

  const handleFocus = (name) => {
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
  };

  const isSubmitDisabled = () => {
    return !data.niveau || !data.libel || localErrors.libel || processing;
  };

  // On submit opens confirmation modal
  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmUpdateOpen(true);
  }; 

  // Confirm update calls PUT request to filiere update route
  const handleConfirm = () => {
    put(route('schoolResources.fields.update', filiere.id), {
      onSuccess: () => {
        toast.success('Filiere updated successfully');
        reset();
        setIsConfirmUpdateOpen(false);
      },
      onError: () => {
        toast.error('Failed to update filiere');
      }
    });
  };

  const handleClose = () => {
    setIsConfirmUpdateOpen(false);
  };

  return (
    <>
      <SchoolResourcesLayout>
        <div className="mb-8 mt-6 px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <PencilRuler size={24} strokeWidth={2.5} />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Filiere</h1>
          </div>
        </div>

        

        <Form
          submitBtnIsDisabled={isSubmitDisabled()}
          submitFunction={onSubmit}
          submitBtnTitle={'Update Filiere'}
          maxWidth="md:max-w-3xl"
        >
          <FormContainer title="Filiere Information" icon={PencilRuler}>
            <SelectField
              label={'Niveau'}
              name={'niveau'}
              value={data.niveau}
              placeholder={'Select niveau'}
              handleChange={handleChange}
              items={niveauxOptions}
              error={inertiaErrors.niveau}
              labelKey="option"
              valueKey="value"
            />

            <TextField
              error={localErrors.libel || inertiaErrors.libel}
              name={'libel'}
              label={'Filiere Libel'}
              value={data.libel}
              placeHolder={"Enter filiere libel"}
              icon={Ruler}
              handleChange={handleChange}
              handleFocus={() => handleFocus('libel')}
            />
          </FormContainer>
        </Form>

        <ConfirmUpdateModal
          isOpen={isConfirmUpdateOpen}
          onConfirm={handleConfirm}
          onClose={handleClose}
          itemName={'filiere'}
          confirmText="Confirm filiere update"
          cancelText="Cancel update"
        />
      </SchoolResourcesLayout>
    </>
  ); 
}
