import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const PasswordVisibility = ({ showPassword, setShowPassword }) => {
  return (
    <div className="absolute right-2 top-8 mt-1">
      {showPassword ? (
        <EyeSlashIcon
          className="h-5 w-5 text-slate-500"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      ) : (
        <EyeIcon
          className="h-5 w-5 text-slate-500"
          onClick={() => setShowPassword((prev) => !prev)}
        />
      )}
    </div>
  );
};

export default PasswordVisibility;
