export default async function ComponentHome({ params }: { params: { componentName: string } }) {
    return <div>HI {params.componentName}</div>
}