import { School, ArrowLeft } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import { Form, FormContainer } from "../../../Components/form/GlobalComponents";
import { TextField } from "../../../Components/form/Inputs";
import ConfirmAddModal from "../../../Components/Modals/ConfirmAdding";
import { useState } from "react";
import SchoolResourcesLayout from '../../../layouts/SchoolResourcesLayout';

export default function EditRoom({room}) {
  const [isConfirmAddingOpen, setIsConfirmAddingOpen] = useState(false);
  console.log(room);
  
  const { data, setData, put, reset, processing, errors } = useForm({
    roomName: room.room_name || ''
  });

  const validation = {
    roomName: {
      message: 'The room name should not contain symbols',
      regex: /^[A-Za-z0-9]+(?:\s[A-Za-z0-9]+)*$/,
    }
  };

  const [localErrors, setLocalErrors] = useState({});

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
    return !data.roomName || localErrors.roomName || processing;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsConfirmAddingOpen(true);
  };

  const handleConfirm = () => {
    put(route('room.update', room.id), {
      onSuccess: () => {
        toast.success('Salle Bien Modifie');
        reset();
      },
      onError: () => {
        toast.error('Salle n a pas modifie');
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
          <School size={24} strokeWidth={2.5} />
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add new Room</h1>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form 
        submitBtnIsDisabled={isSubmitDisabled()}
        submitBtnTitle={'Add Room'}
        submitFunction={onSubmit}
      >
        <FormContainer title={'Room Information'} icon={School}>
          <TextField 
            error={localErrors.roomName || errors.roomName}
            name={'roomName'}
            label={'Room Name'}
            value={data.roomName}
            placeHolder={"Enter room name"}
            icon={School}
            handleChange={handleChange}
            handleFocus={() => handleFocus('roomName')}
          />
        </FormContainer>
      </Form>
      <ConfirmAddModal 
        isOpen={isConfirmAddingOpen} 
        onConfirm={handleConfirm} 
        onClose={handleClose} 
        itemName={'room'}
        confirmText="Confirm room adding"
        cancelText="Cancel adding" 
      />
    </SchoolResourcesLayout>
  );
}