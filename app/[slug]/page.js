import Navbar from "../components/navbar"
import Game from "../components/game"

export default async function Page({ params }) {
    const slug = (await params).slug
    return (
        <div>
            <Navbar />
            <iframe src={`/games/${slug}/v3/index.html`} frameborder="0"></iframe>
        </div>
    )
}