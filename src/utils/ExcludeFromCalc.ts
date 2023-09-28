import { TableRow, mustHaveClass } from "../components/GradeTable";
import AddBonus from "./AddBonus";

const ExcludeFromCalc = (row: TableRow, currentAverage: number | null, bonusCriteria : string) => {
    //console.log(!mustHaveClass.includes(row.class));
    
    if (!mustHaveClass.includes(row.class)) {
        if (row.unit && currentAverage && row.grade) {
            const gain = row.grade + AddBonus(row, bonusCriteria);
            if (gain <= currentAverage) { 
                console.log("the gain is " + gain + 'and the average is ' + currentAverage);
                console.log('kick it');
                if(bonusCriteria !='tel aviv' && (row.class == 'עברית' || 'תנ"ך') )
                    return false;
                return true; 
            };
        }
    }
    return false;
}
export default ExcludeFromCalc;