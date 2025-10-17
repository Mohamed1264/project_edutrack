import { PencilRuler, Ruler, ArrowLeft } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import toast from 'react-hot-toast';
import { TextField } from "../../../Components/form/Inputs";
import { SelectField } from "../../../Components/form/Select";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { useState } from "react";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';




export default function AddFiliere() {
    const { niveaux } = usePage().props;
const niveauxOptions = niveaux.map(item => ({
  option: item.name, // What you see in the dropdown
  value: item.id     // What is actually submitted
}));
console.log(niveaux);

  const { filieres, years } = usePage().props;

  const filiereOptions = filieres.map(f => ({ option: f.name, value: f.id }));
  const yearOptions = years.map(y => ({ option: y.name, value: y.id }));
console.log(filiereOptions);





  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);
  const { errors: inertiaErrors } = usePage().props;

  const { data, setData, post, reset, processing } = useForm({  
    niveau: '',
    libel: ''
  });

  const validations = {
    'libel': {
      message: 'the libel shouldn\'t contain symbols or numbers',
      regex: /^[A-Za-z]+$/
    }
  };

  const [localErrors, setLocalErrors] = useState({});

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
  // console.log('handleChange:', eOrName, value);

  if (typeof eOrName === 'string') {
    // Custom select: handleChange('niveau', 'value')
    setData(eOrName, value);
    validateField(eOrName, value);
  } else {
    // Native input: handleChange(event)
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

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(data); // You should see: { niveau: 3, libel: "SD" }

    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    post(route('schoolResources.fields.store'), {
      onSuccess: () => {
        toast.success('Filiere added successfully');
        reset();
      },
      onError: () => {
        toast.error('Failed to add filiere');
      }
    });
  };

  const handleClose = () => {
    reset();
    setIsConfirmAddingOpen(false);
  };
  // console.log(niveauxOptions);
  console.log(niveauxOptions);
  
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
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add new Filiere</h1>
        </div>
      </div>
      
      <Form
        submitBtnIsDisabled={isSubmitDisabled()}
        submitFunction={onSubmit}
        submitBtnTitle={'Add Filiere'}
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
      <ConfirmAddModal
        isOpen={isConfirmAddingOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
        itemName={'filiere'}
        confirmText="Confirm filiere adding"
        cancelText="Cancel adding"
      />
      </SchoolResourcesLayout>
    </>
  );
}