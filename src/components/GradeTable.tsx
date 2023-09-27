import { VStack, Heading, Image, Table, Thead, Tr, Th, Tbody, Input } from "@chakra-ui/react";
import React from "react";
import { useMemo, useState } from "react";
import { addAbortSignal } from "stream";
export interface TableRow {
    id: number;
    class: string;
    grade?: number;
    unit?: number;
    bonus?: null | number;
    isRed?: boolean;
}
interface Props {
    InputRows: TableRow[];
}
const GradeTable = ({ InputRows }: Props) => {

    const [rows, setRows] = useState<TableRow[]>(InputRows);
    const [BonusRows, setBonusRows] = useState<TableRow[]>([{ id: 9, class: '' }]);
    const bonusClass = ['אנגלית', 'פיזיקה', 'כימיה', 'ביולוגיה', 'ספרות', 'היסטוריה', 'תנ"ך'];
    const mustHaveClass = ['אנגלית', 'מתמטיקה', 'היסטוריה', 'עברית', 'אזרחות'];

    const AddBonus = (row: TableRow) => {
        if (row.unit) {
            if (row.class === 'מתמטיקה' && row.unit === 5) {
                return 35;
            }
            if ((row.class === 'מתמטיקה' || row.class === 'אנגלית') && row.unit === 4) {
                return 12.5;
            }
            if (bonusClass.includes(row.class) && row.unit === 5) {
                return 25;
            }
            if (!bonusClass.includes(row.class) && row.unit === 5) {
                return 20;
            }
        }
        return 0;
    }
    
    const ExcludeFromCalc = (row: TableRow, CAverage: number | null) => {
        console.log(!mustHaveClass.includes(row.class));
        if (!mustHaveClass.includes(row.class)) {
            if (row.unit && CAverage && row.grade) {
                const gain = row.grade + AddBonus(row);
                if (gain <= CAverage) { 
                    console.log("the gain is " + gain + 'and the average is ' + CAverage);
                    console.log('kick it');
                    return true 
                };
            }
        }
        return false;
    }
    
    const Calculate = (allRows: TableRow[]) => {
        let sum = 0;
        let count = 0;

        allRows.forEach(row => {
            if (row.unit && row.grade) {
                     sum += row.unit * (row.grade + AddBonus(row)); 
                     count += row.unit; }
        })
        
        //console.log(allRows);
        //console.log(sum);
        console.log('the average is ' + Math.round((sum / count) * 100) / 100);
        if (sum === 0) {
            return null
        }
        return Math.round((sum / count) * 100) / 100;
    }
    const initialAverage = Calculate([...rows, ...BonusRows]);

    const redRows = useMemo(() => {
            return [...rows, ...BonusRows].filter(row => ExcludeFromCalc(row, initialAverage)).map(row => row.id);
        }, [rows, BonusRows, initialAverage]);

    const Average = Calculate([...rows, ...BonusRows].filter(row => !redRows.includes(row.id))) || '';



    const handleChange = (id: number, field: string, value: number | string) => {
        const updateRow = (row: TableRow) => {
            if (row.id !== id) return row;
            const updatedRow = { ...row, [field]: value };
            updatedRow.bonus = AddBonus(updatedRow);
            return updatedRow;
        };

        if (id <= 8) {
            setRows(prev => prev.map(updateRow));

        } else {
            setBonusRows(prev => prev.map(updateRow));
        }

        if (id === BonusRows[BonusRows.length - 1].id) {
            const newId = id + 1;
            const newRow: TableRow = {
                id: newId,
                class: '',
                grade: undefined,
                unit: undefined,
                bonus: null
            };
            setBonusRows(prev => [...prev, newRow]);
        }
    };
    /*    if(id < 7){
        setRows(prev => prev.map(row =>
            row.id === id ?
                { ...row, [field]: grade, bonus: AddBonus(row) } : { ...row }))
        }
        if(id === BonusRows[BonusRows.length - 1].id){
            setBonusRows(prev => prev.map(row =>
                row.id === id ?
                { ...row, [field]: grade, bonus: AddBonus(row) } : { ...row }));
        }
        if (BonusRows.length > 0 && id === BonusRows[BonusRows.length - 1].id) {
        
            // Add a new bonus row
            const newId = id + 1;
            const newRow: TableRow = {
                id: newId,
                class: '',
                grade: undefined,
                unit: undefined,
                bonus: null
            };
            setBonusRows(prev => [...prev, newRow]);
        }
        console.log(rows);
        console.log(BonusRows);
    */


    return (
        <>
            <Heading dir = 'rtl'> הממוצע בתל אביב הוא: {Average}</Heading>
            <Table bg="gray.100" colorScheme="black" dir='rtl'>
                <Thead>
                    <Tr>
                        <Th>מקצוע</Th>
                        <Th>יחידות</Th>
                        <Th>ציון</Th>
                        <Th>בונוס</Th>
                        <Th>סופי</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        rows.map(row =>
                            <Tr backgroundColor={redRows.includes(row.id) ? '#FFEAEA' : ""} key={row.id}>
                                <Th>{row.class}</Th>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'unit', parseInt(e.target.value)) }} defaultValue={row.unit}></Input></Th>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'grade', parseInt(e.target.value)) }} defaultValue={row.grade} ></Input></Th>
                                <Th>{row.bonus}</Th>
                                <Th></Th>
                            </Tr>
                        )}
                    {
                        BonusRows.map(row =>
                            <Tr backgroundColor={redRows.includes(row.id) ? '#FAA0A0' : ""} key={row.id}>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'class', e.target.value) }} defaultValue={row.class}></Input></Th>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'unit', parseInt(e.target.value)) }} defaultValue={row.unit}></Input></Th>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'grade', parseInt(e.target.value)) }} defaultValue={row.grade} ></Input></Th>
                                <Th>{row.bonus}</Th>
                                <Th></Th>
                            </Tr>
                        )}

                </Tbody>
            </Table>
        </>)
}
export default GradeTable;