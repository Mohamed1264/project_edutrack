import toast from 'react-hot-toast';

// Regenerated toast helpers — accept string/JSX or an options object { title, message, action }
function renderToastContent({ type = 'info', title = '', message = '', action } = {}) {
  const bg = type === 'success' ? 'bg-green-50 dark:bg-green-900/30' : type === 'error' ? 'bg-red-50 dark:bg-red-900/30' : type === 'info' ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-gray-50 dark:bg-gray-800';
  const text = type === 'success' ? 'text-green-800 dark:text-green-50' : type === 'error' ? 'text-red-800 dark:text-red-50' : type === 'info' ? 'text-blue-800 dark:text-blue-50' : 'text-gray-800 dark:text-gray-50';

  return (t) => (
    <div className={`flex items-start justify-between rounded-md px-4 py-3 w-full ${bg} ${text}`}>
      <div className="flex-1">
        {title && <div className="font-semibold text-sm mb-1">{title}</div>}
        <div className="text-sm">{message}</div>
      </div>
      <div className="flex-shrink-0 ml-4 flex items-center gap-2">
        {action && (
          <button
            className="text-sm font-medium px-3 py-1 rounded bg-white/60 dark:bg-gray-700/60"
            onClick={() => {
              try { action.onClick && action.onClick(); } catch (e) { /* ignore */ }
              toast.dismiss(t.id);
            }}
          >
            {action.label}
          </button>
        )}
        <button className="text-sm opacity-80" onClick={() => toast.dismiss(t.id)}>Close</button>
      </div>
    </div>
  );
}

function normalizeInput(input) {
  // input can be string/JSX or object
  if (typeof input === 'string' || input?.$$typeof) {
    return { title: '', message: input };
  }
  return {
    title: input?.title || '',
    message: input?.message || '',
    action: input?.action
  };
}

export const successNotify = (input, options = {}) => {
  const payload = normalizeInput(input);
  return toast.custom(renderToastContent({ ...payload, type: 'success', action: payload.action }), { duration: 4000, position: 'bottom-right', ...options });
};

export const dangerNotify = (input, options = {}) => {
  const payload = normalizeInput(input);
  return toast.custom(renderToastContent({ ...payload, type: 'error', action: payload.action }), { duration: 5000, position: 'bottom-right', ...options });
};

export const InfoNotify = (input, options = {}) => {
  const payload = normalizeInput(input);
  return toast.custom(renderToastContent({ ...payload, type: 'info', action: payload.action }), { duration: 4000, position: 'bottom-right', ...options });
};

export const defaultNotify = (input, options = {}) => {
  const payload = normalizeInput(input);
  return toast.custom(renderToastContent({ ...payload, type: 'default', action: payload.action }), { duration: 3000, position: 'bottom-right', ...options });
};
   