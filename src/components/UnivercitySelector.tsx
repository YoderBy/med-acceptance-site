import { Select } from "@chakra-ui/react";
interface Props{
    onChange :  (e: React.ChangeEvent<HTMLSelectElement>)=>void;
}
const UnivercitySelector: React.FC<Props> = ({ onChange }) => {

    return(
    <Select 
    padding={'15px'}
    dir='rtl' 
    onChange={onChange}
>
    <option value="tel aviv">תל אביב</option>
    <option value="tech">טכניון</option>
    <option value="heb">העברית</option>
</Select>
)
}

export default UnivercitySelector;