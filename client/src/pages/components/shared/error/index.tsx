export default function error({ err, reset }: { err: Error, reset: () => void }) {
    return (
        <main>
            <div>This is error page</div>
        </main>

    )
}