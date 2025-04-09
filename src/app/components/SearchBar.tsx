import React from "react";
import Image from "next/image";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  selectedRole: string | null;
  setSelectedRole: (role: string | null) => void;
}

export default function SearchBar({ search, setSearch, selectedRole, setSelectedRole }: SearchBarProps) {
  const roles = ["Top", "Jg", "Mid", "Adc", "Supp"];

  const handleRoleClick = (role: string) => {
    setSelectedRole(selectedRole === role ? null : role);
  };

  return (
    <div className="flex items-center gap-4 w-full max-w-lg">
      <div className="flex gap-2 items-center">
        {roles.map((role) => (
          <div
            key={role}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
              selectedRole === role ? "bg-[#02637B]" : "bg-transparent"
            }`}
            onClick={() => handleRoleClick(role)}
          >
            <Image
              src={`/${role}Icon.png`}
              alt={`${role} icon`}
              width={27}
              height={27}
              unoptimized
            />
          </div>
        ))}
      </div>

      <div className="relative w-[165px]">
        <input
          type="text"
          placeholder="Buscar campeón"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 pr-8 border border-[#CBAB70] rounded-sm w-full h-[33] bg-[#0A0A0A] outline-none"
        />
        {search.length > 0 && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-[#CBAB70]"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
