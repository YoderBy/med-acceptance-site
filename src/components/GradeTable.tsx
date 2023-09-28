import { VStack, Heading, Image, Table, Thead, Tr, Th, Tbody, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useMemo, useState } from "react";
import { addAbortSignal } from "stream";
import AddBonus from "../utils/AddBonus";
import ExcludeFromCalc from "../utils/ExcludeFromCalc";
import Calculate from "../utils/Calculate";
import { set } from "react-hook-form";
import UnivercitySelector from "./UnivercitySelector";
import UnivercityNameChanger from "../utils/UnivercityNameChanger";
export const bonusClass = ['אנגלית', 'פיזיקה', 'כימיה', 'ביולוגיה', 'ספרות', 'היסטוריה', 'תנ"ך'];
export const mustHaveClass = ['אנגלית', 'מתמטיקה', 'היסטוריה', 'עברית', 'אזרחות'];

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

    const [bonusCriteria, setBonusCriteria] = useState<string>("tel aviv");
    const [rows, setRows] = useState<TableRow[]>(InputRows);
    const [BonusRows, setBonusRows] = useState<TableRow[]>([{ id: 9, class: '' }]);
    const initialAverage = Calculate([...rows, ...BonusRows], bonusCriteria);

    const redRows = useMemo(() => {
        return [...rows, ...BonusRows].filter(row => ExcludeFromCalc(row, initialAverage, bonusCriteria)).map(row => row.id);
    }, [rows, BonusRows, initialAverage]);

    const Average = Calculate([...rows, ...BonusRows].filter(row => !redRows.includes(row.id)), bonusCriteria) || '';


    const SelectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBonusCriteria(e.target.value)
    }
    const handleChange = (id: number, field: string, value: number | string) => {
        const updateRow = (row: TableRow) => {
            if (row.id !== id) return row;

            const updatedRow = { ...row, [field]: value };
            updatedRow.bonus = AddBonus(updatedRow, bonusCriteria);
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
    useEffect(() => {

        const updateBonusForRows = (rowsToUpdate: TableRow[]): TableRow[] => {
            return rowsToUpdate.map(row => {
                const updatedRow = { ...row };
                updatedRow.bonus = AddBonus(updatedRow, bonusCriteria);
                return updatedRow;
            });
        };

        setRows(prevRows => updateBonusForRows(prevRows));
        setBonusRows(prevBonusRows => updateBonusForRows(prevBonusRows));

        console.log("Bonus Criteria changed to:", UnivercityNameChanger(bonusCriteria));

    }, [bonusCriteria]);
    return (
        <>
            <Heading dir='rtl'> הממוצע ב{UnivercityNameChanger(bonusCriteria)} הוא: {Average}</Heading>
            <UnivercitySelector onChange={SelectorChange}></UnivercitySelector>
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
                                <Th><Input onChange={(e) => { handleChange(row.id, 'unit', parseInt(e.target.value)) }} defaultValue={row.unit}  min={2} max={10}></Input></Th>
                                <Th><Input onChange={(e) => { handleChange(row.id, 'grade', parseInt(e.target.value)) }} defaultValue={row.grade}  min={55} max={100}></Input></Th>
                                <Th>{row.bonus}</Th>
                                <Th></Th>
                            </Tr>
                        )}
                    {
                        BonusRows.map(row =>
                            <Tr backgroundColor={redRows.includes(row.id) ? '#FFEAEA' : ""} key={row.id}>
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