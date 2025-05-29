import { Clipboard, Repeat, Copy, Scissors, Pen, Trash2 } from "lucide-react";

export default function ContextMenu({handlePaste, handleReplace, handleCopy, handleCut, selectedSession, selectedSessionToCopy, handleModify, handleDelete,entity}) { 
    const conditions = {
        teacher : selectedSession?.group_name,
        group : selectedSession?.teacher_name,
        room : selectedSession?.teacher_name && selectedSession?.group_name
    }
    return (
        <div 
            className="absolute min-w-[180px] z-50 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm" 
        >
            <div className="p-1.5 space-y-0.5 ">
               
                <button
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 `
                    }
                    onClick={handleModify}
                >
                    <span className={`text-gray-400 dark:text-gray-500 group-hover:text-purple-500`}>
                        <Pen size={16} />
                    </span>
                    {! conditions[entity] ? 'Add' : 'Edit'}
                </button>
                    
               
                <button
                    disabled={(!conditions[entity] && !selectedSessionToCopy?.idSession) || (conditions[entity])}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                   text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`
                   }
                    onClick={handlePaste}
                >
                    <span className={`text-gray-400 dark:text-gray-500 group-hover:text-purple-500`}>
                         <Clipboard size={16} />
                    </span>
                    Paste
                </button>
                <button
                    disabled={!selectedSession || !selectedSessionToCopy?.idSession || !conditions[entity]}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                   text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`
                   }
                    onClick={handleReplace}
                >
                    <span className={`text-gray-400 dark:text-gray-500 group-hover:text-purple-500`}>
                        <Repeat size={16} />
                    </span>
                    Replace
                </button>
                <button
                    disabled={!conditions[entity]}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                   text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`
                   }
                    onClick={handleCopy}
                >
                    <span className={`text-gray-400 dark:text-gray-500 group-hover:text-purple-500`}>
                         <Copy size={16} />
                    </span>
                    Copy
                </button>
                <button
                    disabled={!conditions[entity]}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                   text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-400 disabled:opacity-50 disabled:cursor-not-allowed`
                   }
                    onClick={handleCut}
                >
                    <span className={`text-gray-400 dark:text-gray-500 group-hover:text-purple-500`}>
                         <Scissors size={16} />
                    </span>
                    Cut
                </button>
                {
                    conditions[entity] && (
                        <button
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                        text-red-700 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 `
                        }
                            onClick={handleDelete}
                        >
                            <span className={`text-red-400 dark:text-red-500 group-hover:text-red-500`}>
                                <Trash2 size={16} />
                            </span>
                            Delete
                        </button>
                    )
                }
            </div>
        </div>
       

    )
}

