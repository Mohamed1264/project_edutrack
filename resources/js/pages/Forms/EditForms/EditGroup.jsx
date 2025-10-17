import { Presentation, ArrowLeft } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";
import { toast } from "react-toastify";
import { SelectField } from "../../../Components/form/Select";
import { RatioField } from "../../../Components/form/RatioField";
import { TextField } from "../../../Components/form/Inputs";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { useState } from "react";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

export default function EditGroup({group,filieres,dataGroup}) {
  console.log(dataGroup);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { errors: inertiaErrors} = usePage().props;

  const filiereOptions = filieres.map(item => ({ option: item.name, value: item.id, par: item.parent_id }));
  const typeOptions=[{option: 'Regulaire', value: 'Regulaire'},
                     {option: 'Optionel', value:  'Optionel'}]
  console.log(group);
  
  const { data, setData, put, processing } = useForm({
    libel: group?.name || '',
    filiere: group?.parent?.id || '', // Assuming group -> year -> filiere hierarchy
    type:dataGroup?.type || '',
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

    if (name === 'filiere') {
      setData({ ...data, filiere: val, year: '', option: '' });
    } else if (name === 'year') {
      setData({ ...data, year: val, option: '' });
    } else {
      setData(name, val);
    }

    validateField(name, val);
  };

  const handleFocus = (name) => {
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
  };

  const isSubmitDisabled = () => {
    return !data.libel || !data.filiere || !data.type || localErrors.libel || processing;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmOpen(true);
  };

  const handleConfirm = () => {
    put(route('groups.update', group.id), {
      onSuccess: () => {
        toast.success('Group updated successfully');
      },
      onError: () => {
        toast.error('Failed to update group');
      }
    });
  };

  const handleClose = () => {
    setIsConfirmOpen(false);
  };
console.log(data);

  return (
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
          <Presentation size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Edit Group</h1>
        </div>
      </div>
      
      <Form
        submitBtnIsDisabled={isSubmitDisabled()}
        submitBtnTitle={'Update Group'}
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
            error={localErrors.libel }
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
        isOpen={isConfirmOpen}
        onConfirm={handleConfirm}
        onClose={handleClose}
        itemName={'group'}
        confirmText="Confirm group update"
        cancelText="Cancel update"
      />
    </SchoolResourcesLayout>
  );
}