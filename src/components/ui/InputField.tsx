'use client';
import { useField } from 'formik';
import { FC, JSX } from 'react';

type BaseProps = {
  suffix?: string;
  prefix?: string;
  afterLabel?: string;
  beforeLabel?: string;
  afterLabelAlt?: string;
  beforeLabelAlt?: string;
  name: string;
};

type InputField = { fieldType?: 'input' } & JSX.IntrinsicElements['input'];
type SelectField = {
  fieldType?: 'select';
  selectItems: { value: string; label: string }[];
} & JSX.IntrinsicElements['select'];
type TextareaField = {
  fieldType?: 'textarea';
} & JSX.IntrinsicElements['textarea'];

type Props = BaseProps & (InputField | SelectField | TextareaField);

const InputField: FC<Props> = ({
  suffix,
  prefix,
  afterLabel,
  beforeLabel,
  afterLabelAlt,
  beforeLabelAlt,
  name,
  className = '',
  required = true,
  fieldType = 'input',
  children,
  ...rest
}) => {
  const [field, meta] = useField(name);

  const renderField = () => {
    if (fieldType === 'select') {
      const { selectItems, ...selectProps } = rest as SelectField;

      return (
        <select className="grow px-3 py-1" {...field} {...selectProps}>
          {selectItems?.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      );
    }
    if (fieldType === 'textarea') {
      return (
        <textarea
          className="grow px-3 py-1"
          {...field}
          {...(rest as JSX.IntrinsicElements['textarea'])}
        />
      );
    }
    return (
      <input
        className="grow px-3 py-1"
        {...field}
        {...(rest as JSX.IntrinsicElements['input'])}
      />
    );
  };

  return (
    <>
      <label className={`form-control w-full ${className}`}>
        {(beforeLabel || beforeLabelAlt) && (
          <div className="label">
            <span className="label-text">
              {beforeLabel}{' '}
              {required && <span className="text-red-400">⁕</span>}
            </span>
            <span className="label-text-alt">{beforeLabelAlt}</span>
          </div>
        )}
        <label
          className={`input input-bordered border flex items-center gap-2 ${
            meta.touched && meta.error ? 'input-error border-red-200' : ''
          }`}
        >
          {prefix}
          {renderField()}
          {suffix}
        </label>
        {((meta.touched && meta.error) || afterLabel || afterLabelAlt) && (
          <div className="label">
            {meta.touched && meta.error ? (
              <span className="label-text-alt text-red">{meta.error}</span>
            ) : (
              <span className="label-text-alt">{afterLabel}</span>
            )}
            <span className="label-text-alt">{afterLabelAlt}</span>
          </div>
        )}
      </label>
    </>
  );
};

export default InputField;
