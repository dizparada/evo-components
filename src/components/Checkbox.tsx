import { useRef, useEffect } from 'react';
import type { ChangeEvent, ReactNode } from 'react';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';
import './Checkbox.css';

// ── Checkbox / Radio — Figma GKHSL8s3gPJsdvwuFdBc9K 1627-6510 ────────────────

interface CheckboxProps {
  type?: 'checkbox' | 'radio';
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
  label?: ReactNode;
}

export function Checkbox({
  type = 'checkbox',
  checked = false,
  indeterminate = false,
  disabled = false,
  onChange,
  name,
  value,
  label,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && type === 'checkbox') {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, type]);

  const isRadio = type === 'radio';
  const isChecked = checked || indeterminate;

  return (
    <label className={`checkbox${disabled ? ' checkbox--disabled' : ''}`}>
      <input
        ref={inputRef}
        type={type}
        className="checkbox__input"
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange?.(e.target.checked)}
      />
      <span
        className={[
          'checkbox__control',
          isRadio ? 'checkbox__control--radio' : 'checkbox__control--checkbox',
          isChecked ? 'checkbox__control--checked' : '',
          disabled ? 'checkbox__control--disabled' : '',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        {!isRadio && checked && !indeterminate && (
          <CheckIcon style={{ width: 12, height: 12 }} />
        )}
        {!isRadio && indeterminate && (
          <MinusIcon style={{ width: 12, height: 12 }} />
        )}
        {isRadio && checked && <span className="checkbox__radio-dot" />}
      </span>
      {label && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
