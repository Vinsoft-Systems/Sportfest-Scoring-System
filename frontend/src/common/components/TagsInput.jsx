/* eslint-disable no-unused-vars */
import { TagsInput } from '@mantine/core';

export function JsonFormsTagsInput({
  value: _value,
  onChange: _onChange,
  minRows,
  maxRows,
  validationError,
  autosize,
  formatOnBlur,
  ...props
}) {
  const value = _value && typeof _value === 'string' ? JSON.parse(_value) : [];
  const onChange = (newValue) => _onChange(JSON.stringify(newValue));
  return <TagsInput value={value} onChange={onChange} {...props} error={undefined} />;
}