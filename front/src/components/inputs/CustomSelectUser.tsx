import "./customSelectUser.css";

interface UserOption {
  id: string | number;
  prenom: string;
  nom: string;
}

interface CustomSelectUserProps {
  label?: string;
  users: UserOption[];
  selectedValue: string | number;
  onChange: (val: string) => void;
}

export default function CustomSelectUser({
  label = "Sélectionner un utilisateur",
  users,
  selectedValue,
  onChange,
}: CustomSelectUserProps) {
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
            -- Choisir un profil --
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.prenom} {user.nom}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}