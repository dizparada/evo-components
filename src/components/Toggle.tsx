import './Toggle.css';

// ── Toggle — Figma GKHSL8s3gPJsdvwuFdBc9K 1627-6488 ─────────────────────────

interface ToggleProps {
  pressed?: boolean;
  disabled?: boolean;
  onChange?: (pressed: boolean) => void;
  label?: string;
}

export function Toggle({ pressed = false, disabled = false, onChange, label }: ToggleProps) {
  return (
    <label className={`toggle${disabled ? ' toggle--disabled' : ''}`}>
      <input
        type="checkbox"
        className="toggle__input"
        checked={pressed}
        disabled={disabled}
        onChange={e => onChange?.(e.target.checked)}
      />
      <span
        className={[
          'toggle__track',
          pressed ? 'toggle__track--on' : '',
          disabled ? 'toggle__track--disabled' : '',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        <span className="toggle__knob" />
      </span>
      {label && <span className="toggle__label">{label}</span>}
    </label>
  );
}
