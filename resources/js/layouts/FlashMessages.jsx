import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { successNotify, dangerNotify } from '../Components/Common/Toast';

export default function FlashMessages() {
  const { props } = usePage();

  useEffect(() => {
    if (props.flash?.success) {
      successNotify(props.flash.success);
    } else if (props.flash?.error) {
      dangerNotify(props.flash.error);
    }
    // we don't render an inline element here; react-toastify handles the UI
  }, [props.flash]);

  return null;
}
