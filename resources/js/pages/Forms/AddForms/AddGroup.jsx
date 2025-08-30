import { Presentation, School, ArrowLeft } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { CustomSelect } from "../../../Components/form/CustomSelect";
import { RatioField } from "../../../Components/form/RatioField";
import { TextField } from "../../../Components/form/Inputs";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { useState } from "react";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';
import { SelectField } from "../../../Components/form/Select";

export default function AddGroup() {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);

  const { errors: inertiaErrors, filieres = [], type = [] } = usePage().props;

  const filiereOptions = filieres.map(item => ({ option: item.name, value: item.id, par: item.parent_id }));
  const typeOptions=[{option: 'Regulaire', value: 'Regulaire'},
                     {option: 'Optionel', value:  'Optionel'}]
 

  const { data, setData, post, reset, processing } = useForm({
    libel: '',
    filiere: '',
    type:''
   
  });
   const validations = {
    libel: {
      message: 'The libel should not contain symbols',
      regex: /^[A-Za-z]+\d*$/
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
    const name = typeof eOrName === 'object' ? eOrName.target.name : eOrName;
    const val = typeof eOrName === 'object' ? eOrName.target.value : value;
   console.log(value);
   
    // Reset dependent selects
    if (name === 'filiere') {
      setData({ ...data, filiere: val  });
     } else {
      setData(name, val);
    }

    validateField(name, val);
  };

  const handleFocus = (name) => {
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
  };

  const isSubmitDisabled = () => {
    return !data.libel || !data.filiere || localErrors.libel || processing;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    post(route('groups.store'), {
      onSuccess: () => {
        toast.success('Group added successfully');
        reset();
      },
      onError: () => {
        toast.error('Failed to add group');
      }
    });
  };

  const handleClose = () => {
    reset();
    setIsConfirmAddingOpen(false);
  };
  console.log(data);

  return (
    <>
      <SchoolResourcesLayout>
        <div className="mb-4 mt-4 px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft size={20} strokeWidth={2.5} />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <School size={24} strokeWidth={2.5} />
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add new Group</h1>
          </div>
        </div>
        <ToastContainer pauseOnHover={false} closeButton={false} />
        <Form
          submitBtnIsDisabled={isSubmitDisabled()}
          submitBtnTitle={'Add Group'}
          submitFunction={onSubmit}
          maxWidth="md:max-w-3xl pb-4"
        >
          <FormContainer title={'Group Information'} icon={Presentation}>
          <SelectField
            name="type"
            label="type"
            placeholder="Select type"
            handleChange={handleChange}
            items={typeOptions}
            value={data.type}
            error={inertiaErrors.type}
            labelKey="option"
            valueKey="value"
          />
            <TextField
              error={localErrors.libel || inertiaErrors.libel}
              name={'libel'}
              label={'Libel'}
              value={data.libel}
              handleChange={handleChange}
              handleFocus={() => handleFocus('libel')}
              placeHolder={'Group Libel'}
              icon={Presentation}
            />
            

            <SelectField
            name="filiere"
            label="Filiere"
            placeholder="Select filiere"
            handleChange={handleChange}
            items={filiereOptions}
            value={data.filiere}
            error={inertiaErrors.filiere}
            labelKey="option"
            valueKey="value"
          />
            
            
          </FormContainer>
        </Form>
        <ConfirmAddModal
          isOpen={isConfirmAddingOpen}
          onConfirm={handleConfirm}
          onClose={handleClose}
          itemName={'group'}
          confirmText="Confirm group adding"
          cancelText="Cancel adding"
        />
      </SchoolResourcesLayout>
    </>
  );
}
