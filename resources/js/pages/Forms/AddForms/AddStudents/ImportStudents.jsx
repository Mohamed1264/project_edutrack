import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { Upload, File } from "lucide-react";
import { ToastContainer } from "react-toastify";

import { Form, FormContainer } from "../../../../Components/form/GlobalComponents";
import { CustomSelect } from "../../../../Components/form/CustomSelect";
import { TextField } from "../../../../Components/form/Inputs";
import ConfirmAddModal from "../../../../Components/Modals/ConfirmAdding";

export default function ImportStudents({ groups }) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { data, setData, post, processing, reset, errors } = useForm({
    file: '',
    group: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData(name, files ? files[0] : value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleConfirm = () => {
    post(route('students.import'), {
      onSuccess: () => {
        localStorage.setItem('toastMessage', 'students imported successfully');
        reset();
        history.back();
      },
      onError: () => {
        setIsConfirmModalOpen(false);
      },
    });
  };

  const handleCloseModal = () => {
    reset();
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <ToastContainer pauseOnHover={false} closeButton={false} />
      <Form
        submitBtnIsDisabled={processing}
        submitBtnTitle="Import Students"
        submitFunction={handleSubmit}
        maxWidth="md:max-w-3xl pb-4"
      >
        <div className="w-full space-y-4">
          <FormContainer title="Import Students" icon={Upload}>
            <TextField
              type="file"
              error={errors.file}
              name="file"
              label="File"
              value={data.file?.name || ''}
              icon={File}
              placeHolder="Upload file"
              handleChange={handleChange}
              handleFocus={() => {}}
            />

            <CustomSelect
              name="group"
              label="Group"
              placeholder="Select students group"
              handleChange={handleChange}
              items={groups}
              value={data.group}
              position="top"
              error={errors.group}
            />
          </FormContainer>
        </div>
      </Form>

      <ConfirmAddModal
        isOpen={isConfirmModalOpen}
        onConfirm={handleConfirm}
        onClose={handleCloseModal}
        itemName="students"
        confirmText="Confirm students importing"
        cancelText="Cancel importing"
      />
    </>
  );
}
