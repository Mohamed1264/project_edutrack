import { Ruler, ArrowLeft } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { TextField } from "../../../Components/form/Inputs";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import { useState } from "react";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

export default function AddLevel() {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);
  
  const { data, setData, post, reset, processing, errors } = useForm({
    libel: ''
  });

  const validation = {
    libel: {
      message: 'The level name should only contain letters and spaces',
      regex: /^[A-Za-z\s]+$/,
    }
  };

  const [localErrors, setLocalErrors] = useState({});

  // Updated to handle both direct value setting and event objects
  const handleChange = (name, value) => {
    setData(name, value);
    
    if (validation[name] && !validation[name].regex.test(value)) {
      setLocalErrors(prev => ({ ...prev, [name]: validation[name].message }));
    } else {
      setLocalErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleFocus = (name) => {
    setLocalErrors(prev => ({ ...prev, [name]: '' }));
  };

  const isSubmitDisabled = () => {
    return !data.libel || localErrors.libel || processing;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    post(route('schoolResources.levels.store'), {
      onSuccess: () => {
        toast.success('Level added successfully');
        reset();
      },
      onError: () => {
        toast.error('Failed to add level');
      },
      preserveScroll: true
    });
  };

  const handleClose = () => {
    reset();
    setIsConfirmAddingOpen(false);
  };

  return (
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
          <Ruler size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Level</h1>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form 
        submitBtnIsDisabled={isSubmitDisabled()}
        submitBtnTitle={'Add Level'}
        submitFunction={onSubmit}
      >
        <FormContainer title={'Level Information'} icon={Ruler}>
         
             <TextField
            error={localErrors.libel || errors.libel}
            name={'libel'}
            label={'level Libel'}
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
        itemName={'level'}
        confirmText="Confirm level adding"
        cancelText="Cancel adding" 
      />
    </SchoolResourcesLayout>
  );
}