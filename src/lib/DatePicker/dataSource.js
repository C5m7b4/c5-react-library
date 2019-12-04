
/**
 * 
 */
export const defaultProps = {
    isPopup: true,
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1),
    showFooter: true,
    showHeader: true,
    showCaption: false,
    dateConfig: {
        'month': {
            format: 'M',
            caption: 'Mon',
            step: 1,
        },
        'date': {
            format: 'D',
            caption: 'Day',
            step: 1,
        },
        'year': {
            format: 'YYYY',
            caption: 'Year',
            step: 1,
        }
    },
    headerFormat: 'YYYY/MM/DD',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    onChange: () => {},
    onSelect: () => {},
    onCancel: () => {},
};


export const dateConfigMap = {
    'year': {
        format: 'YYYY',
        caption: 'Year',
        step: 1,
    },
    'month': {
        format: 'M',
        caption: 'Mon',
        step: 1,
    },
    'date': {
        format: 'D',
        caption: 'Day',
        step: 1,
    },
    'hour': {
        format: 'hh',
        caption: 'Hour',
        step: 1,
    },
    'minute': {
        format: 'mm',
        caption: 'Min',
        step: 1,
    },
    'second': {
        format: 'hh',
        caption: 'Sec',
        step: 1,
    },
};



