export default async function requestAttendanceStats( fromDate: string, toDate: string , classID: number) {
    try {

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getAttendanceStats', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fromDate: fromDate, toDate: toDate, classID: classID })
        });
        
        const data: any = await req.json();
        console.log(`Requesting all attendance across these dates: ${fromDate} to ${toDate} with ClassID: ${classID}`);
        console.log("Here is the data", data);

        return data;
    } catch (error) {
        console.error('Creation Failed:', error);
        return false;
    }
}