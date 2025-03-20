export default async function Class({
  params,
} : {
  params: Promise<{classID: number}>
}) {
  const { classID } = await params

  return (
    <div>
    <>Welcome to the class page!, You should have a different one for each classID
    
    This one's classID is {classID}
    </>
    </div>
  );
}
  