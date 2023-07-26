import { HTMLAttributes } from "react";

interface LabelInfoProps extends HTMLAttributes<HTMLLabelElement>{
  label: string;
}

const LabelInfo: React.FC<LabelInfoProps> = ({label,className}) => {
  return (
    <label className={className}>{label}</label>
  )
}

export default LabelInfo