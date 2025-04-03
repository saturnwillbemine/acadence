export default async function requestAttendanceStats( fromDate: string, toDate: string ) {
    try {

        const req: Response = await fetch( process.env.NEXT_PUBLIC_API_URL + '/getAttendanceStats', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fromDate: fromDate, toDate: toDate })
        });
        
        const data: any = await req.json();
        console.log(`Requesting all attendance across these dates: ${fromDate} to ${toDate}`);
        console.log("Here is the data", data);

        return data;
    } catch (error) {
        console.error('Creation Failed:', error);
        return false;
    }
}