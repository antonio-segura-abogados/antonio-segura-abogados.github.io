import { useEffect, useId, useRef, useState } from 'react';
import type { SelectOption } from './catalogos';

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();

export function SearchSelect({ options, value, onChange, multiple = false, placeholder, label }: {
  options: SelectOption[]; value: string; onChange: (value: string) => void; multiple?: boolean; placeholder: string; label: string;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const disabled = value === 'unknown';
  const selected = disabled || !value ? [] : value.split(',');
  const selectedLabel = options.find(option => option.value === value)?.label || '';
  const [query, setQuery] = useState(multiple ? '' : selectedLabel);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [filtering, setFiltering] = useState(false);
  const filtered = options.filter(option => (!multiple || !selected.includes(option.value)) && (!filtering || normalize(`${option.label} ${option.aliases || ''}`).includes(normalize(query))));
  const activeIndex = Math.min(active, Math.max(0, filtered.length - 1));
  useEffect(() => {
    if (disabled) { setQuery(''); setOpen(false); }
    else if (!multiple && value) setQuery(selectedLabel);
  }, [disabled, multiple, value, selectedLabel]);
  useEffect(() => {
    if (open) list.current?.children[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);
  function choose(option: SelectOption) {
    // Apatridia no puede coexistir con una nacionalidad declarada.
    const next = multiple && option.value !== 'stateless' ? [...selected.filter(item => item !== 'stateless'), option.value] : [option.value];
    onChange(next.join(','));
    setQuery(multiple ? '' : option.label);
    input.current?.focus();
    setFiltering(false); setOpen(false); setActive(0);
  }
  return <div className="search-select" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    {multiple && selected.length > 0 && <ul className="select-values" aria-label={`${label}: selección`}>{selected.map(item => <li key={item}>
      <span>{options.find(option => option.value === item)?.label}</span>
      <button type="button" aria-label={`Quitar ${options.find(option => option.value === item)?.label}`} onClick={() => onChange(selected.filter(code => code !== item).join(','))}>×</button>
    </li>)}</ul>}
    <div className="select-control">
      <input ref={input} type="text" role="combobox" aria-labelledby="interview-question" aria-describedby="interview-help" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-list`} aria-activedescendant={open && filtered.length ? `${id}-${filtered[activeIndex].value}` : undefined}
        value={query} disabled={disabled} placeholder={placeholder} autoComplete="off" spellCheck={false}
        onFocus={() => { setOpen(true); setFiltering(false); }} onClick={() => setOpen(true)}
        onChange={event => { setQuery(event.target.value); setFiltering(true); setActive(0); setOpen(true); if (!multiple && value) onChange(''); }}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActive(open ? Math.max(0, Math.min(filtered.length - 1, activeIndex + (event.key === 'ArrowDown' ? 1 : -1))) : 0); }
          else if (event.key === 'Enter' && open) { event.preventDefault(); if (filtered[activeIndex]) choose(filtered[activeIndex]); }
          else if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
        }} />
      <button type="button" className="select-toggle" aria-label={open ? 'Cerrar opciones' : 'Mostrar opciones'} disabled={disabled} aria-expanded={open} aria-controls={`${id}-list`}
        onMouseDown={event => event.preventDefault()} onClick={() => { if (open) setOpen(false); else { input.current?.focus(); setFiltering(false); setOpen(true); } }}><span aria-hidden="true">⌄</span></button>
    </div>
    {open && <div className="select-dropdown">
      <ul ref={list} id={`${id}-list`} role="listbox" aria-label={`${label}: opciones disponibles`}>
        {filtered.map((option, index) => <li key={option.value} id={`${id}-${option.value}`} role="option" aria-selected={selected.includes(option.value)} className={index === activeIndex ? 'active' : ''}
          onMouseDown={event => event.preventDefault()} onClick={() => choose(option)}>{option.label}{selected.includes(option.value) && <span aria-hidden="true">✓</span>}</li>)}
      </ul>
      {!filtered.length && <p role="status">No hay coincidencias. Prueba con otro nombre.</p>}
    </div>}
  </div>;
}
