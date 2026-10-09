import "./customSelectUser.css";

interface BaseOption {
  id?: string | number;
  id_utilisateur?: string | number; // 👈 On accepte aussi l'UUID Supabase
  [key: string]: any;
}

interface CustomSelectUserProps<T extends BaseOption> {
  label?: string;
  items: T[];
  selectedValue: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  renderOption: (item: T) => string;
}

export default function CustomSelectUser<T extends BaseOption>({
  label = "Sélectionner une option",
  items,
  selectedValue,
  onChange,
  placeholder = "-- Choisir une option --",
  renderOption,
}: CustomSelectUserProps<T>) {
  return (
    <div className="custom-select-wrapper">
      {label && <label className="custom-select-label typo-body">{label}</label>}
      <div className="select-container">
        <select
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
          className="custom-select"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {items.map((item) => {
            // Récupère l'ID qu'il s'appelle "id" ou "id_utilisateur"
            const itemId = item.id_utilisateur ?? item.id;
            return (
              <option key={itemId} value={itemId}>
                {renderOption(item)}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}