import { TableRow } from "../components/GradeTable";
import AddBonus from "./AddBonus";


const Calculate = (allRows: TableRow[], bonusCriteria: string) => {
    let sum = 0;
    let count = 0;

    allRows.forEach(row => {
        if (row.unit && row.grade) {
            sum += row.unit * (row.grade + AddBonus(row, bonusCriteria));
            count += row.unit;
        }
    })

    //console.log(allRows);
    //console.log(sum);
    //console.log('the average is ' + Math.round((sum / count) * 100) / 100);
    if (sum === 0) {
        return null
    }

    const Avg = Math.round((sum / count) * 100) / 100;
    //console.log(Avg + "  " + bonusCriteria);
    if (Avg > 119 && bonusCriteria === 'tech') {
        return 119
    }
    if (Avg > 117 && bonusCriteria === 'tel aviv') {
        return 117
    }
    if (Avg > 119 && bonusCriteria === 'heb') {
        return 119
    }
    return Avg;



}

export default Calculate;