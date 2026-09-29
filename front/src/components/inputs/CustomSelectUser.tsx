import "./customSelectUser.css";

// Interface minimale requise pour n'importe quel item
interface BaseOption {
  id: string | number;
  [key: string]: any; // Permet d'accepter d'autres propriétés (prenom, nom, name, etc.)
}

interface CustomSelectUserProps<T extends BaseOption> {
  label?: string;
  items: T[];
  selectedValue: string | number;
  onChange: (val: string) => void;
  placeholder?: string;
  renderOption: (item: T) => string; // Fonction pour formater l'affichage de l'option
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
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {renderOption(item)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}