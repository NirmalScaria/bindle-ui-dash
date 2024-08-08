export default async function LibraryHome({ params }: { params: { libraryName: string } }) {
    return <div>HI {params.libraryName}</div>
}