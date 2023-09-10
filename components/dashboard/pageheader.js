
export default function PageHeader({ title, desc }) {

    return (
        <>
        <h1 class="mb-1 font-bold leading-none tracking-tight text-neutral-300 text-3xl md:text-4xl lg:text-4xl"><span class="underline underline-offset-4 decoration-4 decoration-neutral-700">{title}</span></h1>

        {desc && (
            <p class="mb-4 text-lg font-normal text-neutral-400 lg:text-xl">{desc}</p>
        )}
        </>
    )
}