import React, { useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';

const FormInput = ({
    type = 'text',
    value,
    onChange = () => {},
    label,
    name,
    error,
    options,
    placeholder,
    className,
    required,
    disabled,
    ...rest
}) => {
    const toast = useRef(null);

    const showRequiredError = () => {
        toast.current.show({
            severity: 'error',
            summary: 'Required Field',
            detail: `${label || name} is required`,
            life: 3000
        });
    };

    const handleChange = (e) => {
        if (typeof onChange !== 'function') {
            console.warn('Warning: onChange prop is not a function');
            return;
        }

        let newValue = e.target?.value;
        
        if (type === 'number') {
            newValue = e.value;
        } else if (type === 'dropdown') {
            newValue = e.value;
        }

        if (required && !newValue && newValue !== 0) {
            showRequiredError();
        }
        
        onChange(newValue);
    };

    const handleBlur = (e) => {
        if (required && !value && value !== 0) {
            showRequiredError();
        }
        
        if (rest.onBlur) {
            rest.onBlur(e);
        }
    };

    const baseClassName = classNames(
        'w-full transition-all duration-200',
        'border border-gray-300/50 dark:border-gray-600/50',
        'rounded-xl shadow-sm bg-white dark:bg-gray-800',
        'px-4 py-2.5',
        'focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20',
        'dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500',
        'hover:border-blue-500/30 dark:hover:border-blue-400/30',
        { 'p-invalid ring-2 ring-red-500/20 border-red-500/50': error || (required && !value && value !== 0) },
        { 'opacity-60 cursor-not-allowed': disabled },
        className
    );

    const labelClassName = classNames(
        'block text-sm font-medium mb-1.5',
        'text-gray-700 dark:text-gray-200',
        { 'opacity-60': disabled }
    );

    const iconClassName = classNames(
        'pi absolute left-4 top-1/2 -translate-y-1/2',
        'text-gray-400 dark:text-gray-500',
        { 'text-red-400 dark:text-red-500': error }
    );

    const renderInput = () => {
        const commonProps = {
            id: name,
            name,
            disabled,
            placeholder,
            onBlur: handleBlur,
            ...rest
        };

        switch (type) {
            case 'number':
                return (
                    <div className="relative">
                        {rest.icon && <i className={classNames(iconClassName, rest.icon)} />}
                        <InputNumber
                            value={value}
                            onValueChange={handleChange}
                            className={classNames(baseClassName, rest.icon && 'pl-11')}
                            inputClassName="border-0 focus:ring-0 w-full p-0"
                            showButtons={false}
                            {...commonProps}
                        />
                    </div>
                );
            
            case 'textarea':
                return (
                    <InputTextarea
                        value={value}
                        onChange={handleChange}
                        className={classNames(baseClassName, 'resize-none min-h-[100px]')}
                        rows={4}
                        {...commonProps}
                    />
                );
            
            case 'password':
                return (
                    <div className="relative">
                        {rest.icon && <i className={classNames(iconClassName, rest.icon)} />}
                        <Password
                            value={value}
                            onChange={handleChange}
                            className={classNames('w-full', rest.icon && 'pl-11')}
                            inputClassName={classNames(baseClassName, 'border-0 focus:ring-0 w-full !p-0')}
                            toggleMask
                            feedback={false}
                            {...commonProps}
                        />
                    </div>
                );
            
            case 'date':
                return (
                    <div className="relative">
                        <Calendar
                            value={value}
                            onChange={handleChange}
                            className={baseClassName}
                            inputClassName="border-0 focus:ring-0 w-full p-0"
                            showIcon
                            {...commonProps}
                        />
                    </div>
                );
            
            case 'dropdown':
                return (
                    <div className="relative">
                        {rest.icon && <i className={classNames(iconClassName, rest.icon)} />}
                        <Dropdown
                            value={value}
                            onChange={handleChange}
                            options={options}
                            className={classNames(baseClassName, rest.icon && 'pl-11')}
                            {...commonProps}
                        />
                    </div>
                );
            
            default:
                return (
                    <div className="relative">
                        {rest.icon && <i className={classNames(iconClassName, rest.icon)} />}
                        <InputText
                            type={type}
                            value={value}
                            onChange={handleChange}
                            className={classNames(baseClassName, rest.icon && 'pl-11')}
                            {...commonProps}
                        />
                    </div>
                );
        }
    };

    return (
        <div className="field mb-6">
            <Toast ref={toast} />
            {label && (
                <label htmlFor={name} className={labelClassName}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {renderInput()}
                {(error || (required && !value && value !== 0)) && (
                    <small className="absolute -bottom-5 left-0 text-red-500 text-xs mt-1 font-medium">
                        {error || `${label || name} is required`}
                    </small>
                )}
            </div>
        </div>
    );
};

export default FormInput; 